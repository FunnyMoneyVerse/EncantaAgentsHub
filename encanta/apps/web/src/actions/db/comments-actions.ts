"use server"

import { db } from "@/db/db"
import { InsertComment, SelectComment, commentsTable } from "@/db/schema/comments-schema"
import { ActionState } from "@/types"
import { eq } from "drizzle-orm"

export async function createCommentAction(
    comment: InsertComment
): Promise<ActionState<SelectComment>> {
    try {
        const [newComment] = await db.insert(commentsTable).values(comment).returning()
        return {
            isSuccess: true,
            message: "Comment created successfully",
            data: newComment
        }
    } catch (error) {
        console.error("Error creating comment:", error)
        return { isSuccess: false, message: "Failed to create comment" }
    }
}

export async function getDocumentCommentsAction(
    documentId: string
): Promise<ActionState<SelectComment[]>> {
    try {
        const comments = await db.query.comments.findMany({
            where: eq(commentsTable.documentId, documentId)
        })
        return {
            isSuccess: true,
            message: "Comments retrieved successfully",
            data: comments
        }
    } catch (error) {
        console.error("Error getting comments:", error)
        return { isSuccess: false, message: "Failed to get comments" }
    }
}

export async function updateCommentAction(
    id: string,
    data: Partial<InsertComment>
): Promise<ActionState<SelectComment>> {
    try {
        const [updatedComment] = await db
            .update(commentsTable)
            .set(data)
            .where(eq(commentsTable.id, id))
            .returning()

        return {
            isSuccess: true,
            message: "Comment updated successfully",
            data: updatedComment
        }
    } catch (error) {
        console.error("Error updating comment:", error)
        return { isSuccess: false, message: "Failed to update comment" }
    }
}

export async function deleteCommentAction(id: string): Promise<ActionState<void>> {
    try {
        await db.delete(commentsTable).where(eq(commentsTable.id, id))
        return {
            isSuccess: true,
            message: "Comment deleted successfully",
            data: undefined
        }
    } catch (error) {
        console.error("Error deleting comment:", error)
        return { isSuccess: false, message: "Failed to delete comment" }
    }
} 