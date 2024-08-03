import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { sessionTable, users } from "$lib/db/schema";
import db from "$lib/db";
import { Lucia } from "lucia";
import { dev } from "$app/environment";

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, users);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
  getUserAttributes: (attributes: DatabaseUserAttributes) => {    
    return {
      firstname: attributes.firstname,
      lastname: attributes.lastname,
      email: attributes.email,
    };
  }
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
  firstname: string
  lastname: string
  email: string
  passwordHash: string
}
