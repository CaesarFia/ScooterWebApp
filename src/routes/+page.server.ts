import { lucia } from "$lib/server/auth";
import { error, fail, redirect, type Actions } from "@sveltejs/kit";
import { verify, hash } from "@node-rs/argon2";
import db from "$lib/db";
import { globeDistance, isValidEmail, isValidPassword, subtract } from "$lib/utils";
import { generateIdFromEntropySize } from "lucia";
import { customers, rentals, scooters, users } from "$lib/db/schema";
import { eq, sql } from "drizzle-orm";


export const load = async ({ locals, url }) => {
	// Check if the user is logged in
	if (!locals.user) {
		return {
			user: null
		};
	}
	
	// Get all the scooters
	const scootersResult = (await db.select({
		scooters,
		numRentals: sql<number>`COUNT(${rentals.id})`,
		totalMileage: sql<number | null>`SUM(${rentals.mileage})`,
	}).from(scooters).leftJoin(rentals, eq(scooters.id, rentals.scooterId)).groupBy(scooters.id)).map((scooterJoin) => ({...scooterJoin.scooters, numRentals: scooterJoin.numRentals, totalMileage: scooterJoin.totalMileage}));
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

	// Return the user and scooter list
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

		// Validate the email and password
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

		// Check if the user exists
		const existingUser = await db.query.users.findFirst({
			where: (table, { eq }) => {return eq(table.email, email)}
		})
		
		// If the user does not exist, return an error
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

		// Check if the password is correct
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

		// Log the user in
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
		
		// TODO: check if the email is already taken

		// Create the new user
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

		// Assume the user is a customer
		await db.insert(customers).values({
			id: userId,
			balance: "0",
		});

		// Log the user in
		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});

		redirect(302, "/");
	},
	signout: async (event) => {
		if (!event.locals.session) {
			redirect(302, "/");
		}
		await lucia.invalidateSession(event.locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
		event.locals.session = null;
		event.locals.user = null;

		redirect(302, "/");
	},
	make_rental: async ({ request, locals }) => {
        const formData = await request.formData();
        const scooterId = formData.get('scooterId') as string;
        const rentalId = generateIdFromEntropySize(10); // 16 characters long
        const now = new Date();
        const customerId = locals.user?.id;
        const cost = '5';
        const customerBalance = locals.user?.balance;

        if (customerId == null) {
            error(400, {
                message: 'Invalid customer'
            });
        }

        // Check balance
        if (customerBalance == null || subtract(customerBalance, cost).startsWith('-')) {
            console.log(cost)
            error(400, {
                message: "Insufficient balance, you must have at least $5"
            })
        }

		// Make a new rental entry
        await db.insert(rentals).values({
            id: rentalId,
            customerId: customerId,
            scooterId: scooterId,
            approverId: null,
            transactionId: null,
            mileage: 0,
            startTime: now,
            endTime: null,
        });

		// Update the scooter's status
		await db.update(scooters).set({
			checkedOut: true
		}).where(eq(scooters.id, scooterId)); 

		redirect(302, "/history")
    },
};