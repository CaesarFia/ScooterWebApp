import { relations } from "drizzle-orm";
import { text, integer, real, numeric, pgTable, boolean, timestamp } from "drizzle-orm/pg-core";

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
});


// A user may be a customer with a balance
export const customers = pgTable("customers", {
  id: text("id").primaryKey().references(() => users.id, {onDelete: "cascade"}).notNull(),
  // Use numeric for currency values
  balance: numeric("balance", { precision: 1000, scale: 2 }).notNull(),
});


// Or a user may be an employee with an isAdmin flag
export const employees = pgTable("employees", {
  id: text("id").primaryKey().references(() => users.id, {onDelete: "cascade"}).notNull(),
  isAdmin: boolean("is_admin").notNull(),
});


export const  scooters = pgTable("scooters", {
  id: text("id").primaryKey().notNull(),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  checkedOut: boolean("checked_out").notNull(),
  needRepairs: boolean("need_repairs").notNull(),
  battery: integer("battery").notNull()
})


// A transaction is a record of adding or removing funds from a customer's account
export const transactions = pgTable("transactions", {
  id: text("id").primaryKey().notNull(),
  customerId: text("customer_id").references(() => customers.id).notNull(),
  // If an employee is involved, store their ID
  employeeId: text("employee_id").references(() => employees.id),
  amount: numeric("amount", { precision: 1000, scale: 2 }).notNull(),
})


// A rental is a record of a scooter being rented out
export const rentals = pgTable("rentals", {
  id: text("id").primaryKey().notNull(),
  customerId: text("customer_id").references(() => customers.id).notNull(),
  scooterId: text("scooter_id").references(() => scooters.id).notNull(),
  // When an employee approves a rental, store their ID
  approverId: text("approver_id").references(() => employees.id),
  // When the scooter is returned and paid, store the transaction ID
  transactionId: text("transaction_id").references(() => transactions.id),
  startTime: timestamp("start_time", {
    withTimezone: true,
    mode: "date"
  }).notNull(),
  // End time is nullable until the scooter is returned
  endTime: timestamp("end_time", {
    withTimezone: true,
    mode: "date"
  })
})


// Allow the session to reference the user
export const sessionRelations = relations(sessionTable, ({ one }) => ({
  user: one(users, {
    fields: [sessionTable.userId],
    references: [users.id],
  }),
}))


// User relations
export const usersRelations = relations(users, ({ one }) => ({
  ascustomer: one(customers, {
    fields: [users.id],
    references: [customers.id],
  }),
  asemployee: one(employees, {
    fields: [users.id],
    references: [employees.id],
  }),
}))


// Customer relations 
export const customerRelations = relations(customers, ({ one, many }) => ({
  user: one(users, {
    fields: [customers.id],
    references: [users.id],
  }),
  transactions: many(transactions),
  rentals: many(rentals),
}))


// Employee relations
export const employeeRelations = relations(employees, ({ one, many }) => ({
  user: one(users, {
    fields: [employees.id],
    references: [users.id],
  }),
  manualTransactions: many(transactions),
  approvedRentals: many(rentals),
}))


// Define relationships for scooters
export const scootersRelations = relations(scooters, ({ many }) => ({
  rentals: many(rentals),
}));


export const transactionsRelations = relations(transactions, ({ one }) => ({
  customer: one(customers, {
    fields: [transactions.customerId],
    references: [customers.id],
  }),
  employee: one(employees, {
    fields: [transactions.employeeId],
    references: [employees.id],
  })
}));


// Define relationships for rentals
export const rentalsRelations = relations(rentals, ({ one }) => ({
  customer: one(customers, {
    fields: [rentals.customerId],
    references: [customers.id],
  }),
  scooter: one(scooters, {
    fields: [rentals.scooterId],
    references: [scooters.id],
  }),
  approver: one(employees, {
    fields: [rentals.approverId],
    references: [employees.id],
  }),
  transaction: one(transactions, {
    fields: [rentals.transactionId],
    references: [transactions.id],
  }),
}));
