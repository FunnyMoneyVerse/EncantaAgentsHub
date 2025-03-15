import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { workspacesTable } from "./workspaces-schema"

export const fileTypeEnum = pgEnum("file_type", ["pdf", "doc", "txt", "csv", "other"])

export const knowledgeFilesTable = pgTable("knowledge_files", {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
        .references(() => workspacesTable.id, { onDelete: "cascade" })
        .notNull(),
    name: text("name").notNull(),
    description: text("description"),
    fileUrl: text("file_url").notNull(),
    fileType: fileTypeEnum("file_type").notNull().default("other"),
    uploadedBy: text("uploaded_by").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date())
})

export type InsertKnowledgeFile = typeof knowledgeFilesTable.$inferInsert
export type SelectKnowledgeFile = typeof knowledgeFilesTable.$inferSelect 