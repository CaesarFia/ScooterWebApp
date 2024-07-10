import { relations, sql } from "drizzle-orm";
import { text, integer, date, pgTable, boolean, timestamp } from "drizzle-orm/pg-core";

export const sessionTable = pgTable("session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => users.id),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date"
	}).notNull()
});

export const users = pgTable("users", {
  id: text("id").primaryKey().notNull(),
  firstname: text("firstname").notNull(),
  lastname: text("lastname").notNull(),
  email: text("email").notNull(),
  passwordHash: text("password_hash").notNull(),
  credit: integer("credit"),
  isAdmin: boolean("is_admin")
});

export const  scooters = pgTable("scooters", {
  id: text("id").primaryKey().notNull(),
  latitude: integer("latitude").notNull(),
  longitude: integer("longitude").notNull(),
  checkedOut: boolean("checked_out").notNull(),
  needRepairs: boolean("need_repairs").notNull(),
  battery: integer("battery").notNull()
})

export const transactions = pgTable("transactions", {
  id: text("id").primaryKey().notNull(),
  customerId: text("customer_id").references(() => users.id, {onDelete: "cascade"}).notNull(),
  scooterId: text("scooter_id").references(() => scooters.id, { onDelete: "cascade" }).notNull(),
  employeeId: text("employee_id").references(() => users.id, {onDelete: "cascade"}).notNull(),
  amount: integer("amount"),
  checkInTime: date("check_in_time").default(sql`now()`),
  checkOutTime: date("check_out_time")
})

// Define relationships for transactions
export const transactionsRelations = relations(transactions, ({ one }) => ({
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

export const sessionRelations = relations(sessionTable, ({ one }) => ({
  user: one(users, {
    fields: [sessionTable.userId],
    references: [users.id],
  }),
}))