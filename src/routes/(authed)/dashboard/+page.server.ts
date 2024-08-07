import { hash } from '@node-rs/argon2';
import { error, type Actions } from '@sveltejs/kit';
import { generateIdFromEntropySize } from 'lucia';

import db from '$lib/db';
import { customers, employees, rentals, scooters, transactions, users } from '$lib/db/schema';
import { isValidEmail, isValidPassword } from '$lib/utils';
import { eq } from 'drizzle-orm';

export const actions: Actions = {
	update_scooter: async (event) => {
		const formData = await event.request.formData();

		const id = formData.get("id")?.toString();
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

		await db.update(scooters).set({
			latitude: latitude,
			longitude: longitude,
			checkedOut: checkedOut,
			needRepairs: needRepairs,
			battery: battery
		}).where(eq(scooters.id,id ? id : ""));
	},
	approve_rental: async ({request, locals}) => {
		const formData = await request.formData();
		console.log(formData.get('id')?.toString());
		await db.update(rentals).set({ approverId: locals.user?.id }).where(eq(rentals.id, formData.get('id')?.toString()))
	},
	update_transaction: async (event) => {
		const formData = await event.request.formData();

		const id = formData.get("id")?.toString();
		const modifierId = formData.get("modify")?.toString();
		const amount = formData.get('amount')?.toString();

		await db.update(transactions).set({
			amount: amount,
			modifierId: modifierId
		}).where(eq(transactions.id,id ? id : ""));
	},
	make_scooter: async (event) => {
		const formData = await event.request.formData();

		const latitude = Number(formData.get('latitude')?.toString());
		const longitude = Number(formData.get('longitude')?.toString());
		const checkedOut = formData.has('checked_out');
		const needRepairs = formData.has('need_repairs');
		const battery = Number(formData.get('battery')?.toString());
		const model = formData.get('model')?.toString();
		const yearPurchased = Number(formData.get('year'))

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
			battery: battery,
			model: model ? model : "nuh uh",
			yearPurchased: yearPurchased
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
		} else {
			await db.insert(customers).values({
				id: userId,
				balance: 0
			})
		}
	},
	delete_user: async ({ request, locals }) => {
		if (!locals.user || !locals.user.isAdmin) {
			error(403, { message: 'Forbidden' });
		}

		const formData = await request.formData();
		const id = formData.get('id')?.toString();
		// username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
		// keep in mind some database (e.g. mysql) are case insensitive
		if(id != locals.user.id)
			await db.delete(users).where(eq(users.id, id ? id : ""));
	}
};

/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
	if (!locals.user || !locals.user.isAdmin) {
		error(403, { message: 'Forbidden' });
	}

	const scooterList = (await db.select().from(scooters).orderBy(scooters.number));
	const customerList = await db.select().from(users).innerJoin(customers, eq(users.id, customers.id));
	const employeeList = await db.select().from(users).innerJoin(employees, eq(users.id, employees.id));
	const transactionList = await db.select().from(transactions);
	const rentalList = await db.select().from(rentals);
	const currentUser = locals.user;

	return {
		scooterList,
		customerList,
		employeeList,
		transactionList,
		rentalList,
		currentUser
	};
}
