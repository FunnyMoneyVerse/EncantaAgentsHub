"use server"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DashboardNav } from "./_components/dashboard-nav"

export default async function DashboardLayout({
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
                    </div>
                    <div className="flex flex-1 items-center justify-end space-x-4">
                        <nav className="flex items-center space-x-2">
                            <Button variant="ghost">Account</Button>
                            <Button variant="ghost">Logout</Button>
                        </nav>
                    </div>
                </div>
            </header>
            <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
                <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
                    <DashboardNav />
                </aside>
                <main className="flex w-full flex-col overflow-hidden py-6">{children}</main>
            </div>
            <footer className="border-t py-6 md:py-0">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        &copy; {new Date().getFullYear()} Encanta. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
} 