"use server"

import { db } from "@/db/db"
import { InsertWorkspace, SelectWorkspace, workspacesTable } from "@/db/schema/workspaces-schema"
import { ActionState } from "@/types"
import { eq } from "drizzle-orm"

export async function createWorkspaceAction(
    workspace: InsertWorkspace
): Promise<ActionState<SelectWorkspace>> {
    try {
        const [newWorkspace] = await db.insert(workspacesTable).values(workspace).returning()
        return {
            isSuccess: true,
            message: "Workspace created successfully",
            data: newWorkspace
        }
    } catch (error) {
        console.error("Error creating workspace:", error)
        return { isSuccess: false, message: "Failed to create workspace" }
    }
}

export async function getWorkspacesAction(
    userId: string
): Promise<ActionState<SelectWorkspace[]>> {
    try {
        const workspaces = await db.query.workspaces.findMany({
            where: eq(workspacesTable.userId, userId)
        })
        return {
            isSuccess: true,
            message: "Workspaces retrieved successfully",
            data: workspaces
        }
    } catch (error) {
        console.error("Error getting workspaces:", error)
        return { isSuccess: false, message: "Failed to get workspaces" }
    }
}

export async function updateWorkspaceAction(
    id: string,
    data: Partial<InsertWorkspace>
): Promise<ActionState<SelectWorkspace>> {
    try {
        const [updatedWorkspace] = await db
            .update(workspacesTable)
            .set(data)
            .where(eq(workspacesTable.id, id))
            .returning()

        return {
            isSuccess: true,
            message: "Workspace updated successfully",
            data: updatedWorkspace
        }
    } catch (error) {
        console.error("Error updating workspace:", error)
        return { isSuccess: false, message: "Failed to update workspace" }
    }
}

export async function deleteWorkspaceAction(id: string): Promise<ActionState<void>> {
    try {
        await db.delete(workspacesTable).where(eq(workspacesTable.id, id))
        return {
            isSuccess: true,
            message: "Workspace deleted successfully",
            data: undefined
        }
    } catch (error) {
        console.error("Error deleting workspace:", error)
        return { isSuccess: false, message: "Failed to delete workspace" }
    }
} 