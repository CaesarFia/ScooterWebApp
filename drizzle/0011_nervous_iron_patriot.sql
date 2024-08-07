ALTER TABLE "scooters" DROP COLUMN "year_purchased";--> statement-breakpoint
ALTER TABLE "scooters" ADD COLUMN "year_purchased" integer;
ALTER TABLE "transactions" ADD COLUMN "modifier_id" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_modifier_id_employees_id_fk" FOREIGN KEY ("modifier_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
