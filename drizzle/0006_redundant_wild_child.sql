ALTER TABLE "rentals" DROP CONSTRAINT "rentals_scooter_id_scooters_id_fk";
--> statement-breakpoint
ALTER TABLE "scooters" DROP CONSTRAINT "scooters_pkey";
ALTER TABLE "scooters" DROP COLUMN "id";
ALTER TABLE "rentals" ALTER COLUMN "scooter_id" SET DATA TYPE integer USING scooter_id::integer;--> statement-breakpoint
ALTER TABLE "scooters" ALTER COLUMN "latitude" SET DATA TYPE numeric(9, 6);--> statement-breakpoint
ALTER TABLE "scooters" ALTER COLUMN "longitude" SET DATA TYPE numeric(9, 6);--> statement-breakpoint
ALTER TABLE "scooters" ADD COLUMN "number" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "scooters" ADD COLUMN "model" text NOT NULL;--> statement-breakpoint
ALTER TABLE "scooters" ADD COLUMN "year_purchased" date NOT NULL;--> statement-breakpoint
ALTER TABLE "scooters" ADD COLUMN "times_used" numeric(4, 0) NOT NULL;--> statement-breakpoint
ALTER TABLE "scooters" ADD COLUMN "mileage" numeric(9, 2) NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rentals" ADD CONSTRAINT "rentals_scooter_id_scooters_number_fk" FOREIGN KEY ("scooter_id") REFERENCES "public"."scooters"("number") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "scooters" DROP COLUMN IF EXISTS "id";