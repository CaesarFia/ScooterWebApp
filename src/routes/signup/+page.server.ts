import { lucia } from "$lib/server/auth";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import { generateIdFromEntropySize } from "lucia";
import { hash } from "@node-rs/argon2";

import db from "$lib/db";
import { users } from "$lib/db/schema";

function isValidEmail(email: string): boolean {
	return /.+@.+/.test(email);
}

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const firstname = formData.get("firstname");
		const lastname = formData.get("lastname");
		const email = formData.get("email");
		const password = formData.get("password");
		// username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
		// keep in mind some database (e.g. mysql) are case insensitive
		if (
			typeof email !== "string" ||
			!isValidEmail(email)
		) {
			return fail(400, {
				message: "Invalid email"
			});
		}
		if (typeof password !== "string" || password.length < 6 || password.length > 255) {
			return fail(400, {
				message: "Invalid password"
			});
		}
		if (typeof firstname !== "string" || typeof lastname !== "string")
			return fail(400, {
				message: "Invalid name"
			});

		const userId = generateIdFromEntropySize(10); // 16 characters long
		const passwordHash = await hash(password, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
		
		// TODO: check if username is already used
		await db.insert(users).values({
			id: userId,
			firstname: firstname,
            lastname: lastname,
            email: email,
			passwordHash: passwordHash,
			isAdmin: true
		});

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});

		redirect(302, "/");
	}
};