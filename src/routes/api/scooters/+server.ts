import db from "$lib/db"
import { scooters } from "$lib/db/schema"
import { NextRequest, NextResponse } from "next/server"

// Generic API call, will alter once it becomes clear what we want to do with scooters.

export const GET = async function ( request: NextRequest ) {
    const {searchParams} = new URL(request.url)

    const scooters = await db.query.scooters.findMany()

    return NextResponse.json(scooters ? scooters : {})
}

export const POST = async function ( request: NextRequest ) {
    const {searchParams} = new URL(request.url)

    const lat = searchParams.get("latitude")
    const latitude = lat ? parseFloat(lat) : null
    const long = searchParams.get("longitude")
    const longitude = long ? +long : null
    const check = searchParams.get("checkedOut")
    const checkedOut = check && check === "true" ? true : false
    const repair = searchParams.get("needRepairs")
    const needRepairs = repair && repair === "true" ? true : false
    const bat = searchParams.get("battery")
    const battery = bat ? +bat : null
    
    latitude && longitude && battery ? await db.insert(scooters).values({
        latitude,
        longitude,
        checkedOut,
        needRepairs,
        battery
    }) : null

    return latitude && longitude && battery ? NextResponse.json({ success: true }) : NextResponse.json({ success: false }) // TODO: legit error handling
}