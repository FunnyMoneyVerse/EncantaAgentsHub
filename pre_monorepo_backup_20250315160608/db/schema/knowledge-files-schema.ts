import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { workspacesTable } from "./workspaces-schema"

export const knowledgeFilesTable = pgTable("knowledge_files", {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
        .references(() => workspacesTable.id, { onDelete: "cascade" })
        .notNull(),
    userId: text("user_id").notNull(),
    fileName: text("file_name").notNull(),
    fileUrl: text("file_url").notNull(),
    fileType: text("file_type").notNull(),
    fileSize: text("file_size").notNull(),
    description: text("description"),
    vectorId: text("vector_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date())
})

export type InsertKnowledgeFile = typeof knowledgeFilesTable.$inferInsert
export type SelectKnowledgeFile = typeof knowledgeFilesTable.$inferSelect 