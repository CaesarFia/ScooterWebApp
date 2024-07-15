import db from "$lib/db"
import { transactions } from "$lib/db/schema"
import { generateIdFromEntropySize } from "lucia";
import { error, json } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const GET = async function ({ locals }) {
    const { user } = locals;
    if (!user)
        error(403, "You must be logged in to access this resource.");

    const history = user.role === "customer"  && user.id
        ? await db.select().from(transactions).where(eq(transactions.customerId, user.id)) 
        : await db.select().from(transactions)
    return json(history)
}
export const POST = async function ({ request, locals }) {
    const { user } = locals;
    if (!user || user.role === "customer")
        error(403, "Porbidden.");

    const { customerId, amount } = await request.json()
    
    const id = generateIdFromEntropySize(10)
    const employeeId = user.id;
    
    await db.insert(transactions).values({
      id,
      customerId,
      employeeId,
      amount
    });
    return json({ id })
}

export const PATCH = async ({ request, locals }) => {
    const { user } = locals;
    if (!user || user.role === "customer")
        error(403, "Porbidden.");

    const { amount, transactionId } = await request.json()
    
    await db.update(transactions).set({ amount, employeeId: user.id }).where(eq(transactions.id, transactionId))
    return json({ success: true })
}

export const DELETE = async ({ request, locals }) => {
    const { user } = locals;
    if (!user || user.role === "customer")
        error(403, "Porbidden.");

    const { transactionId } = await request.json();

    await db.delete(transactions).where(eq(transactions.id, transactionId));
    return json({ success: true });
};
