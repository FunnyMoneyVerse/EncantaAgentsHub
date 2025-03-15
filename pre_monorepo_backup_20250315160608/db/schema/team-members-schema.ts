import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { workspacesTable } from "./workspaces-schema"

export const roleEnum = pgEnum("role", ["admin", "editor", "viewer"])

export const teamMembersTable = pgTable("team_members", {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
        .references(() => workspacesTable.id, { onDelete: "cascade" })
        .notNull(),
    userId: text("user_id").notNull(),
    role: roleEnum("role").notNull().default("viewer"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date())
})

export type InsertTeamMember = typeof teamMembersTable.$inferInsert
export type SelectTeamMember = typeof teamMembersTable.$inferSelect 