import { drizzle } from "drizzle-orm/node-postgres"
import { DATABASE_URL } from "$env/static/private"
import pg from "pg"
import * as schema from "./schema"

export const client = new pg.Client({
  connectionString: DATABASE_URL
})
await client.connect()
export default drizzle(client, { schema })
