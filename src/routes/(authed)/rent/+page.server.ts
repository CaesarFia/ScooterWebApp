
import { hash } from '@node-rs/argon2';
import { error, type Actions } from '@sveltejs/kit';
import { generateIdFromEntropySize } from 'lucia';

import db from '$lib/db';
import { rentals, scooters, transactions, users } from '$lib/db/schema';
import { isValidEmail, isValidPassword } from '$lib/utils';

export const actions: Actions = {
    make_rental: async ({ locals }) => {

        // information for transaction
        const scooterId = "bzqvdmhliogxc3u2" // this will be a given scooter id
        const rentalId = generateIdFromEntropySize(10); // 16 characters long
        const transactionId = generateIdFromEntropySize(10); // 16 characters long
        const now = new Date();
        const customerId = locals.user?.id;
        const cost = "3";
        const customerBalance = locals.user?.balance;

        if (customerId == null) {
            error(400, {
                message: 'invalid customer'
            });
        }

        // check balance
        if (customerBalance == null || customerBalance < cost) {
            error(400, {
                message: "insufficient balance"
            })
        }


        await db.insert(transactions).values({
            id: transactionId,
            customerId: customerId,
            employeeId: null,
            amount: cost,
        })

        await db.insert(rentals).values({
            id: rentalId,
            customerId: customerId,
            scooterId: scooterId,
            approverId: null,
            transactionId: transactionId,
            mileage: 0,
            startTime: now,
            endTime: null,
        });
    },

};

/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
    if (!locals.user || !locals.user.isAdmin) {
        error(403, { message: 'Forbidden' });
    }

    const scooterList = await db.select().from(scooters);
    const userList = await db.select().from(users);
    const transactionList = await db.select().from(transactions);
    const currentUser = locals.user;

    return {
        data: {
            scooterList,
            userList,
            transactionList,
            currentUser
        }
    };
}
