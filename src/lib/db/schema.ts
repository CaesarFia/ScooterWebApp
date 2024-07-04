import { relations } from "drizzle-orm";
import { serial, varchar, integer, date, pgTable, numeric, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey().notNull(),
  firstname: varchar("firstname", { length: 255}).notNull(),
  lastname: varchar("lastname", { length: 255}).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  credit: integer("credit"),
  isAdmin: boolean("is_admin")
});

export const  scooters = pgTable("scooters", {
  id: serial("id").primaryKey().notNull(),
  latitude: integer("latitude").notNull(),
  longitude: integer("longitude").notNull(),
  checkedOut: boolean("checked_out").notNull(),
  needRepairs: boolean("need_repairs").notNull(),
  battery: integer("battery").notNull()
})

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey().notNull(),
  customerId: integer("customer_id").references(() => users.id, {onDelete: "cascade"}).notNull(),
  scooterId: integer("scooter_id").references(() => scooters.id, { onDelete: "cascade" }).notNull(),
  employeeId: integer("employee_id").references(() => users.id, {onDelete: "cascade"}).notNull(),
  amount: integer("amount"),
  checkInTime: date("check_in_time"),
  checkOutTime: date("check_out_time")
})

// Define relationships for transactions
export const transactionsRelations = relations(transactions, ({ one, many }) => ({
  customer: one(users, {
    fields: [transactions.customerId],
    references: [users.id],
  }),
  scooter: one(scooters, {
    fields: [transactions.scooterId],
    references: [scooters.id],
  }),
  employee: one(users, {
    fields: [transactions.employeeId],
    references: [users.id],
  }),
}));

// Define relationships for users
export const usersRelations = relations(users, ({ many }) => ({
  transactionsAsCustomer: many(transactions)
}))

// Define relationships for scooters
export const scootersRelations = relations(scooters, ({ many }) => ({
  transactions: many(transactions),
}));