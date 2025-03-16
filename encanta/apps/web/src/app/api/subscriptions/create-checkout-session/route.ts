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
        const { priceId, returnUrl } = body

        if (!priceId) {
            return new NextResponse("Price ID is required", { status: 400 })
        }

        // Create a checkout session
        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: "subscription",
            success_url: returnUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/subscription?success=true`,
            cancel_url: returnUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/subscription?canceled=true`,
            customer_email: userId, // In a real app, get the user's email from Clerk
            metadata: {
                userId,
            },
        })

        return NextResponse.json({ url: checkoutSession.url })
    } catch (error) {
        console.error("Error creating checkout session:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
} 