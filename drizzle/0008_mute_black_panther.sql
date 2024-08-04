ALTER TABLE "customers" ALTER COLUMN "balance" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "scooters" ALTER COLUMN "latitude" SET DATA TYPE numeric(9, 6);--> statement-breakpoint
ALTER TABLE "scooters" ALTER COLUMN "longitude" SET DATA TYPE numeric(9, 6);--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "amount" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "rentals" ADD COLUMN "mileage" numeric(9, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "scooters" ADD COLUMN "number" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "scooters" ADD COLUMN "model" text NOT NULL;--> statement-breakpoint
ALTER TABLE "scooters" ADD COLUMN "year_purchased" date NOT NULL;--> statement-breakpoint
ALTER TABLE "scooters" ADD CONSTRAINT "scooters_number_unique" UNIQUE("number");