import { pgEnum, pgTable, text, timestamp, uuid, jsonb, boolean } from "drizzle-orm/pg-core"
import { workspacesTable } from "./workspaces-schema"

export const agentTypeEnum = pgEnum("agent_type", ["ideation", "research", "content", "editor"])

export const agentConfigsTable = pgTable("agent_configs", {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
        .references(() => workspacesTable.id, { onDelete: "cascade" })
        .notNull(),
    agentType: agentTypeEnum("agent_type").notNull(),
    name: text("name").notNull(),
    instructions: text("instructions"),
    examples: jsonb("examples"),
    parameters: jsonb("parameters"),
    isDefault: boolean("is_default").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date())
})

export type InsertAgentConfig = typeof agentConfigsTable.$inferInsert
export type SelectAgentConfig = typeof agentConfigsTable.$inferSelect 