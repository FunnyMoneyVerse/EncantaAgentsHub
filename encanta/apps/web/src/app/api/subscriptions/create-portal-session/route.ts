import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { stripe } from "@/lib/stripe"

export async function POST(req: Request) {
    try {
        const session = await auth()
        const userId = session.userId

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const body = await req.json()
        const { returnUrl } = body

        // In a real app, get the customer ID from your database
        // For now, we'll use a placeholder
        const customerId = "cus_placeholder"

        // Create a portal session
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: returnUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/subscription`,
        })

        return NextResponse.json({ url: portalSession.url })
    } catch (error) {
        console.error("Error creating portal session:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
} 