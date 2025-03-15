"use server"

import { db } from "@/db/db"
import { InsertDocument, SelectDocument, documentsTable } from "@/db/schema/documents-schema"
import { ActionState } from "@/types"
import { eq } from "drizzle-orm"

export async function createDocumentAction(
    document: InsertDocument
): Promise<ActionState<SelectDocument>> {
    try {
        const [newDocument] = await db.insert(documentsTable).values(document).returning()
        return {
            isSuccess: true,
            message: "Document created successfully",
            data: newDocument
        }
    } catch (error) {
        console.error("Error creating document:", error)
        return { isSuccess: false, message: "Failed to create document" }
    }
}

export async function getDocumentsAction(
    workspaceId: string
): Promise<ActionState<SelectDocument[]>> {
    try {
        const documents = await db.query.documents.findMany({
            where: eq(documentsTable.workspaceId, workspaceId)
        })
        return {
            isSuccess: true,
            message: "Documents retrieved successfully",
            data: documents
        }
    } catch (error) {
        console.error("Error getting documents:", error)
        return { isSuccess: false, message: "Failed to get documents" }
    }
}

export async function getDocumentAction(
    id: string
): Promise<ActionState<SelectDocument>> {
    try {
        const document = await db.query.documents.findFirst({
            where: eq(documentsTable.id, id)
        })

        if (!document) {
            return { isSuccess: false, message: "Document not found" }
        }

        return {
            isSuccess: true,
            message: "Document retrieved successfully",
            data: document
        }
    } catch (error) {
        console.error("Error getting document:", error)
        return { isSuccess: false, message: "Failed to get document" }
    }
}

export async function updateDocumentAction(
    id: string,
    data: Partial<InsertDocument>
): Promise<ActionState<SelectDocument>> {
    try {
        const [updatedDocument] = await db
            .update(documentsTable)
            .set(data)
            .where(eq(documentsTable.id, id))
            .returning()

        return {
            isSuccess: true,
            message: "Document updated successfully",
            data: updatedDocument
        }
    } catch (error) {
        console.error("Error updating document:", error)
        return { isSuccess: false, message: "Failed to update document" }
    }
}

export async function deleteDocumentAction(id: string): Promise<ActionState<void>> {
    try {
        await db.delete(documentsTable).where(eq(documentsTable.id, id))
        return {
            isSuccess: true,
            message: "Document deleted successfully",
            data: undefined
        }
    } catch (error) {
        console.error("Error deleting document:", error)
        return { isSuccess: false, message: "Failed to delete document" }
    }
} 