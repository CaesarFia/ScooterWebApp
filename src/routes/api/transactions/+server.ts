import db from "$lib/db"
import { transactions } from "$lib/db/schema"
import { NextRequest, NextResponse } from "next/server"

// TODO: update to check user once Lucia is up and running
// TODO: validate user exists?

export const GET = async function ( request: NextRequest ) {
    const {searchParams} = new URL(request.url)

    const customer = searchParams.get("customer")

    const transactions = customer ? await db.query.transactions.findMany({
        where: (table, {eq}) => eq(table.customerId, customer)
    }) : null

    return NextResponse.json(transactions ? transactions : {})
}

export const POST = async function ( request: NextRequest ) {
    const {searchParams} = new URL(request.url)

    const customer = searchParams.get("customer")
    const scooter = searchParams.get("scooter")
    const employee = searchParams.get("employee")
    
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    customer && scooter && employee ? await db.insert(transactions).values({
        customerId: customer,
        scooterId: scooter,
        employeeId: employee,
    }) : null

    return customer && scooter && employee ? NextResponse.json({ success: true }) : NextResponse.json({ success: false }) // TODO: legit error handling
}