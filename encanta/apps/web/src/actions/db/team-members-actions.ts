"use server"

import { db } from "@/db/db"
import { InsertTeamMember, SelectTeamMember, teamMembersTable } from "@/db/schema/team-members-schema"
import { ActionState } from "@/types"
import { eq } from "drizzle-orm"

export async function createTeamMemberAction(
    teamMember: InsertTeamMember
): Promise<ActionState<SelectTeamMember>> {
    try {
        const [newTeamMember] = await db.insert(teamMembersTable).values(teamMember).returning()
        return {
            isSuccess: true,
            message: "Team member created successfully",
            data: newTeamMember
        }
    } catch (error) {
        console.error("Error creating team member:", error)
        return { isSuccess: false, message: "Failed to create team member" }
    }
}

export async function getWorkspaceTeamMembersAction(
    workspaceId: string
): Promise<ActionState<SelectTeamMember[]>> {
    try {
        const teamMembers = await db.query.teamMembers.findMany({
            where: eq(teamMembersTable.workspaceId, workspaceId)
        })
        return {
            isSuccess: true,
            message: "Team members retrieved successfully",
            data: teamMembers
        }
    } catch (error) {
        console.error("Error getting team members:", error)
        return { isSuccess: false, message: "Failed to get team members" }
    }
}

export async function updateTeamMemberAction(
    id: string,
    data: Partial<InsertTeamMember>
): Promise<ActionState<SelectTeamMember>> {
    try {
        const [updatedTeamMember] = await db
            .update(teamMembersTable)
            .set(data)
            .where(eq(teamMembersTable.id, id))
            .returning()

        return {
            isSuccess: true,
            message: "Team member updated successfully",
            data: updatedTeamMember
        }
    } catch (error) {
        console.error("Error updating team member:", error)
        return { isSuccess: false, message: "Failed to update team member" }
    }
}

export async function deleteTeamMemberAction(id: string): Promise<ActionState<void>> {
    try {
        await db.delete(teamMembersTable).where(eq(teamMembersTable.id, id))
        return {
            isSuccess: true,
            message: "Team member deleted successfully",
            data: undefined
        }
    } catch (error) {
        console.error("Error deleting team member:", error)
        return { isSuccess: false, message: "Failed to delete team member" }
    }
} 