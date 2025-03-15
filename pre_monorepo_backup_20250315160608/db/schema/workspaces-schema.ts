import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const workspacesTable = pgTable("workspaces", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull(),
    name: text("name").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date())
})

export type InsertWorkspace = typeof workspacesTable.$inferInsert
export type SelectWorkspace = typeof workspacesTable.$inferSelect 