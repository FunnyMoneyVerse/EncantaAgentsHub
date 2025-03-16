"use server";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        // Extract the OAuth code and state from the URL
        const searchParams = request.nextUrl.searchParams;
        const code = searchParams.get("code");
        const state = searchParams.get("state");

        if (!code || !state) {
            return NextResponse.redirect(new URL("/login?error=missing_params", request.url));
        }

        // Redirect to the sso-callback page which will handle the rest of the flow
        return NextResponse.redirect(
            new URL(`/sso-callback?redirect_url=/dashboard`, request.url)
        );
    } catch (error) {
        console.error("Google OAuth callback error:", error);
        return NextResponse.redirect(new URL("/login?error=oauth_error", request.url));
    }
} 