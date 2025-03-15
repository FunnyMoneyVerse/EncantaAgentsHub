/*
<ai_context>
Initializes the database connection and schema for the app.
</ai_context>
*/

import {
  brandProfilesTable,
  commentsTable,
  contentProjectsTable,
  documentsTable,
  knowledgeFilesTable,
  profilesTable,
  subscriptionsTable,
  teamMembersTable,
  todosTable,
  workspacesTable
} from "@/db/schema"
import { config } from "dotenv"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

config({ path: ".env.local" })

const schema = {
  profiles: profilesTable,
  todos: todosTable,
  workspaces: workspacesTable,
  brandProfiles: brandProfilesTable,
  documents: documentsTable,
  comments: commentsTable,
  teamMembers: teamMembersTable,
  contentProjects: contentProjectsTable,
  knowledgeFiles: knowledgeFilesTable,
  subscriptions: subscriptionsTable
}

const client = postgres(process.env.DATABASE_URL!)

export const db = drizzle(client, { schema })
