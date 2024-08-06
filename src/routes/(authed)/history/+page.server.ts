import { eq } from 'drizzle-orm';

import db from '$lib/db';
import { rentals } from '$lib/db/schema';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
    if (!locals.user) {
        error(403, { message: 'Forbidden' });
    }

    const user_rentals = await db
        .select()
        .from(rentals)
        .where(eq(rentals.customerId, locals.user.id));

    const user = locals.user
    console.log(user_rentals)

    return {
        rentals: user_rentals,
        user
    };
}
