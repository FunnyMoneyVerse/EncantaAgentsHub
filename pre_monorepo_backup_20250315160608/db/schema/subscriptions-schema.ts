import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const planEnum = pgEnum("plan", ["free", "starter", "professional", "business", "enterprise"])
export const billingCycleEnum = pgEnum("billing_cycle", ["monthly", "yearly"])
export const subscriptionStatusEnum = pgEnum("subscription_status", ["active", "canceled", "past_due", "trialing", "unpaid"])

export const subscriptionsTable = pgTable("subscriptions", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull(),
    stripeCustomerId: text("stripe_customer_id"),
    stripeSubscriptionId: text("stripe_subscription_id"),
    plan: planEnum("plan").notNull().default("free"),
    billingCycle: billingCycleEnum("billing_cycle").notNull().default("monthly"),
    status: subscriptionStatusEnum("subscription_status").notNull().default("active"),
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