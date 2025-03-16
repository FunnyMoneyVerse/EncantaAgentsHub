import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
    try {
        // Get the authenticated user
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Parse the request body
        const body = await request.json();

        // Validate required fields
        if (!body.workspace_id || !body.name) {
            return NextResponse.json(
                { error: 'Missing required fields: workspace_id, name' },
                { status: 400 }
            );
        }

        // In a real implementation, you would create the brand in the database
        // For now, we'll just return a mock response

        // Mock response
        const brand = {
            id: `brand-${Date.now()}`,
            workspace_id: body.workspace_id,
            name: body.name,
            voice: body.voice || null,
            guidelines: body.guidelines || null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        return NextResponse.json(brand, { status: 201 });
    } catch (error) {
        console.error('Error creating brand:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        // Get the authenticated user
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Get the workspace_id from the query params
        const { searchParams } = new URL(request.url);
        const workspaceId = searchParams.get('workspace_id');

        if (!workspaceId) {
            return NextResponse.json(
                { error: 'Missing required query parameter: workspace_id' },
                { status: 400 }
            );
        }

        // In a real implementation, you would fetch the brand from the database
        // For now, we'll just return a mock response

        // Mock response
        const brand = {
            id: `brand-123`,
            workspace_id: workspaceId,
            name: 'Mock Brand',
            voice: 'professional',
            guidelines: {
                description: 'This is a mock brand for testing purposes.',
            },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        return NextResponse.json(brand);
    } catch (error) {
        console.error('Error fetching brand:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 