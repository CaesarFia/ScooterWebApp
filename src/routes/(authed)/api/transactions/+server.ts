import db from "$lib/db"
import { transactions } from "$lib/db/schema"
import { generateIdFromEntropySize } from "lucia";
import { json } from "@sveltejs/kit";
import { sql, eq } from "drizzle-orm";
import { lucia } from "$lib/server/auth";

export const GET = async function ({ locals }) {
    const { user } = locals;
    if (!user) return json({ success: false })

    const history = user.isAdmin===null  && user.id
        ? await db.select().from(transactions).where(eq(transactions.customerId, user.id)) 
        : await db.select().from(transactions)
    return json(history)
}
export const POST = async function ({ request, locals }) {
    const { user } = locals;
    const {customerId, scooterId} = await request.json()
    if (!user) return json({ success: false })
    if (user.isAdmin === null) return json({ success: false })
    
    const id = generateIdFromEntropySize(10)
    const employeeId = user.id;
    
    await db.insert(transactions).values({
      id: id,
      customerId: customerId,
      scooterId: scooterId,
      employeeId: employeeId
    });
    return json({ id })
}

export const PATCH = async ({ request, locals }) => {
    const { user } = locals;
    const { amount, transactionId } = await request.json()

    if(!user) return json({ success: false })


    if(user.isAdmin===null) return json({ success: false })
    
    await db.update(transactions).set({ amount, checkOutTime: sql`now()` }).where(eq(transactions.id, transactionId))

    return json({ success: true })
}

export const DELETE = async ({ request, locals }) => {
    const { user } = locals;
    const { transactionId } = await request.json();

    if(!user) return json({ success: false })


    if (user.isAdmin === null) return json({ success: false });

    await db.delete(transactions).where(eq(transactions.id, transactionId));
    return json({ success: true });
};
