"use server"

import { db } from "@/db/db"
import { InsertWorkspace, SelectWorkspace, workspacesTable } from "@/db/schema"
import { ActionState } from "@/types"
import { eq } from "drizzle-orm"
import { auth } from "@clerk/nextjs/server"

export async function createWorkspaceAction(
    workspace: Omit<InsertWorkspace, "userId">
): Promise<ActionState<SelectWorkspace>> {
    try {
        const { userId } = await auth()

        if (!userId) {
            return { isSuccess: false, message: "Unauthorized" }
        }

        const [newWorkspace] = await db
            .insert(workspacesTable)
            .values({ ...workspace, userId })
            .returning()

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

export async function getWorkspacesAction(): Promise<
    ActionState<SelectWorkspace[]>
> {
    try {
        const { userId } = await auth()

        if (!userId) {
            return { isSuccess: false, message: "Unauthorized" }
        }

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

export async function getWorkspaceAction(
    id: string
): Promise<ActionState<SelectWorkspace>> {
    try {
        const { userId } = await auth()

        if (!userId) {
            return { isSuccess: false, message: "Unauthorized" }
        }

        const workspace = await db.query.workspaces.findFirst({
            where: eq(workspacesTable.id, id)
        })

        if (!workspace) {
            return { isSuccess: false, message: "Workspace not found" }
        }

        if (workspace.userId !== userId) {
            return { isSuccess: false, message: "Unauthorized" }
        }

        return {
            isSuccess: true,
            message: "Workspace retrieved successfully",
            data: workspace
        }
    } catch (error) {
        console.error("Error getting workspace:", error)
        return { isSuccess: false, message: "Failed to get workspace" }
    }
}

export async function updateWorkspaceAction(
    id: string,
    data: Partial<InsertWorkspace>
): Promise<ActionState<SelectWorkspace>> {
    try {
        const { userId } = await auth()

        if (!userId) {
            return { isSuccess: false, message: "Unauthorized" }
        }

        // Check if workspace exists and belongs to user
        const existingWorkspace = await db.query.workspaces.findFirst({
            where: eq(workspacesTable.id, id)
        })

        if (!existingWorkspace) {
            return { isSuccess: false, message: "Workspace not found" }
        }

        if (existingWorkspace.userId !== userId) {
            return { isSuccess: false, message: "Unauthorized" }
        }

        // Remove userId from data if it exists to prevent changing ownership
        const { userId: _, ...updateData } = data

        const [updatedWorkspace] = await db
            .update(workspacesTable)
            .set(updateData)
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

export async function deleteWorkspaceAction(
    id: string
): Promise<ActionState<void>> {
    try {
        const { userId } = await auth()

        if (!userId) {
            return { isSuccess: false, message: "Unauthorized" }
        }

        // Check if workspace exists and belongs to user
        const existingWorkspace = await db.query.workspaces.findFirst({
            where: eq(workspacesTable.id, id)
        })

        if (!existingWorkspace) {
            return { isSuccess: false, message: "Workspace not found" }
        }

        if (existingWorkspace.userId !== userId) {
            return { isSuccess: false, message: "Unauthorized" }
        }

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