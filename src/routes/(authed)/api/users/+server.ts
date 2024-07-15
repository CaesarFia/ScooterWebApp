import { users } from "$lib/db/schema"
import db from "$lib/db"
import { generateIdFromEntropySize } from "lucia";
import { json } from "@sveltejs/kit";
import { eq, sql } from "drizzle-orm";

// Maybe add filterSchema for safety

export const GET = async function ({ locals }) {
	const { user } = locals;
    if (!user) return json({ success: false })

    const userData = user.isAdmin != null 
        ? await db.select().from(users)
        : await db.select().from(users).where(sql`(${user.email} === ${users.email})`)
    return userData ? json(userData) : json({ success: false })
}

export const POST = async function ({ request, locals }) {
	const { user } = locals;
    const { firstname, lastname, email, passwordHash, isAdmin } = await request.json()
    const id = generateIdFromEntropySize(10)

    if (!user) return json({ success: false })

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
    const { userId } = await request.json();

    if(!user) return json({ success: false })

    if (user.isAdmin === null) return json({ success: false });

    await db.delete(users).where(eq(users.id,userId));
    return json({ success: true });
};