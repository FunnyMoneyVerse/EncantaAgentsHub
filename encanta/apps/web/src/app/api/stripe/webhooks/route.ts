import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"

import { stripe } from "@/lib/stripe"
import { manageSubscriptionStatusChange } from "@/actions/stripe-actions"

export async function POST(req: Request) {
    console.log("🔔 Webhook received!")
    const body = await req.text()
    const headersList = headers()
    const signature = headersList.get("Stripe-Signature") as string

    console.log("🔐 Verifying Stripe signature...")
    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
        console.log("✅ Signature verification successful")
        console.log(`📦 Event received: ${event.type}`)
        console.log(`🆔 Event ID: ${event.id}`)
        console.log(`⏰ Event created at: ${new Date(event.created * 1000).toISOString()}`)
        console.log(`📄 Event data: ${JSON.stringify(event.data.object, null, 2)}`)
    } catch (error: any) {
        console.error(`❌ Webhook Error: ${error.message}`)
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
    }

    const session = event.data.object as Stripe.Checkout.Session | Stripe.Subscription

    // Handle the event
    switch (event.type) {
        // Checkout session completed
        case "checkout.session.completed":
            console.log("🛒 Processing checkout.session.completed event")
            if ("customer" in session && "subscription" in session) {
                const customerId = session.customer as string
                const subscriptionId = session.subscription as string

                console.log(`👤 Customer ID: ${customerId}`)
                console.log(`🔄 Subscription ID: ${subscriptionId}`)

                // Get the subscription details
                console.log("📥 Retrieving subscription details...")
                const subscription = await stripe.subscriptions.retrieve(subscriptionId)
                const productId = subscription.items.data[0].price.product as string
                console.log(`🏷️ Product ID: ${productId}`)

                // Update the user's subscription status
                console.log("📝 Updating user subscription status...")
                try {
                    const membershipStatus = await manageSubscriptionStatusChange(
                        subscriptionId,
                        customerId,
                        productId
                    )
                    console.log(`✅ Subscription status updated to: ${membershipStatus}`)
                } catch (error) {
                    console.error(`❌ Error updating subscription: ${error instanceof Error ? error.message : 'Unknown error'}`)
                }
            } else {
                console.log("⚠️ Missing customer or subscription in session data")
            }
            break

        // Subscription updated
        case "customer.subscription.updated":
            console.log("🔄 Processing customer.subscription.updated event")
            if ("customer" in session && "id" in session) {
                const customerId = session.customer as string
                const subscriptionId = session.id as string

                console.log(`👤 Customer ID: ${customerId}`)
                console.log(`🔄 Subscription ID: ${subscriptionId}`)

                // Get the product ID
                const productId = (session as Stripe.Subscription).items.data[0].price.product as string
                console.log(`🏷️ Product ID: ${productId}`)

                // Update the user's subscription status
                console.log("📝 Updating user subscription status...")
                try {
                    const membershipStatus = await manageSubscriptionStatusChange(
                        subscriptionId,
                        customerId,
                        productId
                    )
                    console.log(`✅ Subscription status updated to: ${membershipStatus}`)
                } catch (error) {
                    console.error(`❌ Error updating subscription: ${error instanceof Error ? error.message : 'Unknown error'}`)
                }
            } else {
                console.log("⚠️ Missing customer or id in session data")
            }
            break

        // Subscription deleted
        case "customer.subscription.deleted":
            console.log("🗑️ Processing customer.subscription.deleted event")
            if ("customer" in session && "id" in session) {
                const customerId = session.customer as string
                const subscriptionId = session.id as string

                console.log(`👤 Customer ID: ${customerId}`)
                console.log(`🔄 Subscription ID: ${subscriptionId}`)

                // Get the product ID
                const productId = (session as Stripe.Subscription).items.data[0].price.product as string
                console.log(`🏷️ Product ID: ${productId}`)

                // Update the user's subscription status
                console.log("📝 Updating user subscription status...")
                try {
                    const membershipStatus = await manageSubscriptionStatusChange(
                        subscriptionId,
                        customerId,
                        productId
                    )
                    console.log(`✅ Subscription status updated to: ${membershipStatus}`)
                } catch (error) {
                    console.error(`❌ Error updating subscription: ${error instanceof Error ? error.message : 'Unknown error'}`)
                }
            } else {
                console.log("⚠️ Missing customer or id in session data")
            }
            break

        default:
            console.log(`⚠️ Unhandled event type: ${event.type}`)
    }

    console.log("✅ Webhook processing completed successfully")
    return new NextResponse(null, { status: 200 })
} 