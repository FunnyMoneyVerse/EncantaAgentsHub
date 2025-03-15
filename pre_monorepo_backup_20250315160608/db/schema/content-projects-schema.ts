import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { workspacesTable } from "./workspaces-schema"

export const contentStatusEnum = pgEnum("content_status", ["draft", "in_progress", "review", "completed", "archived"])
export const contentTypeEnum = pgEnum("content_type", ["blog", "social", "email", "website", "other"])

export const contentProjectsTable = pgTable("content_projects", {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
        .references(() => workspacesTable.id, { onDelete: "cascade" })
        .notNull(),
    userId: text("user_id").notNull(),
    title: text("title").notNull(),
    description: text("description"),
    status: contentStatusEnum("content_status").notNull().default("draft"),
    contentType: contentTypeEnum("content_type").notNull().default("blog"),
    targetAudience: text("target_audience"),
    keyMessages: text("key_messages"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date())
})

export type InsertContentProject = typeof contentProjectsTable.$inferInsert
export type SelectContentProject = typeof contentProjectsTable.$inferSelect 