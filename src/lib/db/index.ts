import { drizzle } from "drizzle-orm/node-postgres"
import pg from "pg"
import * as schema from "./schema"

export const client = new pg.Client({
  connectionString: process.env.DATABASE_URL
})
await client.connect()
export default drizzle(client, { schema })
