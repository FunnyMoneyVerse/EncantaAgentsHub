import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const planEnum = pgEnum("plan", ["free", "pro", "enterprise"])

export const subscriptionsTable = pgTable("subscriptions", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull(),
    stripeCustomerId: text("stripe_customer_id"),
    stripeSubscriptionId: text("stripe_subscription_id"),
    plan: planEnum("plan").notNull().default("free"),
    status: text("status").notNull().default("active"),
    currentPeriodStart: timestamp("current_period_start"),
    currentPeriodEnd: timestamp("current_period_end"),
    cancelAtPeriodEnd: text("cancel_at_period_end").default("false"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date())
})

export type InsertSubscription = typeof subscriptionsTable.$inferInsert
export type SelectSubscription = typeof subscriptionsTable.$inferSelect 