"use server"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function MarketingLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-40 w-full border-b bg-background">
                <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
                    <div className="flex gap-6 md:gap-10">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="inline-block font-bold text-xl encanta-gradient-text">Encanta</span>
                        </Link>
                        <nav className="hidden md:flex gap-6">
                            <Link
                                href="/features"
                                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
                            >
                                Features
                            </Link>
                            <Link
                                href="/pricing"
                                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
                            >
                                Pricing
                            </Link>
                            <Link
                                href="/about"
                                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
                            >
                                About
                            </Link>
                            <Link
                                href="/contact"
                                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
                            >
                                Contact
                            </Link>
                        </nav>
                    </div>
                    <div className="flex flex-1 items-center justify-end space-x-4">
                        <nav className="flex items-center space-x-2">
                            <Link href="/login" passHref>
                                <Button variant="ghost">Login</Button>
                            </Link>
                            <Link href="/register" passHref>
                                <Button className="encanta-gradient-bg">Sign Up</Button>
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="border-t py-6 md:py-0">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        &copy; {new Date().getFullYear()} Encanta. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/terms"
                            className="text-sm font-medium text-muted-foreground hover:text-foreground"
                        >
                            Terms
                        </Link>
                        <Link
                            href="/privacy"
                            className="text-sm font-medium text-muted-foreground hover:text-foreground"
                        >
                            Privacy
                        </Link>
                        <Link
                            href="/contact"
                            className="text-sm font-medium text-muted-foreground hover:text-foreground"
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
} 