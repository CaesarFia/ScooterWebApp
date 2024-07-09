// src/routes/api/scooters/+server.js
import db from "$lib/db";
import { scooters } from "$lib/db/schema";
import { generateIdFromEntropySize } from "lucia";
import { json } from "@sveltejs/kit";
import { eq, sql } from "drizzle-orm";
import { lucia } from "$lib/server/auth";

// Handle GET requests
export const GET = async ({ cookies }) => {
    const distance = 11
    const sessionId = cookies.get("auth_session")
    if(!sessionId) return json({ success: false })
    const { user } = await lucia.validateSession(sessionId)

    if(!user || user.id===null) return json({ success: false })

    const scootersList = user.isAdmin===null ?  await db.select().from(scooters).where(
        sql`${!scooters.checkedOut}`
    ) : await db.select().from(scooters)
    return json(scootersList ? scootersList : { success: false });
};

// Handle POST requests
export const POST = async ({ request, cookies }) => {
    const {latitude, longitude, battery} = await request.json()

    const sessionId = cookies.get("auth_session")
    if(!sessionId) return json(cookies.getAll())
    const { user } = await lucia.validateSession(sessionId)

    if(!user || user.id===null) return json({ success: false })

    const id = generateIdFromEntropySize(10)
    if (user.isAdmin!=null &&  latitude && longitude && battery) {
        await db.insert(scooters).values({
            id,
            latitude,
            longitude,
            checkedOut: false,
            needRepairs: false,
            battery
        });
        return json({ success: true , id: id});
    } else {
        console.error("isAdmin: " + user.isAdmin + "\nlat: " + latitude + "\nlong: " + longitude + "\nbattery: " + battery)
        return json({ success: false, isAdmin: user.isAdmin });
    }
};

export const PATCH = async ({ request, cookies }) => {
    const {latitude, longitude, battery, scooterId, needRepairs, checkedOut} = await request.json()
    const sessionId = cookies.get("auth_session")
    if(!sessionId) return json({ success: false })
    const { user } = await lucia.validateSession(sessionId)

    if(!user || user.id===null) return json({ success: false })


    if(user.isAdmin===null) return json({ success: false })
    
    await db.update(scooters).set({ battery, latitude, longitude, needRepairs, checkedOut }).where(eq(scooters.id, scooterId))

    return json({ success: true })
}

export const DELETE = async ({ request, cookies }) => {
    const { scooterId } = await request.json();
    const sessionId = cookies.get("auth_session")
    if(!sessionId) return json({ success: false })
    const { user } = await lucia.validateSession(sessionId)

    if(!user || user?.id===null) return json({ success: false })


    if (user.isAdmin === null) return json({ success: false });

    await db.delete(scooters).where(sql`(id = ${scooterId})`);
    return json({ success: true });
};
