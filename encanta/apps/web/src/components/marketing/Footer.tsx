"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <Link href="/" className="inline-block">
                            <span className="text-2xl font-bold font-montserrat text-white">Encanta</span>
                        </Link>
                        <p className="text-gray-400">
                            AI-powered content platform for startups and SMEs.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://twitter.com/encantaAI" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </a>
                            <a href="https://linkedin.com/company/encanta" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                            <a href="https://facebook.com/encantaAI" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </a>
                            <a href="https://instagram.com/encantaAI" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </a>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 font-montserrat">Product</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link>
                            </li>
                            <li>
                                <Link href="/demo" className="text-gray-400 hover:text-white transition-colors">Request a Demo</Link>
                            </li>
                            <li>
                                <Link href="/use-cases" className="text-gray-400 hover:text-white transition-colors">Use Cases</Link>
                            </li>
                            <li>
                                <Link href="/roadmap" className="text-gray-400 hover:text-white transition-colors">Roadmap</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 font-montserrat">Company</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link>
                            </li>
                            <li>
                                <Link href="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
                            </li>
                            <li>
                                <Link href="/partners" className="text-gray-400 hover:text-white transition-colors">Partners</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 font-montserrat">Stay Updated</h3>
                        <p className="text-gray-400 mb-4">
                            Get the latest news and updates from Encanta.
                        </p>
                        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                            <div className="flex">
                                <Input
                                    type="email"
                                    placeholder="Your email address"
                                    className="bg-gray-800 border-gray-700 text-white rounded-r-none focus-visible:ring-purple-600 focus-visible:ring-offset-gray-900"
                                />
                                <Button
                                    type="submit"
                                    className="bg-purple-700 hover:bg-purple-800 rounded-l-none"
                                >
                                    Subscribe
                                </Button>
                            </div>
                            <p className="text-xs text-gray-500">
                                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
                            </p>
                        </form>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-gray-400 text-sm mb-4 md:mb-0">
                        © {new Date().getFullYear()} Encanta. All rights reserved.
                    </div>
                    <div className="flex space-x-6 text-sm">
                        <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
} 