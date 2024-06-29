CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstname" text,
	"lastname" text,
	"email" text,
	"password_hash" text,
	"role" text,
	"created_at" timestamp,
	"updated_at" timestamp
);
