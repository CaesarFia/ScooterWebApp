import db from '$lib/db';
import { users } from '$lib/db/schema';
import { error, type Actions } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const actions: Actions = { 
	update_profile: async ({request, locals}) => {
		const formData = await request.formData();
		console.log(formData.get('id')?.toString());
		await db.update(users).set({ firstname: formData.get('firstname')?.toString(), lastname: formData.get('lastname')?.toString(), email: formData.get('email')?.toString()  }).where(eq(users.id, locals.user?.id))
	}
};

/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
	if (!locals.user || !locals.user.isAdmin) {
		error(403, { message: 'Forbidden' });
	}


	const user = locals.user;

	return {
		user
	};
}
