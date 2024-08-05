import { redirect, error, type Actions } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

import db from '$lib/db';
import { employees, customers, transactions, users } from '$lib/db/schema';
import { isValidEmail, isValidPassword } from '$lib/utils';
import { generateIdFromEntropySize } from 'lucia';

export const actions: Actions = {
    add_balance: async (event) => {
        if (!event.locals.user) {
            error(403, { message: 'Forbidden' });
        }
        const formData = await event.request.formData();
        const new_balance = Number(formData.get('new_balance'))?.toString();
        const transaction_id = generateIdFromEntropySize(10);

        await db.insert(transactions).values({
            id: transaction_id,
            customerId: event.locals.user.id,
            employeeId: null,
            amount: new_balance,
        })

        await db.update(customers).set({ balance: (Number(new_balance) + Number(event.locals.user.balance)).toString() }).where(eq(customers.id, event.locals.user.id));
        redirect(302, "/balance");

    },
};

/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
    if (!locals.user || !locals.user.isAdmin) {
        error(403, { message: 'Forbidden' });
    }

    const currentBalance = locals.user.balance;

    return {
        data: {
            currentBalance
        }
    };
}
