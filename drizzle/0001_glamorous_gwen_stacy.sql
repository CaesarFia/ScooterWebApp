CREATE TABLE IF NOT EXISTS "scooters" (
	"id" serial PRIMARY KEY NOT NULL,
	"latitude" numeric(6, 3) NOT NULL,
	"longitude" numeric(6, 3) NOT NULL,
	"checked_out" boolean NOT NULL,
	"need_repairs" boolean NOT NULL,
	"battery" numeric(4, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_id" integer NOT NULL,
	"scooter_id" integer NOT NULL,
	"employee_id" integer NOT NULL,
	"amount" integer,
	"check_in_time" date,
	"check_out_time" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstname" varchar(255) NOT NULL,
	"lastname" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"credit" integer,
	"is_admin" boolean
);
--> statement-breakpoint
DROP TABLE "user";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_scooter_id_scooters_id_fk" FOREIGN KEY ("scooter_id") REFERENCES "public"."scooters"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_employee_id_users_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
