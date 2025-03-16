import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import HeroSection from '@/components/marketing/HeroSection'
import FeaturesSection from '@/components/marketing/FeaturesSection'
import TestimonialsSection from '@/components/marketing/TestimonialsSection'
import PricingPreviewSection from '@/components/marketing/PricingPreviewSection'
import CTASection from '@/components/marketing/CTASection'

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Encanta | Strategic AI for Remarkable Content",
        description: "Encanta is an AI-powered content platform that empowers startups and SMEs to produce professional, strategically aligned content without specialized marketing or technical AI skills."
    }
}

export default async function HomePage() {
    return (
        <main className="flex-grow">
            <HeroSection />
            <FeaturesSection />

            <section className="bg-gradient-to-b from-white to-purple-50 py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-montserrat text-gray-900">
                        Two ways to experience Encanta
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* Self-Service Option */}
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-purple-100 flex flex-col">
                            <h3 className="text-2xl font-bold font-montserrat text-purple-800 mb-4">
                                Self-Service Platform
                            </h3>
                            <p className="text-gray-700 mb-6 flex-grow">
                                Access our intuitive dashboard to create professional content with AI assistance. Perfect for teams who want to maintain control over their content creation process.
                            </p>
                            <ul className="mb-8 space-y-2">
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-teal-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span>AI-powered content creation tools</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-teal-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span>Workspace & team collaboration</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-teal-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span>Brand voice customization</span>
                                </li>
                            </ul>
                            <Link href="/pricing" className="mt-auto">
                                <Button className="w-full bg-purple-800 hover:bg-purple-900 text-white">
                                    See Pricing
                                </Button>
                            </Link>
                        </div>

                        {/* Consulting Option */}
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-purple-100 flex flex-col">
                            <h3 className="text-2xl font-bold font-montserrat text-purple-800 mb-4">
                                Expert Consulting
                            </h3>
                            <p className="text-gray-700 mb-6 flex-grow">
                                Work with our marketing experts to develop and implement strategic content plans. Ideal for businesses looking for high-touch guidance and implementation.
                            </p>
                            <ul className="mb-8 space-y-2">
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-teal-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span>Personalized content strategy</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-teal-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span>Expert content creation & review</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-teal-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span>Dedicated account manager</span>
                                </li>
                            </ul>
                            <Link href="/contact" className="mt-auto">
                                <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                                    Schedule Consultation
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <TestimonialsSection />
            <PricingPreviewSection />
            <CTASection />
        </main>
    )
} 