"use server"

import { db } from "@/db/db"
import { InsertKnowledgeFile, SelectKnowledgeFile, knowledgeFilesTable } from "@/db/schema/knowledge-files-schema"
import { ActionState } from "@/types"
import { eq } from "drizzle-orm"

export async function createKnowledgeFileAction(
    knowledgeFile: InsertKnowledgeFile
): Promise<ActionState<SelectKnowledgeFile>> {
    try {
        const [newKnowledgeFile] = await db.insert(knowledgeFilesTable).values(knowledgeFile).returning()
        return {
            isSuccess: true,
            message: "Knowledge file created successfully",
            data: newKnowledgeFile
        }
    } catch (error) {
        console.error("Error creating knowledge file:", error)
        return { isSuccess: false, message: "Failed to create knowledge file" }
    }
}

export async function getWorkspaceKnowledgeFilesAction(
    workspaceId: string
): Promise<ActionState<SelectKnowledgeFile[]>> {
    try {
        const knowledgeFiles = await db.query.knowledgeFiles.findMany({
            where: eq(knowledgeFilesTable.workspaceId, workspaceId)
        })
        return {
            isSuccess: true,
            message: "Knowledge files retrieved successfully",
            data: knowledgeFiles
        }
    } catch (error) {
        console.error("Error getting knowledge files:", error)
        return { isSuccess: false, message: "Failed to get knowledge files" }
    }
}

export async function getKnowledgeFileAction(
    id: string
): Promise<ActionState<SelectKnowledgeFile>> {
    try {
        const knowledgeFile = await db.query.knowledgeFiles.findFirst({
            where: eq(knowledgeFilesTable.id, id)
        })

        if (!knowledgeFile) {
            return { isSuccess: false, message: "Knowledge file not found" }
        }

        return {
            isSuccess: true,
            message: "Knowledge file retrieved successfully",
            data: knowledgeFile
        }
    } catch (error) {
        console.error("Error getting knowledge file:", error)
        return { isSuccess: false, message: "Failed to get knowledge file" }
    }
}

export async function updateKnowledgeFileAction(
    id: string,
    data: Partial<InsertKnowledgeFile>
): Promise<ActionState<SelectKnowledgeFile>> {
    try {
        const [updatedKnowledgeFile] = await db
            .update(knowledgeFilesTable)
            .set(data)
            .where(eq(knowledgeFilesTable.id, id))
            .returning()

        return {
            isSuccess: true,
            message: "Knowledge file updated successfully",
            data: updatedKnowledgeFile
        }
    } catch (error) {
        console.error("Error updating knowledge file:", error)
        return { isSuccess: false, message: "Failed to update knowledge file" }
    }
}

export async function deleteKnowledgeFileAction(id: string): Promise<ActionState<void>> {
    try {
        await db.delete(knowledgeFilesTable).where(eq(knowledgeFilesTable.id, id))
        return {
            isSuccess: true,
            message: "Knowledge file deleted successfully",
            data: undefined
        }
    } catch (error) {
        console.error("Error deleting knowledge file:", error)
        return { isSuccess: false, message: "Failed to delete knowledge file" }
    }
} 