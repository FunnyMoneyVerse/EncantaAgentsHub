"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"
import { useWorkspaceStore } from "@/lib/stores/workspace-store"

export function WorkspaceSelector() {
    const router = useRouter()
    const { workspaces, selectedWorkspace, setWorkspaces, setSelectedWorkspace } = useWorkspaceStore()
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // Load workspaces on mount
    useEffect(() => {
        async function loadWorkspaces() {
            try {
                // In a real app, you would fetch workspaces from the API
                // For now, we'll use the workspaces from the store
                setIsLoading(false)
                if (workspaces.length > 0 && !selectedWorkspace) {
                    setSelectedWorkspace(workspaces[0])
                }
            } catch (error) {
                console.error("Failed to load workspaces:", error)
                setIsLoading(false)
            }
        }

        loadWorkspaces()
    }, [workspaces, selectedWorkspace, setSelectedWorkspace])

    if (isLoading) {
        return (
            <div className="animate-pulse h-8 w-48 bg-gray-200 rounded"></div>
        )
    }

    if (workspaces.length === 0) {
        return (
            <Button
                onClick={() => router.push("/dashboard/workspaces/create")}
                variant="outline"
                size="sm"
                className="flex items-center"
            >
                <PlusIcon className="h-4 w-4 mr-2" />
                Create Workspace
            </Button>
        )
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                {selectedWorkspace?.name || "Select Workspace"}
                <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </button>

            {isOpen && (
                <div className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {workspaces.map((workspace) => (
                            <button
                                key={workspace.id}
                                className={`
                                    flex w-full px-4 py-2 text-left text-sm
                                    ${selectedWorkspace?.id === workspace.id ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}
                                `}
                                onClick={() => {
                                    setSelectedWorkspace(workspace)
                                    setIsOpen(false)
                                }}
                            >
                                {workspace.name}
                            </button>
                        ))}

                        <div className="border-t border-gray-100 my-1"></div>

                        <button
                            className="flex w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => {
                                router.push("/dashboard/workspaces/create")
                                setIsOpen(false)
                            }}
                        >
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Create New Workspace
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
} 