"use server"

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import {
    getAgentConfigAction,
    deleteAgentConfigAction
} from "@/actions/db/agent-configs-actions"

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const configId = params.id

        // Get agent config
        const result = await getAgentConfigAction(configId)

        if (!result.isSuccess) {
            return NextResponse.json({ error: result.message }, { status: 400 })
        }

        return NextResponse.json(result.data)
    } catch (error) {
        console.error(`Error in GET /api/agent-configs/${params.id}:`, error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const configId = params.id

        // Delete agent config
        const result = await deleteAgentConfigAction(configId)

        if (!result.isSuccess) {
            return NextResponse.json({ error: result.message }, { status: 400 })
        }

        return NextResponse.json({ success: true, message: "Agent configuration deleted successfully" })
    } catch (error) {
        console.error(`Error in DELETE /api/agent-configs/${params.id}:`, error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
} 