import { lucia } from "$lib/server/auth";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import { generateIdFromEntropySize } from "lucia";
import { hash } from "@node-rs/argon2";

import db from "$lib/db";
import { check } from "drizzle-orm/pg-core";
import { scooters, users} from "$lib/db/schema";

function isValidEmail(email: string): boolean {
	return /.+@.+/.test(email);
}

export const actions: Actions = {
	make_scooter: async (event) => {
		const formData = await event.request.formData();
		const latitude = formData.get("latitude");
		const longitude = formData.get("longitude");
        const checked_out = formData.has("checked_out");
		const need_repairs = formData.has("need_repairs");
		const battery = formData.get("battery");
		const rentals = formData.get("rentals");

		const scooterId = generateIdFromEntropySize(10); // 16 characters long
		
		await db.insert(scooters).values({
			id: scooterId,
		    latitude: latitude,
            longitude: longitude,
            checkedOut: checked_out,
			needRepairs: need_repairs,
			battery: battery,
            rentals: rentals
		});
    },


    make_user: async (event) => {
		const formData = await event.request.formData();
		const firstname = formData.get("firstname");
		const lastname = formData.get("lastname");
		const email = formData.get("email");
		const password = formData.get("password");
        const is_admin = formData.get("is_admin")
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
		
		await db.insert(users).values({
			id: userId,
			firstname: firstname,
            lastname: lastname,
            email: email,
			passwordHash: passwordHash,
			isAdmin: is_admin
		});
	}

};

/** @type {import('./$types').PageLoad} */
export async function load() {
    const scooterList = await db.select().from(scooters);
    const userList = await db.select().from(users);
    console.log(scooterList)

    return {
        data: {
            scooterList,
            userList
        }
    }
}
