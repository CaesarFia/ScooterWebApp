import { error, type Actions } from '@sveltejs/kit';

import db from '$lib/db';
import { users } from '$lib/db/schema';
import { isValidEmail } from '$lib/utils';
import { eq } from 'drizzle-orm';

export const actions: Actions = {
	update_user: async ({ request, locals }) => {
		if (!locals.user || !locals.user.isAdmin) {
			error(403, { message: 'Forbidden' });
		}

		const formData = await request.formData();
        console.log("Update!", formData)
		const firstname = formData.get('firstname');
		const lastname = formData.get('lastname');
		const email = formData.get('email');
		// const password = formData.get('password');
		// username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
		// keep in mind some database (e.g. mysql) are case insensitive
		if (typeof email !== 'string' || !isValidEmail(email)) {
			error(400, {
				message: 'Invalid email'
			});
		}
		// if (typeof password !== 'string' || !isValidPassword(password)) {
		// 	error(400, {
		// 		message: 'Invalid password'
		// 	});
		// }
		if (typeof firstname !== 'string' || typeof lastname !== 'string')
			error(400, {
				message: 'Invalid name'
			});

		// const passwordHash = await hash(password, {
		// 	// recommended minimum parameters
		// 	memoryCost: 19456,
		// 	timeCost: 2,
		// 	outputLen: 32,
		// 	parallelism: 1
		// });

		await db.update(users).set({
			firstname: firstname,
			lastname: lastname,
			email: email,
			// passwordHash: passwordHash
		}).where(eq(users.id, locals.user.id))
	}
};

/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
	if (!locals.user || !locals.user.isAdmin) {
		error(403, { message: 'Forbidden' });
	}

	return {
		user: locals.user
	};
}
