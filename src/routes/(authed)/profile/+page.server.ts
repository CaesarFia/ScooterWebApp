import { hash } from '@node-rs/argon2';
import { error, type Actions } from '@sveltejs/kit';
import { generateIdFromEntropySize } from 'lucia';

import db from '$lib/db';
import { customers, employees, rentals, scooters, transactions, users } from '$lib/db/schema';
import { isValidEmail, isValidPassword } from '$lib/utils';
import { eq } from 'drizzle-orm';



/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
	if (!locals.user || !locals.user.isAdmin) {
		error(403, { message: 'Forbidden' });
	}


	const currentUser = locals.user;
    locals.user.id

	return {
		data: {
			currentUser
		}
	};
}
