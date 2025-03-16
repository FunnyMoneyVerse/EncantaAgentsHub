"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from 'lucide-react'

export default function CTASection() {
    return (
        <section className="py-20 bg-gradient-to-r from-purple-900 to-purple-800 text-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-6">
                        Ready to transform your content strategy?
                    </h2>
                    <p className="text-lg text-purple-100 mb-10 max-w-2xl mx-auto">
                        Join hundreds of businesses that are already creating remarkable content with Encanta's AI-powered platform.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/signup">
                            <Button
                                variant="secondary"
                                className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-6 text-lg font-medium"
                            >
                                Get Started Free
                                <ArrowRightIcon className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="/demo">
                            <Button
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-purple-900 px-8 py-6 text-lg font-medium"
                            >
                                Request a Demo
                            </Button>
                        </Link>
                    </div>
                    <p className="mt-6 text-sm text-purple-200">
                        No credit card required. Free plan includes 5 content pieces per month.
                    </p>
                </div>
            </div>
        </section>
    )
} 