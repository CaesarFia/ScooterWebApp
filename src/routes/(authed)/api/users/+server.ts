import { customers, employees, users } from "$lib/db/schema"
import db from "$lib/db"
import { generateIdFromEntropySize } from "lucia";
import { json, error } from "@sveltejs/kit";
import { eq, sql } from "drizzle-orm";

// Maybe add filterSchema for safety

export const GET = async function ({ locals }) {
	const { user } = locals;
    if (!user) 
        error(403, "You must be logged in to access this resource.");

    const userData = user.role === "customer"
        ? await db.select().from(users).where(eq(users.id, user.id))
        : await db.select().from(users)
    return userData ? json(userData[0]) : error(404, "User not found.")
}

export const POST = async function ({ request, locals }) {
	const { user } = locals;
    if (!user || user.role === "customer")
        error(403, "Porbidden.");

    const { firstname, lastname, email, passwordHash, isAdmin } = await request.json()
    const id = generateIdFromEntropySize(10)

    await db.insert(users).values({
        id,
        firstname,
        lastname,
        email,
        passwordHash
    })

    if (isAdmin !== null && isAdmin !== undefined) {
        await db.insert(employees).values({ id, isAdmin });
    } else {
        await db.insert(customers).values({ id, balance: "0" });
    }

    return json({ id })
}
export const DELETE = async ({ request, locals }) => {
	const { user } = locals;
    if (!user || user.role === "customer")
        error(403, "Porbidden.");

    const { userId } = await request.json();

    await db.delete(users).where(eq(users.id, userId));
    return json({ success: true });
};