"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Tab } from '@headlessui/react'
import { motion } from 'framer-motion'

// Feature data
const features = [
    {
        id: 'ai-workflows',
        name: 'Modular AI Workflows',
        description: 'Our specialized AI agents handle everything from ideation and research to drafting and editing, ensuring high-quality content at every step.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
        ),
        imageSrc: '/images/features/ai-workflows.svg',
        benefits: [
            'Specialized agents for different content tasks',
            'Quality assurance at every step',
            'Automated research and fact-checking',
            'Human-like content with strategic depth'
        ]
    },
    {
        id: 'workspaces',
        name: 'Workspace & Team Collaboration',
        description: 'Create multiple workspaces for different brands or projects, invite team members, and collaborate seamlessly on content with role-based access controls.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
        ),
        imageSrc: '/images/features/team-collaboration.svg',
        benefits: [
            'Role-based access controls',
            'Real-time document collaboration',
            'Version history and change tracking',
            'Task management and assignments'
        ]
    },
    {
        id: 'brand-voice',
        name: 'Brand Voice Customization',
        description: 'Define your brand voice through an interactive setup process. Encanta ensures all generated content aligns perfectly with your brand identity.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
            </svg>
        ),
        imageSrc: '/images/features/brand-voice.svg',
        benefits: [
            'Interactive brand voice assessment',
            'Tone consistency across all content',
            'Context-aware adaptation',
            'Continuous refinement and learning'
        ]
    },
    {
        id: 'knowledge-management',
        name: 'Knowledge Management',
        description: 'Upload documents to train the AI on your specific industry, products, and business details. Our semantic search system ensures relevant information is used in content generation.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
        ),
        imageSrc: '/images/features/knowledge-management.svg',
        benefits: [
            'Vector-based semantic search',
            'Automatic knowledge extraction',
            'Content generation informed by your docs',
            'Custom terminology and glossaries'
        ]
    }
]

export default function FeaturesSection() {
    const [selectedIndex, setSelectedIndex] = useState(0)

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-gray-900 mb-4">
                        Features that transform your content strategy
                    </h2>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                        Encanta combines powerful AI with strategic marketing expertise to deliver a platform that makes professional content creation accessible to every business.
                    </p>
                </div>

                <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                    <Tab.List className="flex flex-wrap justify-center gap-2 mb-16">
                        {features.map((feature) => (
                            <Tab
                                key={feature.id}
                                className={({ selected }: { selected: boolean }) =>
                                    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none ${selected
                                        ? 'bg-purple-800 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`
                                }
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-current">{feature.icon}</span>
                                    <span>{feature.name}</span>
                                </div>
                            </Tab>
                        ))}
                    </Tab.List>

                    <Tab.Panels className="mt-8">
                        {features.map((feature, idx) => (
                            <Tab.Panel key={feature.id}>
                                <div className="grid md:grid-cols-2 gap-12 items-center">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="space-y-6"
                                    >
                                        <h3 className="text-2xl font-bold font-montserrat text-gray-900">
                                            {feature.name}
                                        </h3>
                                        <p className="text-lg text-gray-700">
                                            {feature.description}
                                        </p>

                                        <div className="mt-6">
                                            <h4 className="text-lg font-semibold font-montserrat text-gray-900 mb-4">
                                                Key Benefits
                                            </h4>
                                            <ul className="space-y-3">
                                                {feature.benefits.map((benefit, i) => (
                                                    <motion.li
                                                        key={i}
                                                        className="flex items-start gap-3"
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.3, delay: 0.1 * i }}
                                                    >
                                                        <span className="mt-1 text-teal-500 flex-shrink-0">
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                            </svg>
                                                        </span>
                                                        <span>{benefit}</span>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="relative rounded-xl overflow-hidden shadow-xl border border-gray-100"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <div className="aspect-[4/3] relative">
                                            <Image
                                                src={feature.imageSrc}
                                                alt={feature.name}
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                        </div>
                                    </motion.div>
                                </div>
                            </Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </section>
    )
} 