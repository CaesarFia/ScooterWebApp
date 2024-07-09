import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { sessionTable, users } from "../db/schema";
import db from "../db";
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
      // attributes has the type of DatabaseUserAttributes
      userId: attributes.userId,
      firstname: attributes.firstname,
      lastname: attributes.lastname,
      email: attributes.email,
      latitude: attributes.latitude,
      longitude: attributes.longitude,
      isAdmin: attributes.isAdmin
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
	userId: string
  firstname: string
  lastname: string
  email: string
  latitude: number
  longitude: number
  isAdmin: boolean | null
}
