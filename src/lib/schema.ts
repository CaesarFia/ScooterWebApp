import { relations } from "drizzle-orm";
import { serial, text, timestamp, pgTable, numeric, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: serial("id").primaryKey(),
  firstname: text("firstname"),
  lastname: text("lastname"),
  email: text("email"),
  passwordHash: text("password_hash"),
  role: text("role").$type<"admin" | "employee" | "customer">(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

// export const scooters = pgTable("scooter", {
//     id: serial("id").primaryKey(),
//     make: text("make"),
//     model: text("model"),
//     year: text("year"),
//     vin: text("vin"),
//     latitude: numeric("latitude"),
//     longitude: numeric("longitude"),
//     available: boolean("available"),
//     createdAt: timestamp("created_at"),
//     updatedAt: timestamp("updated_at"),
// });

// export const rentals = pgTable("rental", {
//     id: serial("id").primaryKey(),
//     customer: numeric("customer_id"),
//     scooter: numeric("scooter_id"),
//     approver: numeric("approver_id"),
//     start: timestamp("start"),
//     end: timestamp("end"),
//     createdAt: timestamp("created_at"),
//     updatedAt: timestamp("updated_at"),
// });

// export const rentalRelations = relations(rentals, ({ one }) => ({
//   customer: one(users, {
//     fields: [rentals.customer],
//     references: [users.id],
//   }),
  
// }));