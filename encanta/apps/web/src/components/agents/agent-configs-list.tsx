"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"
import { toast } from "react-hot-toast"
import { SelectAgentConfig } from "@/db/schema"
import { AgentConfigForm } from "./agent-config-form"

interface AgentConfigsListProps {
    workspaceId: string
    agentType: "ideation" | "research" | "content" | "editor"
}

export function AgentConfigsList({ workspaceId, agentType }: AgentConfigsListProps) {
    const [configs, setConfigs] = useState<SelectAgentConfig[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isCreating, setIsCreating] = useState(false)
    const [editingConfig, setEditingConfig] = useState<SelectAgentConfig | null>(null)

    // Agent type display names
    const agentTypeNames = {
        ideation: "Ideation Agent",
        research: "Research Agent",
        content: "Content Agent",
        editor: "Editor Agent"
    }

    // Load agent configurations
    useEffect(() => {
        async function loadConfigs() {
            setIsLoading(true)
            setError(null)

            try {
                const data = await api.agentConfigs.getForWorkspace(workspaceId, agentType)
                setConfigs(data)
            } catch (err) {
                console.error("Error loading agent configurations:", err)
                setError("Failed to load agent configurations")
                toast.error("Failed to load agent configurations")
            } finally {
                setIsLoading(false)
            }
        }

        loadConfigs()
    }, [workspaceId, agentType])

    // Handle create success
    const handleCreateSuccess = (newConfig: SelectAgentConfig) => {
        setConfigs([...configs, newConfig])
        setIsCreating(false)
        // If the new config is set as default, update other configs
        if (newConfig.isDefault) {
            setConfigs(prevConfigs =>
                prevConfigs.map(config =>
                    config.id !== newConfig.id ? { ...config, isDefault: false } : config
                )
            )
        }
    }

    // Handle update success
    const handleUpdateSuccess = (updatedConfig: SelectAgentConfig) => {
        setConfigs(prevConfigs =>
            prevConfigs.map(config =>
                config.id === updatedConfig.id ? updatedConfig : config
            )
        )
        setEditingConfig(null)
        // If the updated config is set as default, update other configs
        if (updatedConfig.isDefault) {
            setConfigs(prevConfigs =>
                prevConfigs.map(config =>
                    config.id !== updatedConfig.id ? { ...config, isDefault: false } : config
                )
            )
        }
    }

    // Handle delete
    const handleDelete = async (configId: string) => {
        if (!confirm("Are you sure you want to delete this configuration?")) {
            return
        }

        try {
            await api.agentConfigs.delete(configId)
            setConfigs(prevConfigs => prevConfigs.filter(config => config.id !== configId))
            toast.success("Configuration deleted successfully")
        } catch (err) {
            console.error("Error deleting configuration:", err)
            toast.error("Failed to delete configuration")
        }
    }

    // Render loading state
    if (isLoading) {
        return (
            <div className="p-8 text-center">
                <p className="text-gray-500">Loading configurations...</p>
            </div>
        )
    }

    // Render error state
    if (error) {
        return (
            <div className="p-8 text-center">
                <p className="text-red-500">{error}</p>
                <Button
                    className="mt-4"
                    onClick={() => window.location.reload()}
                >
                    Retry
                </Button>
            </div>
        )
    }

    // Render form for creating/editing
    if (isCreating || editingConfig) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">
                    {isCreating ? `Create ${agentTypeNames[agentType]} Configuration` : `Edit ${agentTypeNames[agentType]} Configuration`}
                </h3>
                <AgentConfigForm
                    workspaceId={workspaceId}
                    agentType={agentType}
                    initialData={editingConfig || undefined}
                    onSuccess={isCreating ? handleCreateSuccess : handleUpdateSuccess}
                    onCancel={() => {
                        setIsCreating(false)
                        setEditingConfig(null)
                    }}
                />
            </div>
        )
    }

    // Render list of configurations
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">{agentTypeNames[agentType]} Configurations</h2>
                <Button onClick={() => setIsCreating(true)}>
                    Create Configuration
                </Button>
            </div>

            {configs.length === 0 ? (
                <div className="bg-gray-50 p-8 text-center rounded-lg border border-dashed border-gray-300">
                    <p className="text-gray-500 mb-4">No configurations found for this agent type.</p>
                    <Button onClick={() => setIsCreating(true)}>
                        Create Your First Configuration
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {configs.map(config => (
                        <div
                            key={config.id}
                            className={`bg-white p-5 rounded-lg border ${config.isDefault ? 'border-purple-300 ring-1 ring-purple-300' : 'border-gray-200'}`}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center">
                                        <h3 className="text-lg font-medium">{config.name}</h3>
                                        {config.isDefault && (
                                            <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                                                Default
                                            </span>
                                        )}
                                    </div>
                                    {config.instructions && (
                                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                                            {config.instructions}
                                        </p>
                                    )}
                                    <div className="mt-3 flex items-center text-xs text-gray-500">
                                        <span>
                                            {(config.examples as any[])?.length || 0} examples
                                        </span>
                                        <span className="mx-2">•</span>
                                        <span>
                                            Created {new Date(config.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setEditingConfig(config)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                        onClick={() => handleDelete(config.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
} 