ALTER TABLE "rentals" ADD COLUMN "mileage" numeric(9, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "scooters" DROP COLUMN IF EXISTS "times_used";--> statement-breakpoint
ALTER TABLE "scooters" DROP COLUMN IF EXISTS "mileage";