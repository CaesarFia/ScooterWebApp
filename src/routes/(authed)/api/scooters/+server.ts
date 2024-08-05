// src/routes/api/scooters/+server.js
import db from "$lib/db";
import { scooters } from "$lib/db/schema";
import { generateIdFromEntropySize } from "lucia";
import { json, error } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

// Handle GET requests
export const GET = async ({ locals }) => {
    const { user } = locals;
    if (!user)
        error(403, "You must be logged in to access this resource.");

    const scootersList =
        user.role === "customer" ?
        await db.select().from(scooters).where(eq(scooters.checkedOut, false)) :
        await db.select().from(scooters)
    return json(scootersList);
};

// Handle POST requests
export const POST = async ({ request, locals }) => {
    const { user } = locals;
    if (!user || user.role == "customer")
        error(403, "Forbidden.");

    const id = generateIdFromEntropySize(10)
    const { latitude, longitude, battery } = await request.json()
    if (latitude && longitude && battery) {
        await db.insert(scooters).values({
            id,
            latitude,
            longitude,
            checkedOut: false,
            needRepairs: false,
            battery
        });
        return json({ id });
    } else {
        console.error("isAdmin: " + user.isAdmin + "\nlat: " + latitude + "\nlong: " + longitude + "\nbattery: " + battery);
        error(422, "Missing required fields, required to have 'latitude', 'longitude', and 'battery'.");
    }
};

export const PATCH = async ({ request, locals }) => {
    const { user } = locals;
    if (!user || user.role === "customer")
        error(403, "Forbidden.");

    const { latitude, longitude, battery, scooterId, needRepairs, checkedOut } = await request.json()
    await db.update(scooters).set({ battery, latitude, longitude, needRepairs, checkedOut }).where(eq(scooters.id, scooterId))

    return json({ success: true })
}

export const DELETE = async ({ request, locals }) => {
    const { user } = locals;
    if (!user || user.role === "customer")
        error(403, "Forbidden.");

    const { scooterId } = await request.json();

    await db.delete(scooters).where(eq(scooters.id, scooterId));
    return json({ success: true });
};
