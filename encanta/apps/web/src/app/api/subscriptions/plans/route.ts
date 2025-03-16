import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import Stripe from "stripe"

export async function GET() {
    try {
        // Get all products
        const products = await stripe.products.list({
            active: true,
            expand: ["data.default_price"],
        })

        // Format the products with their prices
        const plans = products.data
            .filter((product) => product.metadata.type === "subscription")
            .map((product) => {
                const price = product.default_price as Stripe.Price

                // Extract features from metadata or use empty array
                const features = product.metadata.features
                    ? JSON.parse(product.metadata.features as string)
                    : []

                return {
                    id: product.id,
                    name: product.name,
                    description: product.description || "",
                    price: price.unit_amount ? price.unit_amount / 100 : 0, // Convert from cents to dollars
                    interval: price.recurring?.interval || "month",
                    features: features,
                    priceId: price.id,
                    popular: product.metadata.popular === "true",
                }
            })
            .sort((a, b) => a.price - b.price) // Sort by price

        return NextResponse.json(plans)
    } catch (error) {
        console.error("Error fetching subscription plans:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
} 