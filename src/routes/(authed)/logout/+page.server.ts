import { redirect, type Actions } from "@sveltejs/kit";
import { lucia } from "$lib/server/auth";

// Handles logging out
export const actions: Actions = {
	default: async (event) => {
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
	}
};