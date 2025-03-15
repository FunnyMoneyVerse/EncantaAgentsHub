"use server"

import { db } from "@/db/db"
import {
    InsertBrandProfile,
    SelectBrandProfile,
    brandProfilesTable,
    workspacesTable
} from "@/db/schema"
import { ActionState } from "@/types"
import { eq } from "drizzle-orm"
import { auth } from "@clerk/nextjs/server"

export async function createBrandProfileAction(
    brandProfile: Omit<InsertBrandProfile, "id">
): Promise<ActionState<SelectBrandProfile>> {
    try {
        const { userId } = await auth()

        if (!userId) {
            return { isSuccess: false, message: "Unauthorized" }
        }

        // Check if workspace exists and belongs to user
        const workspace = await db.query.workspaces.findFirst({
            where: eq(workspacesTable.id, brandProfile.workspaceId)
        })

        if (!workspace) {
            return { isSuccess: false, message: "Workspace not found" }
        }

        if (workspace.userId !== userId) {
            return { isSuccess: false, message: "Unauthorized" }
        }

        // Check if brand profile already exists for this workspace
        const existingBrandProfile = await db.query.brandProfiles.findFirst({
            where: eq(brandProfilesTable.workspaceId, brandProfile.workspaceId)
        })

        if (existingBrandProfile) {
            return {
                isSuccess: false,
                message: "Brand profile already exists for this workspace"
            }
        }

        const [newBrandProfile] = await db
            .insert(brandProfilesTable)
            .values(brandProfile)
            .returning()

        return {
            isSuccess: true,
            message: "Brand profile created successfully",
            data: newBrandProfile
        }
    } catch (error) {
        console.error("Error creating brand profile:", error)
        return { isSuccess: false, message: "Failed to create brand profile" }
    }
}

export async function getBrandProfileAction(
    workspaceId: string
): Promise<ActionState<SelectBrandProfile>> {
    try {
        const { userId } = await auth()

        if (!userId) {
            return { isSuccess: false, message: "Unauthorized" }
        }

        // Check if workspace exists and belongs to user
        const workspace = await db.query.workspaces.findFirst({
            where: eq(workspacesTable.id, workspaceId)
        })

        if (!workspace) {
            return { isSuccess: false, message: "Workspace not found" }
        }

        if (workspace.userId !== userId) {
            return { isSuccess: false, message: "Unauthorized" }
        }

        const brandProfile = await db.query.brandProfiles.findFirst({
            where: eq(brandProfilesTable.workspaceId, workspaceId)
        })

        if (!brandProfile) {
            return { isSuccess: false, message: "Brand profile not found" }
        }

        return {
            isSuccess: true,
            message: "Brand profile retrieved successfully",
            data: brandProfile
        }
    } catch (error) {
        console.error("Error getting brand profile:", error)
        return { isSuccess: false, message: "Failed to get brand profile" }
    }
}

export async function updateBrandProfileAction(
    id: string,
    data: Partial<InsertBrandProfile>
): Promise<ActionState<SelectBrandProfile>> {
    try {
        const { userId } = await auth()

        if (!userId) {
            return { isSuccess: false, message: "Unauthorized" }
        }

        // Get the brand profile
        const brandProfile = await db.query.brandProfiles.findFirst({
            where: eq(brandProfilesTable.id, id)
        })

        if (!brandProfile) {
            return { isSuccess: false, message: "Brand profile not found" }
        }

        // Check if workspace exists and belongs to user
        const workspace = await db.query.workspaces.findFirst({
            where: eq(workspacesTable.id, brandProfile.workspaceId)
        })

        if (!workspace) {
            return { isSuccess: false, message: "Workspace not found" }
        }

        if (workspace.userId !== userId) {
            return { isSuccess: false, message: "Unauthorized" }
        }

        // Remove workspaceId from data if it exists to prevent changing workspace
        const { workspaceId, ...updateData } = data

        const [updatedBrandProfile] = await db
            .update(brandProfilesTable)
            .set(updateData)
            .where(eq(brandProfilesTable.id, id))
            .returning()

        return {
            isSuccess: true,
            message: "Brand profile updated successfully",
            data: updatedBrandProfile
        }
    } catch (error) {
        console.error("Error updating brand profile:", error)
        return { isSuccess: false, message: "Failed to update brand profile" }
    }
}

export async function deleteBrandProfileAction(
    id: string
): Promise<ActionState<void>> {
    try {
        const { userId } = await auth()

        if (!userId) {
            return { isSuccess: false, message: "Unauthorized" }
        }

        // Get the brand profile
        const brandProfile = await db.query.brandProfiles.findFirst({
            where: eq(brandProfilesTable.id, id)
        })

        if (!brandProfile) {
            return { isSuccess: false, message: "Brand profile not found" }
        }

        // Check if workspace exists and belongs to user
        const workspace = await db.query.workspaces.findFirst({
            where: eq(workspacesTable.id, brandProfile.workspaceId)
        })

        if (!workspace) {
            return { isSuccess: false, message: "Workspace not found" }
        }

        if (workspace.userId !== userId) {
            return { isSuccess: false, message: "Unauthorized" }
        }

        await db.delete(brandProfilesTable).where(eq(brandProfilesTable.id, id))

        return {
            isSuccess: true,
            message: "Brand profile deleted successfully",
            data: undefined
        }
    } catch (error) {
        console.error("Error deleting brand profile:", error)
        return { isSuccess: false, message: "Failed to delete brand profile" }
    }
} 