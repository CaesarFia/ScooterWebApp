import db from "$lib/db";
import { eq } from "drizzle-orm";
import { usersInfo } from "$lib/db/schema";
import { lucia } from "$lib/server/auth";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	// Check if the user is logged in by checking the session cookie
	const sessionId = event.cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	// Validate the session
	const { session, user } = await lucia.validateSession(sessionId);

	// If the session is invalid, clear the session cookie
	if (!user) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}
	
	// If the session is fresh, update the session cookie
	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
	}

	// If the session is missing, create a blank session cookie
	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
	}

	// Get the user's balance and role
	const result = await db.select({
		balance: usersInfo.balance,
		isAdmin: usersInfo.isAdmin
	}).from(usersInfo).where(eq(usersInfo.id, user.id)).execute();

	// If the user is not found, clear the session cookie
	if (result.length !== 1) {
		console.error("User not found in users_info view");
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	// Determine the user's role
	const role = result[0].isAdmin ? "admin" : (result[0].isAdmin !== null ? "employee" : "customer");

	// Pass the user and session to the page
	event.locals.user = { role, ...result[0], ...user };
	event.locals.session = session;

	return resolve(event);
};