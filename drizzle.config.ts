import { defineConfig } from "drizzle-kit";


export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: `postgres://postgres:${process.env.POSTGRES_PASSWORD}@127.0.0.1:5432/postgres`
  }
});
