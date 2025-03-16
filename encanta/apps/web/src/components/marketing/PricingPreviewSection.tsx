"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

const plans = [
    {
        name: "Starter",
        price: "$29",
        period: "/month",
        description: "Perfect for individuals and small teams just getting started with content creation.",
        features: [
            "1 Brand Profile",
            "10,000 Words/month",
            "Basic Templates",
            "Email Support"
        ],
        cta: "Get Started",
        href: "/dashboard",
        highlighted: false
    },
    {
        name: "Pro",
        price: "$79",
        period: "/month",
        description: "Ideal for growing businesses with regular content needs and multiple team members.",
        features: [
            "3 Brand Profiles",
            "50,000 Words/month",
            "Advanced Templates",
            "Team Collaboration",
            "Priority Support"
        ],
        cta: "Get Started",
        href: "/dashboard",
        highlighted: true
    },
    {
        name: "Enterprise",
        price: "$199",
        period: "/month",
        description: "For organizations with complex content needs requiring maximum customization.",
        features: [
            "Unlimited Brand Profiles",
            "200,000 Words/month",
            "Custom Templates",
            "Advanced Analytics",
            "Dedicated Account Manager"
        ],
        cta: "Contact Sales",
        href: "/contact",
        highlighted: false
    }
]

export default function PricingPreviewSection() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 font-montserrat">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                        Choose the plan that's right for your business needs
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            className={`rounded-xl shadow-md overflow-hidden ${plan.highlighted
                                    ? 'border-2 border-purple-500 relative'
                                    : 'border border-gray-200'
                                }`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            {plan.highlighted && (
                                <div className="bg-purple-500 text-white text-xs font-bold uppercase py-1 px-3 absolute right-0 top-0 rounded-bl-lg">
                                    Popular
                                </div>
                            )}
                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-2 text-gray-900">{plan.name}</h3>
                                <div className="mb-4">
                                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                                    <span className="text-gray-600">{plan.period}</span>
                                </div>
                                <p className="text-gray-700 mb-6">{plan.description}</p>
                                <ul className="mb-8 space-y-3">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link href={plan.href}>
                                    <Button
                                        className={`w-full ${plan.highlighted
                                                ? 'bg-purple-800 hover:bg-purple-900 text-white'
                                                : ''
                                            }`}
                                        variant={plan.highlighted ? 'default' : 'outline'}
                                    >
                                        {plan.cta}
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link href="/pricing">
                        <Button variant="outline" className="px-8">
                            View Full Pricing Details
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
} 