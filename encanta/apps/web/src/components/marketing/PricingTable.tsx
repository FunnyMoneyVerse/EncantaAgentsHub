"use client";

import { useState } from 'react';
import { Check, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

// Define the pricing plans
const plans = [
    {
        name: 'Free',
        description: 'For individuals and small teams just getting started.',
        price: {
            monthly: 0,
            annually: 0
        },
        features: [
            { name: '5 content pieces per month', tooltip: 'Blog posts, social media posts, emails, etc.' },
            { name: 'Basic AI workflows', tooltip: 'Access to our content generation AI with basic capabilities.' },
            { name: 'Single workspace', tooltip: 'One workspace for all your content.' },
            { name: 'Basic brand voice customization', tooltip: 'Define your brand voice with basic parameters.' },
            { name: 'Email support', tooltip: 'Get help via email within 48 hours.' },
        ],
        cta: 'Get Started',
        ctaLink: '/signup',
        popular: false
    },
    {
        name: 'Pro',
        description: 'For growing businesses with regular content needs.',
        price: {
            monthly: 49,
            annually: 39
        },
        features: [
            { name: '50 content pieces per month', tooltip: 'Blog posts, social media posts, emails, etc.' },
            { name: 'Advanced AI workflows', tooltip: 'Access to all our AI agents with advanced capabilities.' },
            { name: 'Multiple workspaces (3)', tooltip: 'Create up to 3 separate workspaces for different brands or projects.' },
            { name: 'Advanced brand voice customization', tooltip: 'Fine-tune your brand voice with advanced parameters and voice consistency scoring.' },
            { name: 'Knowledge base integration', tooltip: 'Connect your existing content to inform AI-generated content.' },
            { name: 'Priority email support', tooltip: 'Get help via email within 24 hours.' },
            { name: 'Basic analytics', tooltip: 'Track content performance with basic metrics.' },
        ],
        cta: 'Start Free Trial',
        ctaLink: '/signup?plan=pro',
        popular: true
    },
    {
        name: 'Business',
        description: 'For teams and businesses with high-volume content needs.',
        price: {
            monthly: 99,
            annually: 79
        },
        features: [
            { name: 'Unlimited content pieces', tooltip: 'Create as much content as you need with no monthly limits.' },
            { name: 'All Pro features', tooltip: 'Includes all features from the Pro plan.' },
            { name: 'Unlimited workspaces', tooltip: 'Create unlimited workspaces for different brands, clients, or projects.' },
            { name: 'Team collaboration tools', tooltip: 'Role-based access controls, commenting, and collaborative editing.' },
            { name: 'Advanced analytics', tooltip: 'Comprehensive content performance tracking and insights.' },
            { name: 'API access', tooltip: 'Integrate Encanta with your existing tools and workflows.' },
            { name: 'Custom integrations', tooltip: 'Connect with your CMS, social media, and other marketing tools.' },
            { name: 'Dedicated account manager', tooltip: 'Get personalized support from a dedicated account manager.' },
            { name: 'Phone & email support', tooltip: 'Get help via phone and email with priority response times.' },
        ],
        cta: 'Start Free Trial',
        ctaLink: '/signup?plan=business',
        popular: false
    }
];

export default function PricingTable() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');

    return (
        <div className="w-full max-w-7xl mx-auto">
            {/* Billing toggle */}
            <div className="flex justify-center mb-8">
                <div className="bg-gray-100 p-1 rounded-lg inline-flex">
                    <button
                        onClick={() => setBillingCycle('monthly')}
                        className={`px-4 py-2 text-sm font-medium rounded-md ${billingCycle === 'monthly'
                                ? 'bg-white shadow-sm text-gray-900'
                                : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setBillingCycle('annually')}
                        className={`px-4 py-2 text-sm font-medium rounded-md ${billingCycle === 'annually'
                                ? 'bg-white shadow-sm text-gray-900'
                                : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        Annually <span className="text-purple-600 font-medium">Save 20%</span>
                    </button>
                </div>
            </div>

            {/* Pricing cards */}
            <div className="grid md:grid-cols-3 gap-8">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className={`relative rounded-2xl border ${plan.popular
                                ? 'border-purple-200 shadow-lg shadow-purple-100'
                                : 'border-gray-200'
                            } bg-white p-6 flex flex-col`}
                    >
                        {plan.popular && (
                            <div className="absolute top-0 right-6 transform -translate-y-1/2">
                                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
                                    Most Popular
                                </span>
                            </div>
                        )}

                        <div className="mb-5">
                            <h3 className="text-lg font-bold font-montserrat text-gray-900">{plan.name}</h3>
                            <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
                        </div>

                        <div className="mb-5">
                            <div className="flex items-baseline">
                                <span className="text-3xl font-bold font-montserrat text-gray-900">
                                    ${billingCycle === 'monthly' ? plan.price.monthly : plan.price.annually}
                                </span>
                                <span className="ml-1 text-gray-500">
                                    {plan.price.monthly > 0 ? '/month' : ''}
                                </span>
                            </div>
                            {billingCycle === 'annually' && plan.price.monthly > 0 && (
                                <p className="mt-1 text-sm text-gray-500">
                                    Billed annually (${plan.price.annually * 12}/year)
                                </p>
                            )}
                        </div>

                        <ul className="space-y-3 mb-8 flex-grow">
                            {plan.features.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                    <div className="flex-shrink-0 mt-0.5">
                                        <Check className="h-5 w-5 text-green-500" />
                                    </div>
                                    <div className="ml-3 flex items-center">
                                        <span className="text-sm text-gray-700">{feature.name}</span>
                                        {feature.tooltip && (
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <span className="ml-1.5 cursor-help">
                                                            <HelpCircle className="h-3.5 w-3.5 text-gray-400" />
                                                        </span>
                                                    </TooltipTrigger>
                                                    <TooltipContent className="max-w-xs">
                                                        <p>{feature.tooltip}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <Link href={plan.ctaLink} className="mt-auto">
                            <Button
                                className={`w-full ${plan.popular
                                        ? 'bg-purple-800 hover:bg-purple-900 text-white'
                                        : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-900'
                                    }`}
                            >
                                {plan.cta}
                            </Button>
                        </Link>

                        {plan.price.monthly > 0 && (
                            <p className="mt-3 text-xs text-center text-gray-500">
                                14-day free trial, no credit card required
                            </p>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-10 text-center">
                <p className="text-gray-600">
                    Need a custom plan for your enterprise?{' '}
                    <Link href="/contact" className="text-purple-800 font-medium hover:text-purple-700">
                        Contact our sales team
                    </Link>
                </p>
            </div>
        </div>
    );
} 