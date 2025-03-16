"use server"

import { db } from "@/db/db"
import { teamMembersTable } from "@/db/schema"
import { eq, and } from "drizzle-orm"

/**
 * Check if a user has access to a workspace
 * @param userId The user ID to check
 * @param workspaceId The workspace ID to check access for
 * @param requiredRoles Optional array of roles that the user must have
 * @returns Boolean indicating if the user has access
 */
export async function checkWorkspaceAccess(
    userId: string,
    workspaceId: string,
    requiredRoles?: string[]
): Promise<boolean> {
    try {
        // Query to check if user is a member of the workspace
        const query = db
            .select()
            .from(teamMembersTable)
            .where(
                and(
                    eq(teamMembersTable.userId, userId),
                    eq(teamMembersTable.workspaceId, workspaceId)
                )
            )
            .limit(1)

        const membership = await query

        // If no membership found, user doesn't have access
        if (!membership || membership.length === 0) {
            return false
        }

        // If specific roles are required, check if user has one of them
        if (requiredRoles && requiredRoles.length > 0) {
            const userRole = membership[0].role
            return requiredRoles.includes(userRole)
        }

        // User is a member and no specific roles required
        return true
    } catch (error) {
        console.error("Error checking workspace access:", error)
        return false
    }
} 