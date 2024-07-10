import { lucia } from "$lib/server/auth";
import { redirect, type Actions} from "@sveltejs/kit";

// Handles logging out
export const actions: Actions = {
	default: async (event) => {
		if (!event.locals.session) {
			redirect(302, "/login");
		}
		await lucia.invalidateSession(event.locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
		redirect(302, "/login");
	}
};