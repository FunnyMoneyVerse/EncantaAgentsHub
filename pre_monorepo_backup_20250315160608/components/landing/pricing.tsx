"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"

interface PricingPlan {
    name: string
    description: string
    price: {
        monthly: string
        yearly: string
    }
    features: string[]
    cta: string
    href: string
    popular?: boolean
}

const pricingPlans: PricingPlan[] = [
    {
        name: "Starter",
        description: "Perfect for small businesses just getting started with content.",
        price: {
            monthly: "$49",
            yearly: "$39"
        },
        features: [
            "1 workspace",
            "5 team members",
            "50 AI content generations per month",
            "Basic brand profile",
            "Standard support",
            "Document collaboration"
        ],
        cta: "Get Started",
        href: "/signup?plan=starter"
    },
    {
        name: "Professional",
        description: "Ideal for growing businesses with regular content needs.",
        price: {
            monthly: "$99",
            yearly: "$79"
        },
        features: [
            "3 workspaces",
            "10 team members",
            "200 AI content generations per month",
            "Advanced brand profiles",
            "Priority support",
            "Document collaboration",
            "Knowledge base integration",
            "Analytics dashboard"
        ],
        cta: "Get Started",
        href: "/signup?plan=professional",
        popular: true
    },
    {
        name: "Business",
        description: "For established businesses with high-volume content requirements.",
        price: {
            monthly: "$199",
            yearly: "$159"
        },
        features: [
            "10 workspaces",
            "Unlimited team members",
            "500 AI content generations per month",
            "Advanced brand profiles",
            "Priority support with dedicated manager",
            "Document collaboration",
            "Knowledge base integration",
            "Advanced analytics",
            "Custom AI model training",
            "API access"
        ],
        cta: "Get Started",
        href: "/signup?plan=business"
    }
]

export const PricingSection = () => {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center"
                >
                    <h2 className="mb-4 text-4xl font-bold">Simple, Transparent Pricing</h2>
                    <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                        Choose the plan that works best for your business needs. All plans include our core AI content generation features.
                    </p>

                    <div className="mb-12 flex items-center justify-center space-x-4">
                        <Button
                            variant={billingCycle === "monthly" ? "default" : "outline"}
                            onClick={() => setBillingCycle("monthly")}
                            className={billingCycle === "monthly" ? "bg-[#6A0DAD] hover:bg-[#5A0C9D]" : ""}
                        >
                            Monthly
                        </Button>
                        <Button
                            variant={billingCycle === "yearly" ? "default" : "outline"}
                            onClick={() => setBillingCycle("yearly")}
                            className={billingCycle === "yearly" ? "bg-[#6A0DAD] hover:bg-[#5A0C9D]" : ""}
                        >
                            Yearly <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">Save 20%</span>
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {pricingPlans.map((plan, index) => (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className={`flex h-full flex-col ${plan.popular ? "border-[#6A0DAD] shadow-lg" : ""}`}>
                                    {plan.popular && (
                                        <div className="absolute right-0 top-0 rounded-bl-lg rounded-tr-lg bg-[#6A0DAD] px-3 py-1 text-sm font-medium text-white">
                                            Most Popular
                                        </div>
                                    )}
                                    <CardHeader>
                                        <CardTitle className="text-2xl">{plan.name}</CardTitle>
                                        <CardDescription className="text-base">{plan.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <div className="mb-6">
                                            <span className="text-4xl font-bold">{plan.price[billingCycle]}</span>
                                            <span className="text-gray-500">/month</span>
                                        </div>
                                        <ul className="space-y-2">
                                            {plan.features.map((feature) => (
                                                <li key={feature} className="flex items-center">
                                                    <Check className="mr-2 size-5 text-green-500" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                        <Link href={plan.href} className="w-full">
                                            <Button
                                                className={`w-full ${plan.popular ? "bg-[#6A0DAD] hover:bg-[#5A0C9D]" : ""}`}
                                                variant={plan.popular ? "default" : "outline"}
                                            >
                                                {plan.cta}
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <h3 className="mb-4 text-2xl font-bold">Need a custom solution?</h3>
                        <p className="mx-auto mb-6 max-w-2xl text-gray-600 dark:text-gray-300">
                            For enterprises or businesses with specific requirements, we offer tailored solutions.
                        </p>
                        <Link href="/contact">
                            <Button variant="outline" className="border-[#6A0DAD] text-[#6A0DAD] hover:bg-[#6A0DAD] hover:text-white">
                                Contact Sales
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    )
} 