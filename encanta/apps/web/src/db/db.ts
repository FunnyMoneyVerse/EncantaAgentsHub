import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import {
    workspacesTable,
    brandProfilesTable,
    documentsTable,
    commentsTable,
    teamMembersTable,
    contentProjectsTable,
    knowledgeFilesTable,
    subscriptionsTable,
    profilesTable,
    todosTable
} from "@/db/schema"

// Database connection string
const connectionString = process.env.DATABASE_URL || ""

// Create postgres connection
const client = postgres(connectionString, { max: 1 })

// Schema object for drizzle
const schema = {
    workspaces: workspacesTable,
    brandProfiles: brandProfilesTable,
    documents: documentsTable,
    comments: commentsTable,
    teamMembers: teamMembersTable,
    contentProjects: contentProjectsTable,
    knowledgeFiles: knowledgeFilesTable,
    subscriptions: subscriptionsTable,
    profiles: profilesTable,
    todos: todosTable
}

// Create drizzle instance
export const db = drizzle(client, { schema })

// Export for use in server actions
export { schema } 