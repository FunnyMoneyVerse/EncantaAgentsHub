"use server"

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import {
    createAgentConfigAction,
    getWorkspaceAgentConfigsAction,
    updateAgentConfigAction
} from "@/actions/db/agent-configs-actions"
import { z } from "zod"

// Schema for agent config creation
const agentConfigCreateSchema = z.object({
    workspaceId: z.string().uuid(),
    agentType: z.enum(["ideation", "research", "content", "editor"]),
    name: z.string().min(1),
    instructions: z.string().optional(),
    examples: z.array(z.object({
        input: z.string(),
        output: z.string()
    })).optional(),
    parameters: z.record(z.any()).optional(),
    isDefault: z.boolean().optional()
})

// Schema for agent config update
const agentConfigUpdateSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1).optional(),
    instructions: z.string().optional(),
    examples: z.array(z.object({
        input: z.string(),
        output: z.string()
    })).optional(),
    parameters: z.record(z.any()).optional(),
    isDefault: z.boolean().optional()
})

export async function GET(request: NextRequest) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        // Get workspace_id from query params
        const searchParams = request.nextUrl.searchParams
        const workspaceId = searchParams.get("workspace_id")
        const agentType = searchParams.get("agent_type") as "ideation" | "research" | "content" | "editor" | undefined

        if (!workspaceId) {
            return NextResponse.json({ error: "workspace_id is required" }, { status: 400 })
        }

        // Get agent configs for workspace
        const result = await getWorkspaceAgentConfigsAction(workspaceId, agentType)

        if (!result.isSuccess) {
            return NextResponse.json({ error: result.message }, { status: 400 })
        }

        return NextResponse.json(result.data)
    } catch (error) {
        console.error("Error in GET /api/agent-configs:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        // Parse request body
        const body = await request.json()

        // Validate request body
        const validationResult = agentConfigCreateSchema.safeParse(body)
        if (!validationResult.success) {
            return NextResponse.json(
                { error: "Invalid request body", details: validationResult.error.format() },
                { status: 400 }
            )
        }

        // Create agent config
        const result = await createAgentConfigAction(validationResult.data)

        if (!result.isSuccess) {
            return NextResponse.json({ error: result.message }, { status: 400 })
        }

        return NextResponse.json(result.data, { status: 201 })
    } catch (error) {
        console.error("Error in POST /api/agent-configs:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

export async function PUT(request: NextRequest) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        // Parse request body
        const body = await request.json()

        // Validate request body
        const validationResult = agentConfigUpdateSchema.safeParse(body)
        if (!validationResult.success) {
            return NextResponse.json(
                { error: "Invalid request body", details: validationResult.error.format() },
                { status: 400 }
            )
        }

        const { id, ...updateData } = validationResult.data

        // Update agent config
        const result = await updateAgentConfigAction(id, updateData)

        if (!result.isSuccess) {
            return NextResponse.json({ error: result.message }, { status: 400 })
        }

        return NextResponse.json(result.data)
    } catch (error) {
        console.error("Error in PUT /api/agent-configs:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
} 