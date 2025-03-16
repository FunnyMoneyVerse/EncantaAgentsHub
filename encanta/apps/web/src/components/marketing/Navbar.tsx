"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when path changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/95 backdrop-blur-sm shadow-sm'
                : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <span className="text-2xl font-bold font-montserrat text-purple-800">Encanta</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`font-medium transition-colors ${pathname === link.href
                                    ? 'text-purple-800'
                                    : 'text-gray-700 hover:text-purple-800'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/login">
                            <Button
                                variant="outline"
                                className="border-purple-300 text-purple-800 hover:bg-purple-50 hover:border-purple-800"
                            >
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/signup">
                            <Button
                                variant="primary"
                                className="text-white"
                            >
                                Get Started
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-800 hover:bg-purple-50 focus:outline-none"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span className="sr-only">Open main menu</span>
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-white border-b border-gray-200"
                    >
                        <div className="container mx-auto px-4 py-4 space-y-4">
                            <nav className="flex flex-col space-y-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`font-medium px-3 py-2 rounded-md ${pathname === link.href
                                            ? 'bg-purple-50 text-purple-800'
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-purple-800'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>
                            <div className="pt-4 border-t border-gray-200 grid grid-cols-2 gap-4">
                                <Link href="/login" className="w-full">
                                    <Button
                                        variant="outline"
                                        className="w-full border-purple-300 text-purple-800 hover:border-purple-800"
                                    >
                                        Sign In
                                    </Button>
                                </Link>
                                <Link href="/signup" className="w-full">
                                    <Button
                                        variant="primary"
                                        className="w-full text-white"
                                    >
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
} 