import { relations } from "drizzle-orm";
import { text, integer, serial, numeric, pgTable, boolean, timestamp, pgView, date } from "drizzle-orm/pg-core";

export type Location = {
  name: string,
  latitude: number,
  longitude: number
}

export const locations: Location[] = [
  {name: "Malachowsky", latitude: 29.644323, longitude: -82.347999},
  {name: "Hume Hall", latitude: 29.644780, longitude: -82.351581},
  {name: "Turlington", latitude: 29.649078, longitude: -82.343826},
  {name: "Carelton Auditorium", latitude: 29.649027, longitude: -82.341442},
  {name: "Reitz Union", latitude: 29.646710, longitude: -82.347624},
  {name: "Flavet Field", latitude: 29.647132, longitude: -82.353396},
  {name: "O'Connell Center", latitude: 29.649447, longitude: -82.350279},
  {name: "Shands", latitude: 29.639535, longitude: -82.343739},
  {name: "Broward Hall", latitude: 29.646864, longitude: 82.342221},
  {name: "Gator Corner", latitude: 29.648277, longitude: -82.350027},
  {name: "Campus cravings", latitude: 29.650039, longitude: -82.346129}
]

export enum UserType {
  Customer= "customer",
  Employee= "employee",
  Admin= "admin"
}

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
  email: text("email").unique().notNull(),
  passwordHash: text("password_hash").notNull(),
});


// A user may be a customer with a balance
export const customers = pgTable("customers", {
  id: text("id").primaryKey().references(() => users.id, {onDelete: "cascade"}).notNull(),
  // Use numeric for currency values
  balance: numeric("balance", { precision: 10, scale: 2 }).notNull(),
});


// Or a user may be an employee with an isAdmin flag
export const employees = pgTable("employees", {
  id: text("id").primaryKey().references(() => users.id, {onDelete: "cascade"}).notNull(),
  isAdmin: boolean("is_admin").notNull(),
});


export const  scooters = pgTable("scooters", {
  number: serial("number").primaryKey().notNull(),
  latitude: numeric("latitude", {precision: 9, scale: 6}).notNull(), // TODO: Change to numeric for more precision?
  longitude: numeric("longitude", {precision: 9, scale: 6}).notNull(),
  model: text("model").notNull(),
  yearPurchased: date("year_purchased").notNull(),
  timesUsed: numeric("times_used", {precision: 4, scale: 0}).notNull(),
  mileage: numeric("mileage", {precision: 9, scale: 2}).notNull(),
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
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
})


// A rental is a record of a scooter being rented out
export const rentals = pgTable("rentals", {
  id: text("id").primaryKey().notNull(),
  customerId: text("customer_id").references(() => customers.id).notNull(),
  scooterId: integer("scooter_id").references(() => scooters.number).notNull(),
  // When an employee approves a rental return, store their ID
  approveId: text("approver_id").references(() => employees.id),
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
  approvedOutRentals: many(rentals),
  approvedInRentals: many(rentals),
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
    references: [scooters.number],
  }),
  approve: one(employees, {
    fields: [rentals.approveId],
    references: [employees.id],
  }),
  transaction: one(transactions, {
    fields: [rentals.transactionId],
    references: [transactions.id],
  }),
}));


// Define users_info view to get all user info
// I would've used this view in the auth.ts file
// to get all user info in one query but drizzle-orm
// is not stable enough to handle views
export const usersInfo = pgView("users_info", {
  id: text("id").primaryKey().notNull(),
  firstname: text("firstname").notNull(),
  lastname: text("lastname").notNull(),
  email: text("email").unique().notNull(),
  passwordHash: text("password_hash").notNull(),
  balance: numeric("balance", { precision: 10, scale: 2 }),
  isAdmin: boolean("is_admin"),
}).existing();

// This query was used to create the users_info view
// For the exact SQL, see the migration file 0005_premium_stone_men.sql
// .as(
//   (qb) => qb.select({
//     id: users.id,
//     firstname: users.firstname,
//     lastname: users.lastname,
//     email: users.email,
//     passwordHash: users.passwordHash,
//     balance: customers.balance,
//     isAdmin: employees.isAdmin,
//   }).from(users)
//     .leftJoin(customers, eq(users.id, customers.id))
//     .leftJoin(employees, eq(users.id, employees.id))
// );
