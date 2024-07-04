import { drizzle } from "drizzle-orm/node-postgres"
import pg from "pg"
import * as schema from "./schema"

export const client = new pg.Client({
  user: 'postgres',
  password: '07kjhsuka',
  host: 'localhost',
  port: 5432,
  database: 'postgres',
})
await client.connect()
export default drizzle(client, { schema })
