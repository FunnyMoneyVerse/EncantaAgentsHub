import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { workspacesTable } from "./workspaces-schema"

export const brandProfilesTable = pgTable("brand_profiles", {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
        .references(() => workspacesTable.id, { onDelete: "cascade" })
        .notNull(),
    name: text("name").notNull(),
    description: text("description"),
    brandVoice: text("brand_voice"),
    targetAudience: text("target_audience"),
    keyMessages: text("key_messages"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date())
})

export type InsertBrandProfile = typeof brandProfilesTable.$inferInsert
export type SelectBrandProfile = typeof brandProfilesTable.$inferSelect 