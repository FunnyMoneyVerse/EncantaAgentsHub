import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import CTASection from '@/components/marketing/CTASection';
import { CheckIcon } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Features | Encanta',
        description: 'Explore the powerful features of Encanta\'s AI-driven content platform. From modular AI workflows to brand voice customization, discover how we empower businesses to create remarkable content.',
    };
}

// Features data
const featureSections = [
    {
        id: 'ai-workflows',
        title: 'Modular AI Workflows',
        description: 'Our specialized AI agents handle every stage of the content creation process, ensuring high-quality output at every step.',
        image: '/images/features/ai-workflows-detailed.png',
        features: [
            {
                title: 'Ideation Agent',
                description: 'Generates innovative content concepts and approaches based on your goals, audience, and industry context.'
            },
            {
                title: 'Research Agent',
                description: 'Gathers relevant facts, statistics, and insights to support your content with accurate, up-to-date information.'
            },
            {
                title: 'Content Agent',
                description: 'Produces well-structured, engaging content that combines strategic thinking with compelling storytelling.'
            },
            {
                title: 'Editor Agent',
                description: 'Refines and polishes content for grammar, style, tone, and strategic alignment, ensuring professional quality.'
            }
        ]
    },
    {
        id: 'workspaces',
        title: 'Workspace & Team Collaboration',
        description: 'Organize your content projects and collaborate seamlessly with your team in a unified platform designed for efficiency.',
        image: '/images/features/team-collaboration-detailed.png',
        features: [
            {
                title: 'Multi-Workspace Management',
                description: 'Create and manage multiple workspaces for different brands, projects, or clients, each with its own settings and team members.'
            },
            {
                title: 'Role-Based Access Controls',
                description: 'Assign specific permissions to team members based on their roles, ensuring the right people have access to the right content.'
            },
            {
                title: 'Real-Time Collaboration',
                description: 'Work together on content in real-time with commenting, version history, and collaborative editing capabilities.'
            },
            {
                title: 'Task Management',
                description: 'Assign and track content tasks across your team with deadlines, priorities, and progress tracking.'
            }
        ]
    },
    {
        id: 'brand-voice',
        title: 'Brand Voice Customization',
        description: 'Ensure all content perfectly reflects your brand\'s unique tone, style, and messaging through our sophisticated voice customization system.',
        image: '/images/features/brand-voice-detailed.png',
        features: [
            {
                title: 'Interactive Voice Assessment',
                description: 'Define your brand voice through an engaging, interactive questionnaire that captures your unique communication style.'
            },
            {
                title: 'Voice Consistency Scoring',
                description: 'Measure how well content aligns with your defined brand voice, with actionable feedback for improvements.'
            },
            {
                title: 'Contextual Adaptation',
                description: 'Automatically adjust tone and style based on content type, channel, and audience while maintaining brand consistency.'
            },
            {
                title: 'Voice Evolution',
                description: 'Refine your brand voice over time based on performance data and changing business needs.'
            }
        ]
    },
    {
        id: 'knowledge-management',
        title: 'Knowledge Management',
        description: 'Leverage your existing content and industry knowledge to inform and enhance AI-generated content through our advanced semantic search system.',
        image: '/images/features/knowledge-management-detailed.png',
        features: [
            {
                title: 'Document Upload & Processing',
                description: 'Easily upload and process your existing documents, from whitepapers to product information, to train the AI on your specific knowledge.'
            },
            {
                title: 'Semantic Search',
                description: 'Find and retrieve relevant information from your knowledge base using natural language queries and semantic understanding.'
            },
            {
                title: 'Custom Terminology',
                description: 'Create and manage glossaries of industry-specific and company-specific terms to ensure accurate and consistent usage.'
            },
            {
                title: 'Knowledge Graph',
                description: 'Visualize the relationships between different concepts and topics in your knowledge base to identify content opportunities.'
            }
        ]
    },
    {
        id: 'content-generation',
        title: 'Dynamic Content Generation',
        description: 'Create a wide variety of content types with intuitive interfaces and real-time feedback, all aligned with your strategic goals.',
        image: '/images/features/content-generation-detailed.png',
        features: [
            {
                title: 'Multi-Format Support',
                description: 'Generate content for blogs, social media, email campaigns, landing pages, product descriptions, and more from a single platform.'
            },
            {
                title: 'Real-Time Previews',
                description: 'See how your content will appear across different channels and devices as you create it, with live formatting and layout previews.'
            },
            {
                title: 'Content Strategy Tools',
                description: 'Access built-in tools for keyword research, competitor analysis, and content gap identification to inform your content strategy.'
            },
            {
                title: 'Performance Predictions',
                description: 'Get AI-powered predictions about how your content is likely to perform based on historical data and industry benchmarks.'
            }
        ]
    },
    {
        id: 'integrations',
        title: 'Seamless Integrations',
        description: 'Connect Encanta with your existing marketing stack to streamline your content workflows and maximize efficiency.',
        image: '/images/features/integrations-detailed.png',
        features: [
            {
                title: 'CMS Connections',
                description: 'Publish directly to WordPress, Shopify, and other popular content management systems with a few clicks.'
            },
            {
                title: 'Social Media Integration',
                description: 'Schedule and post content to multiple social platforms without leaving the Encanta dashboard.'
            },
            {
                title: 'Email Marketing Tools',
                description: 'Connect with Mailchimp, HubSpot, and other email marketing platforms for seamless campaign creation and delivery.'
            },
            {
                title: 'Analytics Connections',
                description: 'Import performance data from Google Analytics and other analytics tools to measure content impact and ROI.'
            }
        ]
    }
];

export default async function FeaturesPage() {
    return (
        <main className="flex-grow">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-b from-purple-50 via-white to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-gray-900 mb-6">
                            Powerful features to transform your content strategy
                        </h1>
                        <p className="text-lg text-gray-700">
                            Encanta combines advanced AI technology with strategic marketing expertise to deliver a platform that makes professional content creation accessible to every business.
                        </p>
                    </div>

                    {/* Quick feature overview */}
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-purple-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold font-montserrat text-gray-900 mb-2">AI-Powered</h3>
                            <p className="text-gray-700">
                                Specialized AI agents handle everything from ideation to editing, ensuring quality at every step.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-purple-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold font-montserrat text-gray-900 mb-2">Customizable</h3>
                            <p className="text-gray-700">
                                Tailor the platform to your brand voice, industry, and specific content needs.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-purple-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold font-montserrat text-gray-900 mb-2">Collaborative</h3>
                            <p className="text-gray-700">
                                Work seamlessly with your team with shared workspaces, commenting, and role-based access.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Feature Sections */}
            {featureSections.map((section, index) => (
                <section
                    key={section.id}
                    id={section.id}
                    className={`py-20 ${index % 2 === 0 ? 'bg-white' : 'bg-purple-50'}`}
                >
                    <div className="container mx-auto px-4">
                        <div className={`grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto ${index % 2 === 1 ? 'md:grid-flow-col-reverse' : ''}`}>
                            <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                                <h2 className="text-3xl font-bold font-montserrat text-gray-900 mb-4">
                                    {section.title}
                                </h2>
                                <p className="text-lg text-gray-700 mb-8">
                                    {section.description}
                                </p>

                                <div className="space-y-6">
                                    {section.features.map((feature, featureIndex) => (
                                        <div key={featureIndex} className="flex gap-4">
                                            <div className="flex-shrink-0 mt-1">
                                                <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center">
                                                    <CheckIcon className="w-4 h-4 text-teal-700" />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold font-montserrat text-gray-900 mb-2">
                                                    {feature.title}
                                                </h3>
                                                <p className="text-gray-700">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={`relative rounded-xl overflow-hidden shadow-xl border border-gray-100 aspect-[4/3] ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                                <Image
                                    src={section.image}
                                    alt={section.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            ))}

            {/* Feature Comparison Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold font-montserrat text-gray-900 mb-4">
                            How Encanta Compares
                        </h2>
                        <p className="text-lg text-gray-700">
                            See how Encanta stands out from basic AI writing tools and traditional marketing agencies.
                        </p>
                    </div>

                    <div className="max-w-6xl mx-auto overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-purple-50">
                                    <th className="p-4 text-left font-montserrat text-gray-900 border-b border-gray-200 w-1/4"></th>
                                    <th className="p-4 text-center font-montserrat text-gray-900 border-b border-gray-200 w-1/4">Basic AI Tools</th>
                                    <th className="p-4 text-center font-montserrat text-purple-800 border-b border-gray-200 w-1/4">
                                        <div className="flex flex-col items-center">
                                            <span>Encanta</span>
                                            <span className="mt-1 text-xs font-normal bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Recommended</span>
                                        </div>
                                    </th>
                                    <th className="p-4 text-center font-montserrat text-gray-900 border-b border-gray-200 w-1/4">Marketing Agencies</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-4 font-medium text-gray-900 border-b border-gray-200">Strategic Guidance</td>
                                    <td className="p-4 text-center border-b border-gray-200">
                                        <span className="inline-block w-6 h-6 bg-red-100 rounded-full text-red-700 flex items-center justify-center">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </span>
                                    </td>
                                    <td className="p-4 text-center border-b border-gray-200 bg-purple-50">
                                        <span className="inline-block w-6 h-6 bg-green-100 rounded-full text-green-700 flex items-center justify-center">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </span>
                                    </td>
                                    <td className="p-4 text-center border-b border-gray-200">
                                        <span className="inline-block w-6 h-6 bg-green-100 rounded-full text-green-700 flex items-center justify-center">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium text-gray-900 border-b border-gray-200">Content Quality</td>
                                    <td className="p-4 text-center border-b border-gray-200">Medium</td>
                                    <td className="p-4 text-center border-b border-gray-200 bg-purple-50">High</td>
                                    <td className="p-4 text-center border-b border-gray-200">High</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium text-gray-900 border-b border-gray-200">Production Speed</td>
                                    <td className="p-4 text-center border-b border-gray-200">Fast</td>
                                    <td className="p-4 text-center border-b border-gray-200 bg-purple-50">Fast</td>
                                    <td className="p-4 text-center border-b border-gray-200">Slow</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium text-gray-900 border-b border-gray-200">Cost</td>
                                    <td className="p-4 text-center border-b border-gray-200">$</td>
                                    <td className="p-4 text-center border-b border-gray-200 bg-purple-50">$$</td>
                                    <td className="p-4 text-center border-b border-gray-200">$$$+</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium text-gray-900 border-b border-gray-200">Brand Customization</td>
                                    <td className="p-4 text-center border-b border-gray-200">Limited</td>
                                    <td className="p-4 text-center border-b border-gray-200 bg-purple-50">Advanced</td>
                                    <td className="p-4 text-center border-b border-gray-200">Advanced</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium text-gray-900 border-b border-gray-200">Collaboration Tools</td>
                                    <td className="p-4 text-center border-b border-gray-200">Basic</td>
                                    <td className="p-4 text-center border-b border-gray-200 bg-purple-50">Advanced</td>
                                    <td className="p-4 text-center border-b border-gray-200">Varies</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium text-gray-900 border-b border-gray-200">Scalability</td>
                                    <td className="p-4 text-center border-b border-gray-200">High</td>
                                    <td className="p-4 text-center border-b border-gray-200 bg-purple-50">High</td>
                                    <td className="p-4 text-center border-b border-gray-200">Limited</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <CTASection />
        </main>
    );
} 