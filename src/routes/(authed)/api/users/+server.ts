import { users } from "$lib/db/schema"
import db from "$lib/db"
import { generateIdFromEntropySize } from "lucia";
import { json, error } from "@sveltejs/kit";
import { eq, sql } from "drizzle-orm";

// Maybe add filterSchema for safety

export const GET = async function ({ locals }) {
	const { user } = locals;
    if (!user) 
        error(403, "You must be logged in to access this resource.");

    const userData = user.isAdmin != null 
        ? await db.select().from(users)
        : await db.select().from(users).where(sql`(${user.email} === ${users.email})`)
    return userData ? json(userData) : json({ success: false })
}

export const POST = async function ({ request, locals }) {
	const { user } = locals;
    if (!user || user.role === "customer")
        error(403, "Porbidden.");

    const { firstname, lastname, email, passwordHash, isAdmin } = await request.json()
    const id = generateIdFromEntropySize(10)

    const newsAdmin = user.isAdmin ? isAdmin : null
    const credit = isAdmin===null ? 0 : null
    await db.insert(users).values({
        id,
        firstname,
        lastname,
        email,
        passwordHash
    })

    return json({ id, isAdmin })
}
export const DELETE = async ({ request, locals }) => {
	const { user } = locals;
    if (!user || user.role === "customer")
        error(403, "Porbidden.");

    const { userId } = await request.json();

    await db.delete(users).where(eq(users.id,userId));
    return json({ success: true });
};