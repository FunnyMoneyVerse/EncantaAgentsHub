"use server"

import { db } from "@/db/db"
import { InsertContentProject, SelectContentProject, contentProjectsTable } from "@/db/schema/content-projects-schema"
import { ActionState } from "@/types"
import { eq } from "drizzle-orm"

export async function createContentProjectAction(
    contentProject: InsertContentProject
): Promise<ActionState<SelectContentProject>> {
    try {
        const [newContentProject] = await db.insert(contentProjectsTable).values(contentProject).returning()
        return {
            isSuccess: true,
            message: "Content project created successfully",
            data: newContentProject
        }
    } catch (error) {
        console.error("Error creating content project:", error)
        return { isSuccess: false, message: "Failed to create content project" }
    }
}

export async function getWorkspaceContentProjectsAction(
    workspaceId: string
): Promise<ActionState<SelectContentProject[]>> {
    try {
        const contentProjects = await db.query.contentProjects.findMany({
            where: eq(contentProjectsTable.workspaceId, workspaceId)
        })
        return {
            isSuccess: true,
            message: "Content projects retrieved successfully",
            data: contentProjects
        }
    } catch (error) {
        console.error("Error getting content projects:", error)
        return { isSuccess: false, message: "Failed to get content projects" }
    }
}

export async function getContentProjectAction(
    id: string
): Promise<ActionState<SelectContentProject>> {
    try {
        const contentProject = await db.query.contentProjects.findFirst({
            where: eq(contentProjectsTable.id, id)
        })

        if (!contentProject) {
            return { isSuccess: false, message: "Content project not found" }
        }

        return {
            isSuccess: true,
            message: "Content project retrieved successfully",
            data: contentProject
        }
    } catch (error) {
        console.error("Error getting content project:", error)
        return { isSuccess: false, message: "Failed to get content project" }
    }
}

export async function updateContentProjectAction(
    id: string,
    data: Partial<InsertContentProject>
): Promise<ActionState<SelectContentProject>> {
    try {
        const [updatedContentProject] = await db
            .update(contentProjectsTable)
            .set(data)
            .where(eq(contentProjectsTable.id, id))
            .returning()

        return {
            isSuccess: true,
            message: "Content project updated successfully",
            data: updatedContentProject
        }
    } catch (error) {
        console.error("Error updating content project:", error)
        return { isSuccess: false, message: "Failed to update content project" }
    }
}

export async function deleteContentProjectAction(id: string): Promise<ActionState<void>> {
    try {
        await db.delete(contentProjectsTable).where(eq(contentProjectsTable.id, id))
        return {
            isSuccess: true,
            message: "Content project deleted successfully",
            data: undefined
        }
    } catch (error) {
        console.error("Error deleting content project:", error)
        return { isSuccess: false, message: "Failed to delete content project" }
    }
} 