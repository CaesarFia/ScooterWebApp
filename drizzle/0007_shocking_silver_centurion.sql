ALTER TABLE "rentals" RENAME COLUMN "approver_in_id" TO "approver_id";--> statement-breakpoint
ALTER TABLE "rentals" DROP CONSTRAINT "rentals_approver_out_id_employees_id_fk";
--> statement-breakpoint
ALTER TABLE "rentals" DROP CONSTRAINT "rentals_approver_in_id_employees_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rentals" ADD CONSTRAINT "rentals_approver_id_employees_id_fk" FOREIGN KEY ("approver_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "rentals" DROP COLUMN IF EXISTS "approver_out_id";