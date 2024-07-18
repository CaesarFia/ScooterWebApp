CREATE TABLE IF NOT EXISTS "customers" (
	"id" text PRIMARY KEY NOT NULL,
	"balance" numeric(1000, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "employees" (
	"id" text PRIMARY KEY NOT NULL,
	"is_admin" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rentals" (
	"id" text PRIMARY KEY NOT NULL,
	"customer_id" text NOT NULL,
	"scooter_id" text NOT NULL,
	"approver_id" text,
	"transaction_id" text,
	"start_time" timestamp with time zone NOT NULL,
	"end_time" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_customer_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_scooter_id_scooters_id_fk";
--> statement-breakpoint
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_employee_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "scooters" ALTER COLUMN "latitude" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "scooters" ALTER COLUMN "longitude" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "employee_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "amount" SET DATA TYPE numeric(1000, 2);--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "amount" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "customers" ADD CONSTRAINT "customers_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employees" ADD CONSTRAINT "employees_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rentals" ADD CONSTRAINT "rentals_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rentals" ADD CONSTRAINT "rentals_scooter_id_scooters_id_fk" FOREIGN KEY ("scooter_id") REFERENCES "public"."scooters"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rentals" ADD CONSTRAINT "rentals_approver_id_employees_id_fk" FOREIGN KEY ("approver_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rentals" ADD CONSTRAINT "rentals_transaction_id_transactions_id_fk" FOREIGN KEY ("transaction_id") REFERENCES "public"."transactions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "transactions" DROP COLUMN IF EXISTS "scooter_id";--> statement-breakpoint
ALTER TABLE "transactions" DROP COLUMN IF EXISTS "check_in_time";--> statement-breakpoint
ALTER TABLE "transactions" DROP COLUMN IF EXISTS "check_out_time";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "credit";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "is_admin";