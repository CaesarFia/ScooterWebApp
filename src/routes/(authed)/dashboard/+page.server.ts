import { hash } from '@node-rs/argon2';
import { error, type Actions } from '@sveltejs/kit';
import { generateIdFromEntropySize } from 'lucia';

import db from '$lib/db';
import { employees, scooters, transactions, users } from '$lib/db/schema';
import { isValidEmail, isValidPassword } from '$lib/utils';

export const actions: Actions = {
	make_scooter: async (event) => {
		const formData = await event.request.formData();

		const latitude = Number(formData.get('latitude')?.toString());
		const longitude = Number(formData.get('longitude')?.toString());
		const checkedOut = formData.has('checked_out');
		const needRepairs = formData.has('need_repairs');
		const battery = Number(formData.get('battery')?.toString());

		if (typeof latitude !== 'number' || isNaN(latitude) || latitude < -90 || latitude > 90) {
			error(400, {
				message: 'Invalid latitude'
			});
		}

		if (typeof longitude !== 'number' || isNaN(longitude) || longitude < -180 || longitude > 180) {
			error(400, {
				message: 'Invalid longitude'
			});
		}

		if (typeof battery !== 'number' || isNaN(battery) || battery < 0 || battery > 100) {
			error(400, {
				message: 'Invalid battery'
			});
		}

		const scooterId = generateIdFromEntropySize(10); // 16 characters long

		await db.insert(scooters).values({
			id: scooterId,
			latitude: latitude,
			longitude: longitude,
			checkedOut: checkedOut,
			needRepairs: needRepairs,
			battery: battery
		});
	},

	make_user: async ({ request, locals }) => {
		if (!locals.user || !locals.user.isAdmin) {
			error(403, { message: 'Forbidden' });
		}

		const formData = await request.formData();
		const firstname = formData.get('firstname');
		const lastname = formData.get('lastname');
		const email = formData.get('email');
		const password = formData.get('password');
		const isEmployee = formData.has('is_employee');
		const isAdmin = formData.has('is_admin');
		// username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
		// keep in mind some database (e.g. mysql) are case insensitive
		if (typeof email !== 'string' || !isValidEmail(email)) {
			error(400, {
				message: 'Invalid email'
			});
		}
		if (typeof password !== 'string' || !isValidPassword(password)) {
			error(400, {
				message: 'Invalid password'
			});
		}
		if (typeof firstname !== 'string' || typeof lastname !== 'string')
			error(400, {
				message: 'Invalid name'
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
			passwordHash: passwordHash
		});

		if (isEmployee) {
			await db.insert(employees).values({
				id: userId,
				isAdmin: isAdmin
			});
		}
	}
};

/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
	if (!locals.user || !locals.user.isAdmin) {
		error(403, { message: 'Forbidden' });
	}

	const scooterList = await db.select().from(scooters);
	const userList = await db.select().from(users);
	const transactionList = await db.select().from(transactions);
	const currentUser = locals.user;

	return {
		data: {
			scooterList,
			userList,
			transactionList,
			currentUser
		}
	};
}
