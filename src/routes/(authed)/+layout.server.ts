// Note, I've added the `authed` prefix to the route to indicate that it is an authenticated route.
// This is just a convention I'm using to indicate that the route is protected by authentication.
// This +layout.server.ts file will prevent returning data to unauthenticated users.

import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

// Load functions defined in +page.server.ts will run concurrently with this file.
// Ideally, each route will use a +page.server.ts file to auth guard the route.

export const load: PageServerLoad = async (event) => {
    // TODO: Make the login page redirect back to the page the user was trying to access
    if (!event.locals.user) redirect(302, "/");
    
    const user = event.locals.user;
	return {
        user
    }
};