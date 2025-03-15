import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { workspacesTable } from "./workspaces-schema"

export const brandProfilesTable = pgTable("brand_profiles", {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
        .references(() => workspacesTable.id, { onDelete: "cascade" })
        .notNull(),
    logoUrl: text("logo_url"),
    primaryColor: text("primary_color"),
    secondaryColor: text("secondary_color"),
    accentColor: text("accent_color"),
    fontHeading: text("font_heading"),
    fontBody: text("font_body"),
    toneOfVoice: text("tone_of_voice"),
    brandGuidelines: text("brand_guidelines"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date())
})

export type InsertBrandProfile = typeof brandProfilesTable.$inferInsert
export type SelectBrandProfile = typeof brandProfilesTable.$inferSelect 