import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { workspacesTable } from "./workspaces-schema"
import { brandProfilesTable } from "./brand-profiles-schema"

export const projectStatusEnum = pgEnum("project_status", ["active", "completed", "archived"])

export const contentProjectsTable = pgTable("content_projects", {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
        .references(() => workspacesTable.id, { onDelete: "cascade" })
        .notNull(),
    brandProfileId: uuid("brand_profile_id")
        .references(() => brandProfilesTable.id),
    name: text("name").notNull(),
    description: text("description"),
    status: projectStatusEnum("status").notNull().default("active"),
    createdBy: text("created_by").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date())
})

export type InsertContentProject = typeof contentProjectsTable.$inferInsert
export type SelectContentProject = typeof contentProjectsTable.$inferSelect 