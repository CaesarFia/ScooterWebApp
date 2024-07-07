import { users } from "$lib/db/schema"
import db from "$lib/db"
import { NextRequest, NextResponse } from "next/server"

// Maybe add filterSchema for safety

export const GET = async function ( request: NextRequest ) {
    const {searchParams} = new URL(request.url)
    
    const email = searchParams.get("email")
    const password = searchParams.get("password")

    const users = email && password ? await db.query.users.findFirst({
        where: (table, { eq }) => eq(table.email, email) && eq(table.passwordHash, password) // TODO: Implement hash
    }) : null

    return NextResponse.json(users ? users : {})
}

export const POST = async function ( request: NextRequest) {
    const {searchParams} = new URL(request.url)

    const firstname = searchParams.get("firstname")
    const lastname = searchParams.get("lastname")
    const email = searchParams.get("email")
    const password = searchParams.get("password")
    const admin = searchParams.get("admin")

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    firstname && lastname && email && password ? await db.insert(users).values({
        firstname,
        lastname,
        email,
        passwordHash: password,
        isAdmin: admin ? (admin === "true" ? true : false) : null 
    }) : null

    return firstname && lastname && email && password ? NextResponse.json({ success: true }) : NextResponse.json({ success: false }) // TODO: legit error handling
}