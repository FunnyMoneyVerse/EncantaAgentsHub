import { NextResponse } from "next/server"
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import type { NextRequest } from "next/server"

// List of public routes that don't require authentication
const publicRoutes = [
    "/",
    "/login(.*)",
    "/signup(.*)",
    "/signup/sso-callback(.*)",
    "/api/auth/callback/google(.*)",
    "/sso-callback(.*)",
    "/api/auth/callback(.*)",
    "/onboarding",
    "/api/webhook",
    "/pricing",
    "/features",
    "/about",
    "/contact",
    "/blog",
    "/legal",
    "/cookies",
    "/privacy",
    "/terms"
]

// Create a route matcher for public routes
const isPublicRoute = createRouteMatcher([
    ...publicRoutes
])

// Create a route matcher for auth routes (login/signup)
const isAuthRoute = createRouteMatcher(["/login(.*)", "/signup(.*)"])

export default clerkMiddleware(async (auth, req) => {
    const { userId } = await auth()

    // If the user is authenticated and trying to access login/signup or root
    if (userId && (isAuthRoute(req) || req.nextUrl.pathname === "/")) {
        try {
            // Check if user has completed onboarding
            const authObject = await auth()
            const isOnboardingComplete = authObject.sessionClaims?.isOnboardingComplete

            // If onboarding is not completed yet
            if (!isOnboardingComplete) {
                return NextResponse.redirect(new URL("/onboarding", req.url))
            }

            // Otherwise redirect to dashboard
            return NextResponse.redirect(new URL("/dashboard", req.url))
        } catch (error) {
            // If there's an error, redirect to onboarding as default
            return NextResponse.redirect(new URL("/onboarding", req.url))
        }
    }

    // For protected routes, use auth.protect()
    if (!isPublicRoute(req)) {
        await auth.protect()
    }

    return NextResponse.next()
})

export const config = {
    matcher: [
        "/((?!.*\\..*|_next).*)",
        "/",
        "/(api|trpc)(.*)"
    ],
} 