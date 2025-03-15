import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { documentsTable } from "./documents-schema"

export const commentsTable = pgTable("comments", {
    id: uuid("id").defaultRandom().primaryKey(),
    documentId: uuid("document_id")
        .references(() => documentsTable.id, { onDelete: "cascade" })
        .notNull(),
    userId: text("user_id").notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date())
})

export type InsertComment = typeof commentsTable.$inferInsert
export type SelectComment = typeof commentsTable.$inferSelect 