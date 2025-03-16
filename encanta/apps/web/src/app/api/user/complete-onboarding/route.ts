import { NextRequest, NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
    try {
        // Get the authenticated user
        const authObject = auth();
        const { userId } = authObject;

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Parse the request body
        const body = await request.json();

        // Validate the request
        if (!body.userId || body.userId !== userId) {
            return NextResponse.json(
                { error: 'Invalid request' },
                { status: 400 }
            );
        }

        // Update the user's metadata
        const client = await clerkClient();
        await client.users.updateUser(userId, {
            privateMetadata: {
                onboardingCompleted: true,
                defaultWorkspaceId: body.workspaceId || null,
            },
            publicMetadata: {
                isOnboardingComplete: true,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error completing onboarding:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 