ALTER TABLE "rentals" RENAME COLUMN "approver_id" TO "approver_out_id";--> statement-breakpoint
ALTER TABLE "rentals" DROP CONSTRAINT "rentals_approver_id_employees_id_fk";
--> statement-breakpoint
ALTER TABLE "customers" ALTER COLUMN "balance" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "amount" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "rentals" ADD COLUMN "approver_in_id" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rentals" ADD CONSTRAINT "rentals_approver_out_id_employees_id_fk" FOREIGN KEY ("approver_out_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rentals" ADD CONSTRAINT "rentals_approver_in_id_employees_id_fk" FOREIGN KEY ("approver_in_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

-- Custom SQL migration file, put you code below! --
CREATE VIEW
  "users_info" AS
SELECT
  "users"."id" AS "id",
  "users"."firstname",
  "users"."lastname",
  "users"."email",
  "users"."password_hash",
  "customers"."balance",
  "employees"."is_admin"
FROM
  "users"
  LEFT JOIN "customers" ON "customers"."id" = "users"."id"
  LEFT JOIN "employees" ON "employees"."id" = "users"."id"
;

INSERT INTO users (id, firstname, lastname, email, password_hash) 
VALUES ('ukeku7fowg6n36um', 'admin', 'User', 'vroomDev@gmail.com', '$argon2id$v=19$m=19456,t=2,p=1$aexKcHGhPoSbqX2V7WsFqQ$d7b+WqPVATcianB+u/ywXeWUmHIIWzzGWizP4/LqehI'); -- HACK: replace w/ environment vars

INSERT INTO employees (id, is_admin) 
VALUES ((SELECT id from users WHERE email='vroomDev@gmail.com') , 'true');