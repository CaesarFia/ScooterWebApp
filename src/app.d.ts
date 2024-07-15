// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import { User, Session } from "lucia";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User & { balance: string | null, isAdmin: boolean | null, role: "customer" | "employee" | "admin" } | null;
			session: Session | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
