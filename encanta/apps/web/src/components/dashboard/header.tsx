"use client"

import Link from "next/link"
import { UserButton } from "@clerk/nextjs"
import { BellIcon } from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"
import { WorkspaceSelector } from "./workspace-selector"

export function Header() {
    return (
        <header className="bg-white shadow">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            {/* Mobile logo */}
                            <div className="block md:hidden">
                                <h1 className="text-xl font-bold">Encanta</h1>
                            </div>
                        </div>
                        <div className="ml-6 flex items-center">
                            <WorkspaceSelector />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button
                            type="button"
                            className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        <div className="ml-4">
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
} 