import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { stripe } from "@/lib/stripe"

export async function GET() {
    try {
        const session = await auth()
        const userId = session.userId

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        // In a real app, get the customer ID and subscription ID from your database
        // For now, we'll use placeholders
        const customerId = "cus_placeholder"
        const subscriptionId = "sub_placeholder"

        // Get the subscription
        const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
            expand: ["items.data.price.product"],
        })

        // Get the product details
        const product = subscription.items.data[0].price.product as any

        // Format the subscription data
        const formattedSubscription = {
            id: subscription.id,
            status: subscription.status,
            plan: {
                id: product.id,
                name: product.name,
            },
            currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
        }

        return NextResponse.json(formattedSubscription)
    } catch (error) {
        console.error("Error fetching current subscription:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
} 