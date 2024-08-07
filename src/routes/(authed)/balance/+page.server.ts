import { redirect, error, type Actions } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

import db from '$lib/db';
import { customers, transactions } from '$lib/db/schema';
import { generateIdFromEntropySize } from 'lucia';
import { add } from '$lib/utils';

export const actions: Actions = {
    add_balance: async (event) => {
        if (!event.locals.user) {
            error(403, { message: 'Forbidden' });
        }

        if (event.locals.user.balance === null) {
            error(404, { message: 'Not Found' });
        }

        const formData = await event.request.formData();
        const amount = formData.get('amount')?.toString();
        if (!amount) {
            error(400, { message: 'Bad Request' });
        }

        const transaction_id = generateIdFromEntropySize(10);
        await db.insert(transactions).values({
            id: transaction_id,
            customerId: event.locals.user.id,
            employeeId: null,
            amount: amount,
        });
        
        await db.update(customers).set({ balance: add(amount, event.locals.user.balance) }).where(eq(customers.id, event.locals.user.id));
        redirect(302, "/balance");

    },
};

export async function load({ locals }) {
    if (!locals.user) {
        error(403, { message: 'Forbidden' });
    }

    const user = locals.user

    return {
        user
    };
}
