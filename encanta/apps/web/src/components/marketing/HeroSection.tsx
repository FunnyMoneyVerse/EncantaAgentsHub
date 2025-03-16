"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export default function HeroSection() {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <section className="bg-gradient-to-br from-purple-50 via-white to-teal-50 py-20 md:py-28">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Left Column - Text Content */}
                    <div className="lg:w-1/2 space-y-6">
                        <motion.h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat text-gray-900 leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Strategic AI for
                            <span className="text-purple-800 block">remarkable content</span>
                        </motion.h1>

                        <motion.p
                            className="text-lg md:text-xl text-gray-700 max-w-xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Encanta empowers startups and SMEs to produce professional,
                            strategically aligned content without specialized marketing or
                            technical AI skills.
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 pt-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <Link href="/pricing">
                                <Button
                                    variant="primary"
                                    className="px-6 py-3 text-base rounded-md"
                                    size="lg"
                                >
                                    Get Started
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button
                                    variant="outline"
                                    className="border-purple-800 text-purple-800 hover:bg-purple-50 px-6 py-3 text-base rounded-md"
                                    size="lg"
                                >
                                    Schedule a Consultation
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div
                            className="pt-8 text-sm text-gray-600"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <p className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>No credit card required</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>14-day free trial</span>
                            </p>
                        </motion.div>
                    </div>

                    {/* Right Column - Image/Animation */}
                    <div className="lg:w-1/2 relative">
                        <motion.div
                            className="relative w-full aspect-[4/3] max-w-xl mx-auto"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-teal-200 rounded-xl transform rotate-1 scale-105 opacity-30"></div>
                            <div className="absolute inset-0 bg-white rounded-lg shadow-xl overflow-hidden">
                                <div className="relative w-full h-full">
                                    <Image
                                        src="/images/dashboard-preview.svg"
                                        alt="Encanta Dashboard Preview"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xl font-medium">
                                        Dashboard Preview
                                    </div>
                                </div>
                            </div>

                            {/* Floating elements for visual interest */}
                            <motion.div
                                className="absolute -top-6 -right-6 w-20 h-20 bg-purple-100 rounded-full z-0"
                                animate={{
                                    y: isHovered ? -5 : 0,
                                    scale: isHovered ? 1.1 : 1,
                                }}
                                transition={{ duration: 0.5 }}
                            />
                            <motion.div
                                className="absolute -bottom-4 -left-4 w-16 h-16 bg-teal-100 rounded-full z-0"
                                animate={{
                                    y: isHovered ? 5 : 0,
                                    scale: isHovered ? 1.1 : 1,
                                }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
} 