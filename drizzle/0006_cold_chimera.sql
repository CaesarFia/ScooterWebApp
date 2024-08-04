ALTER TABLE "scooters" ADD COLUMN "number" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "scooters" ADD COLUMN "make" text NOT NULL;--> statement-breakpoint
ALTER TABLE "scooters" ADD COLUMN "year_of_purchase" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "scooters" ADD CONSTRAINT "scooters_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "scooters" ADD CONSTRAINT "scooters_number_unique" UNIQUE("number");