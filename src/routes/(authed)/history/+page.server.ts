import { eq, desc } from 'drizzle-orm';

import db from '$lib/db';
import { rentals, scooters, transactions } from '$lib/db/schema';
import { error } from '@sveltejs/kit';
import { transact } from '$lib/calls';
import type { Actions } from './$types';

export const actions: Actions = {
    end_rental: async ({ locals, request }) => {
        if (!locals.user) {
            error(403, { message: 'Forbidden' });
        }

        const formData = await request.formData();

        const rentalId = formData.get('rentalId')?.toString();

        if (!rentalId) {
            error(400, { message: 'Bad request' });
        }

        const rentalResult = await db
            .select()
            .from(rentals)
            .where(eq(rentals.id, rentalId));

        if (rentalResult.length !== 1) {
            error(404, { message: 'Not found' });
        }

        const rental = rentalResult[0];

        if (rental.customerId !== locals.user.id) {
            error(403, { message: 'Forbidden' });
        }

        if (rental.endTime) {
            error(400, { message: 'Rental already ended' });
        }

        const endTime = new Date();
        const startTime = rental.startTime;
        
        // Flat rate of $3 + $5 per 30 minutes
        const cost = (3 + Math.ceil((endTime.getTime() - startTime.getTime()) / 1000 / 60) / 30 * 5).toString();

        // Estimate mileage based on a speed of 10 miles per hour
        const estimateMileage = (endTime.getTime() - startTime.getTime()) / 1000 / 60 / 60 * 10;

        const transactionId = await transact(rental.customerId, cost);

        await db
            .update(rentals)
            .set({
                mileage: estimateMileage,
                transactionId,
                endTime,
            })
            .where(eq(rentals.id, rentalId));
        
        await db.update(scooters).set({
            checkedOut: false
        }).where(eq(scooters.id, rental.scooterId));

        return {
            status: 200,
            body: { success: true },
        };
    }
}

export async function load({ locals }) {
    if (!locals.user) {
        error(403, { message: 'Forbidden' });
    }

    const user_rentals = await db
        .select({
            rentals,
            amount: transactions.amount,
        })
        .from(rentals)
        .orderBy(desc(rentals.startTime))
        .where(eq(rentals.customerId, locals.user.id))
        .leftJoin(transactions, eq(rentals.transactionId, transactions.id));

    const user = locals.user
    console.log(user_rentals)

    return {
        rentals: user_rentals,
        user
    };
}
