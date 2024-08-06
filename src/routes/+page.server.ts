import { lucia } from "$lib/server/auth";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import { verify, hash } from "@node-rs/argon2";
import db from "$lib/db";
import { globeDistance, isValidEmail, isValidPassword } from "$lib/utils";
import { generateIdFromEntropySize } from "lucia";
import { customers, scooters, users } from "$lib/db/schema";


export const load = async ({ locals, url }) => {
	if (!locals.user) {
		return {
			user: null
		};
	}
	
	const scootersResult = await db.select().from(scooters);
	let scooterList: typeof scootersResult | null = scootersResult;

	let latitude: number | undefined = undefined;
	let longitude: number | undefined = undefined;

	// For users only show scooters within 5 miles
	if (locals.user.role === "customer") {
		const latitudeParam = url.searchParams.get("latitude");
		const longitudeParam = url.searchParams.get("longitude");

		if (latitudeParam != null && !Number.isNaN(latitudeParam) && longitudeParam !== null && !Number.isNaN(longitudeParam)) {
			latitude = Number(latitudeParam);
			longitude = Number(longitudeParam);
			console.log(latitude, longitude);
			scooterList = scooterList.filter(scooter => globeDistance(scooter.latitude, scooter.longitude, Number(latitude), Number(longitude)) < 5280 * 5);
			console.log(scooterList);
		}
		else {
			scooterList = null;
		}
	}

	const res = {
		user: {
			id: locals.user.id as string,
			firstname: locals.user.firstname as string,
			lastname: locals.user.lastname as string,
			email: locals.user.email as string,
			balance: locals.user.balance as string,
			role: locals.user.role as "customer" | "employee" | "admin",
		},
		scooterList
	};

	if (latitude !== undefined && longitude !== undefined) {
		return {
			...res,
			userLocation: {
				latitude: latitude,
				longitude: longitude,
			}
		}
	}
	else {
		return res;
	}
}


// Handles logging out
export const actions: Actions = {
	signin: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get("email")?.valueOf()
		const password = formData.get("password")?.valueOf();

		if (typeof email !== 'string' || !isValidEmail(email)) {
			return fail(400, {
				message: "Invalid email"
			});
		}
		if (typeof password !== 'string' || !isValidPassword(password)) {
			return fail(400, {
				message: "Invalid password"
			});
		}

		const existingUser = await db.query.users.findFirst({
			where: (table, { eq }) => {return eq(table.email, email)}
		})
		if (!existingUser) {
			// NOTE:
			// Returning immediately allows malicious actors to figure out valid usernames from response times,
			// allowing them to only focus on guessing passwords in brute-force attacks.
			// As a preventive measure, you may want to hash passwords even for invalid usernames.
			// However, valid usernames can be already be revealed with the signup page among other methods.
			// It will also be much more resource intensive.
			// Since protecting against this is non-trivial,
			// it is crucial your implementation is protected against brute-force attacks with login throttling etc.
			// If usernames are public, you may outright tell the user that the username is invalid.
			return fail(400, {
				message: "Incorrect username or password"
			});
		}

		const validPassword = await verify(existingUser.passwordHash, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
		if (!validPassword) {
			return fail(400, {
				message: "Incorrect username or password"
			});
		}

		const session = await lucia.createSession(existingUser.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});

		redirect(302, "/");
	},

	signup: async (event) => {
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
		if (typeof password !== "string" || !isValidPassword(password)) {
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
		});

		await db.insert(customers).values({
			id: userId,
			balance: "0",
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