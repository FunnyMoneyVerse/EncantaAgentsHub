"use server"

import { db } from "@/db/db"
import { InsertBrandProfile, SelectBrandProfile, brandProfilesTable } from "@/db/schema/brand-profiles-schema"
import { ActionState } from "@/types"
import { eq } from "drizzle-orm"

export async function createBrandProfileAction(
    brandProfile: InsertBrandProfile
): Promise<ActionState<SelectBrandProfile>> {
    try {
        const [newBrandProfile] = await db.insert(brandProfilesTable).values(brandProfile).returning()
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

export async function getBrandProfilesAction(
    workspaceId: string
): Promise<ActionState<SelectBrandProfile[]>> {
    try {
        const brandProfiles = await db.query.brandProfiles.findMany({
            where: eq(brandProfilesTable.workspaceId, workspaceId)
        })
        return {
            isSuccess: true,
            message: "Brand profiles retrieved successfully",
            data: brandProfiles
        }
    } catch (error) {
        console.error("Error getting brand profiles:", error)
        return { isSuccess: false, message: "Failed to get brand profiles" }
    }
}

export async function updateBrandProfileAction(
    id: string,
    data: Partial<InsertBrandProfile>
): Promise<ActionState<SelectBrandProfile>> {
    try {
        const [updatedBrandProfile] = await db
            .update(brandProfilesTable)
            .set(data)
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

export async function deleteBrandProfileAction(id: string): Promise<ActionState<void>> {
    try {
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