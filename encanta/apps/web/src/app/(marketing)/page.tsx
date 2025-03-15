"use server"

import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
    title: "Encanta - AI-Powered Content Creation",
    description: "Create strategic content at scale with AI technology and marketing expertise."
}

export default async function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    <span className="encanta-gradient-text">Encanta</span> - AI-Powered Content Creation
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                    Create strategic content at scale with AI technology and marketing expertise.
                                    Perfect for startups and SMEs looking to elevate their content strategy.
                                </p>
                            </div>
                            <div className="space-x-4">
                                <Link href="/dashboard" passHref>
                                    <Button className="encanta-gradient-bg">Get Started</Button>
                                </Link>
                                <Link href="/pricing" passHref>
                                    <Button variant="outline">View Pricing</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Features</h2>
                                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                    Discover how Encanta can transform your content creation process
                                </p>
                            </div>
                            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {/* Feature 1 */}
                                <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm encanta-card-hover">
                                    <div className="p-2 bg-primary/10 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-6 w-6 text-primary"
                                        >
                                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                            <polyline points="14 2 14 8 20 8" />
                                            <path d="M8 13h2" />
                                            <path d="M8 17h2" />
                                            <path d="M14 13h2" />
                                            <path d="M14 17h2" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold">AI Content Generation</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Generate high-quality content for blogs, social media, emails, and more with our advanced AI.
                                    </p>
                                </div>

                                {/* Feature 2 */}
                                <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm encanta-card-hover">
                                    <div className="p-2 bg-primary/10 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-6 w-6 text-primary"
                                        >
                                            <path d="M12 20h9" />
                                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold">Brand Profiles</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Create and manage multiple brand profiles to ensure consistent voice and messaging across all content.
                                    </p>
                                </div>

                                {/* Feature 3 */}
                                <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm encanta-card-hover">
                                    <div className="p-2 bg-primary/10 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-6 w-6 text-primary"
                                        >
                                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold">Content Projects</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Organize your content into projects and collaborate with your team to streamline the creation process.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Pricing</h2>
                                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                    Choose the plan that's right for your business
                                </p>
                            </div>
                            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {/* Starter Plan */}
                                <div className="flex flex-col rounded-lg border shadow-sm encanta-card-hover">
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold">Starter</h3>
                                        <div className="mt-4 text-center">
                                            <span className="text-4xl font-bold">$29</span>
                                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">/month</span>
                                        </div>
                                        <ul className="mt-6 space-y-3">
                                            <li className="flex items-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="mr-2 h-4 w-4 text-primary"
                                                >
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                <span className="text-sm">1 Brand Profile</span>
                                            </li>
                                            <li className="flex items-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="mr-2 h-4 w-4 text-primary"
                                                >
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                <span className="text-sm">10,000 Words/month</span>
                                            </li>
                                            <li className="flex items-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="mr-2 h-4 w-4 text-primary"
                                                >
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                <span className="text-sm">Basic Templates</span>
                                            </li>
                                        </ul>
                                        <div className="mt-6">
                                            <Link href="/dashboard" passHref>
                                                <Button className="w-full">Get Started</Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Pro Plan */}
                                <div className="flex flex-col rounded-lg border shadow-sm encanta-card-hover relative">
                                    <div className="absolute top-0 right-0 rounded-bl-lg rounded-tr-lg bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                                        Popular
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold">Pro</h3>
                                        <div className="mt-4 text-center">
                                            <span className="text-4xl font-bold">$79</span>
                                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">/month</span>
                                        </div>
                                        <ul className="mt-6 space-y-3">
                                            <li className="flex items-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="mr-2 h-4 w-4 text-primary"
                                                >
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                <span className="text-sm">3 Brand Profiles</span>
                                            </li>
                                            <li className="flex items-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="mr-2 h-4 w-4 text-primary"
                                                >
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                <span className="text-sm">50,000 Words/month</span>
                                            </li>
                                            <li className="flex items-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="mr-2 h-4 w-4 text-primary"
                                                >
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                <span className="text-sm">Advanced Templates</span>
                                            </li>
                                            <li className="flex items-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="mr-2 h-4 w-4 text-primary"
                                                >
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                <span className="text-sm">Team Collaboration</span>
                                            </li>
                                        </ul>
                                        <div className="mt-6">
                                            <Link href="/dashboard" passHref>
                                                <Button className="w-full encanta-gradient-bg">Get Started</Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Enterprise Plan */}
                                <div className="flex flex-col rounded-lg border shadow-sm encanta-card-hover">
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold">Enterprise</h3>
                                        <div className="mt-4 text-center">
                                            <span className="text-4xl font-bold">$199</span>
                                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">/month</span>
                                        </div>
                                        <ul className="mt-6 space-y-3">
                                            <li className="flex items-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="mr-2 h-4 w-4 text-primary"
                                                >
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                <span className="text-sm">Unlimited Brand Profiles</span>
                                            </li>
                                            <li className="flex items-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="mr-2 h-4 w-4 text-primary"
                                                >
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                <span className="text-sm">200,000 Words/month</span>
                                            </li>
                                            <li className="flex items-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="mr-2 h-4 w-4 text-primary"
                                                >
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                <span className="text-sm">Custom Templates</span>
                                            </li>
                                            <li className="flex items-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="mr-2 h-4 w-4 text-primary"
                                                >
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                <span className="text-sm">Priority Support</span>
                                            </li>
                                        </ul>
                                        <div className="mt-6">
                                            <Link href="/contact" passHref>
                                                <Button variant="outline" className="w-full">Contact Sales</Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Transform Your Content?</h2>
                                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                    Join thousands of businesses already using Encanta to create high-quality content at scale.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                <Link href="/dashboard" passHref>
                                    <Button className="encanta-gradient-bg">Get Started for Free</Button>
                                </Link>
                                <Link href="/contact" passHref>
                                    <Button variant="outline">Contact Sales</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
} 