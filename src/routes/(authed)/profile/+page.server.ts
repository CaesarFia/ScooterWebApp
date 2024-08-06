import { error } from '@sveltejs/kit';



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
