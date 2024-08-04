-- Custom SQL migration file, to recreate the users_info view -- 
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