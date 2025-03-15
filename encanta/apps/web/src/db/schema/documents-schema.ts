import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { workspacesTable } from "./workspaces-schema"
import { brandProfilesTable } from "./brand-profiles-schema"

export const documentTypeEnum = pgEnum("document_type", ["blog", "social", "email", "ad", "landing", "other"])
export const documentStatusEnum = pgEnum("document_status", ["draft", "review", "published", "archived"])

export const documentsTable = pgTable("documents", {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
        .references(() => workspacesTable.id, { onDelete: "cascade" })
        .notNull(),
    brandProfileId: uuid("brand_profile_id")
        .references(() => brandProfilesTable.id),
    title: text("title").notNull(),
    content: text("content"),
    type: documentTypeEnum("type").notNull().default("other"),
    status: documentStatusEnum("status").notNull().default("draft"),
    createdBy: text("created_by").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date())
})

export type InsertDocument = typeof documentsTable.$inferInsert
export type SelectDocument = typeof documentsTable.$inferSelect 