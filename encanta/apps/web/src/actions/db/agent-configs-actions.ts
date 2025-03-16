"use server"

import { db } from "@/db/db"
import { agentConfigsTable, InsertAgentConfig, SelectAgentConfig, agentTypeEnum } from "@/db/schema"
import { ActionState } from "@/types"
import { eq, and } from "drizzle-orm"
import { auth } from "@clerk/nextjs/server"
import { checkWorkspaceAccess } from "@/lib/workspace-utils"

export async function createAgentConfigAction(
    config: InsertAgentConfig
): Promise<ActionState<SelectAgentConfig>> {
    try {
        const { userId } = await auth()

        if (!userId) {
            return { isSuccess: false, message: "Unauthorized" }
        }

        // Check if user has access to this workspace
        const hasAccess = await checkWorkspaceAccess(userId, config.workspaceId)
        if (!hasAccess) {
            return {
                isSuccess: false,
                message: "You don't have permission to create agent configurations in this workspace"
            }
        }

        // If this is set as default, unset any existing defaults for this agent type
        if (config.isDefault) {
            await db
                .update(agentConfigsTable)
                .set({ isDefault: false })
                .where(
                    and(
                        eq(agentConfigsTable.workspaceId, config.workspaceId),
                        eq(agentConfigsTable.agentType, config.agentType)
                    )
                )
        }

        // Create agent configuration
        const [newConfig] = await db.insert(agentConfigsTable).values(config).returning()

        return {
            isSuccess: true,
            message: "Agent configuration created successfully",
            data: newConfig
        }
    } catch (error) {
        console.error("Error creating agent configuration:", error)
        return { isSuccess: false, message: "Failed to create agent configuration" }
    }
}

export async function getWorkspaceAgentConfigsAction(
    workspaceId: string,
    agentType?: "ideation" | "research" | "content" | "editor"
): Promise<ActionState<SelectAgentConfig[]>> {
    try {
        const { userId } = await auth()

        if (!userId) {
            return { isSuccess: false, message: "Unauthorized" }
        }

        // Check if user has access to this workspace
        const hasAccess = await checkWorkspaceAccess(userId, workspaceId)
        if (!hasAccess) {
            return {
                isSuccess: false,
                message: "You don't have access to this workspace"
            }
        }

        // Build query to get agent configs
        let query = db.select().from(agentConfigsTable).where(eq(agentConfigsTable.workspaceId, workspaceId))

        // Filter by agent type if provided
        if (agentType) {
            const configs = await query.execute();
            return {
                isSuccess: true,
                message: "Agent configurations retrieved successfully",
                data: configs.filter(config => config.agentType === agentType)
            }
        }

        // Execute query
        const configs = await query.execute()

        return {
            isSuccess: true,
            message: "Agent configurations retrieved successfully",
            data: configs
        }
    } catch (error) {
        console.error("Error getting agent configurations:", error)
        return { isSuccess: false, message: "Failed to get agent configurations" }
    }
}

export async function getAgentConfigAction(
    configId: string
): Promise<ActionState<SelectAgentConfig>> {
    try {
        const { userId } = await auth()

        if (!userId) {
            return { isSuccess: false, message: "Unauthorized" }
        }

        // Get the agent configuration
        const config = await db
            .select()
            .from(agentConfigsTable)
            .where(eq(agentConfigsTable.id, configId))
            .limit(1)

        if (!config || config.length === 0) {
            return { isSuccess: false, message: "Agent configuration not found" }
        }

        // Check if user has access to this workspace
        const hasAccess = await checkWorkspaceAccess(userId, config[0].workspaceId)
        if (!hasAccess) {
            return {
                isSuccess: false,
                message: "You don't have access to this agent configuration"
            }
        }

        return {
            isSuccess: true,
            message: "Agent configuration retrieved successfully",
            data: config[0]
        }
    } catch (error) {
        console.error("Error getting agent configuration:", error)
        return { isSuccess: false, message: "Failed to get agent configuration" }
    }
}

export async function updateAgentConfigAction(
    configId: string,
    data: Partial<InsertAgentConfig>
): Promise<ActionState<SelectAgentConfig>> {
    try {
        const { userId } = await auth()

        if (!userId) {
            return { isSuccess: false, message: "Unauthorized" }
        }

        // Get the agent configuration to check workspace access
        const existingConfig = await db
            .select()
            .from(agentConfigsTable)
            .where(eq(agentConfigsTable.id, configId))
            .limit(1)

        if (!existingConfig || existingConfig.length === 0) {
            return { isSuccess: false, message: "Agent configuration not found" }
        }

        // Check if user has access to this workspace
        const hasAccess = await checkWorkspaceAccess(userId, existingConfig[0].workspaceId)
        if (!hasAccess) {
            return {
                isSuccess: false,
                message: "You don't have permission to update agent configurations in this workspace"
            }
        }

        // If setting as default, unset any existing defaults for this agent type
        if (data.isDefault) {
            await db
                .update(agentConfigsTable)
                .set({ isDefault: false })
                .where(
                    and(
                        eq(agentConfigsTable.workspaceId, existingConfig[0].workspaceId),
                        eq(agentConfigsTable.agentType, existingConfig[0].agentType)
                    )
                )
        }

        // Update agent configuration
        const [updatedConfig] = await db
            .update(agentConfigsTable)
            .set(data)
            .where(eq(agentConfigsTable.id, configId))
            .returning()

        return {
            isSuccess: true,
            message: "Agent configuration updated successfully",
            data: updatedConfig
        }
    } catch (error) {
        console.error("Error updating agent configuration:", error)
        return { isSuccess: false, message: "Failed to update agent configuration" }
    }
}

export async function deleteAgentConfigAction(
    configId: string
): Promise<ActionState<void>> {
    try {
        const { userId } = await auth()

        if (!userId) {
            return { isSuccess: false, message: "Unauthorized" }
        }

        // Get the agent configuration to check workspace access
        const existingConfig = await db
            .select()
            .from(agentConfigsTable)
            .where(eq(agentConfigsTable.id, configId))
            .limit(1)

        if (!existingConfig || existingConfig.length === 0) {
            return { isSuccess: false, message: "Agent configuration not found" }
        }

        // Check if user has access to this workspace
        const hasAccess = await checkWorkspaceAccess(userId, existingConfig[0].workspaceId)
        if (!hasAccess) {
            return {
                isSuccess: false,
                message: "You don't have permission to delete agent configurations in this workspace"
            }
        }

        // Delete agent configuration
        await db
            .delete(agentConfigsTable)
            .where(eq(agentConfigsTable.id, configId))

        return {
            isSuccess: true,
            message: "Agent configuration deleted successfully",
            data: undefined
        }
    } catch (error) {
        console.error("Error deleting agent configuration:", error)
        return { isSuccess: false, message: "Failed to delete agent configuration" }
    }
} 