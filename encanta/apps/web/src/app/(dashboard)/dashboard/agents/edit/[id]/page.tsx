'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useWorkspaceStore } from '@/lib/stores/workspace-store';
import { api } from '@/lib/api';
import { toast } from 'react-hot-toast';
import { AgentConfigForm } from '@/components/agents/agent-config-form';

export default function EditAgentConfigPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { selectedWorkspace } = useWorkspaceStore();
    const [isLoading, setIsLoading] = useState(true);
    const [config, setConfig] = useState<any>(null);

    // Fetch the configuration data
    useEffect(() => {
        async function fetchConfig() {
            try {
                setIsLoading(true);
                const configData = await api.agentConfigs.getById(params.id);
                setConfig(configData);
            } catch (error) {
                console.error('Error fetching agent configuration:', error);
                toast.error('Failed to load agent configuration');
                router.push('/dashboard/agents');
            } finally {
                setIsLoading(false);
            }
        }

        fetchConfig();
    }, [params.id, router]);

    // Handle form submission
    async function handleSubmit(data: any) {
        try {
            // Update configuration
            await api.agentConfigs.update(params.id, data);

            toast.success('Agent configuration updated successfully');
            router.push('/dashboard/agents');
        } catch (error) {
            console.error('Error updating agent configuration:', error);
            toast.error('Failed to update agent configuration');
        }
    }

    // Get display info for the selected agent type
    function getAgentInfo(agentType: string) {
        const agentTypes = {
            "ideation": {
                name: "Ideation Agent",
                description: "Generates creative content ideas and approaches",
            },
            "research": {
                name: "Research Agent",
                description: "Gathers facts, statistics, and insights on topics",
            },
            "content": {
                name: "Content Agent",
                description: "Creates the main content based on ideas and research",
            },
            "editor": {
                name: "Editor Agent",
                description: "Refines and improves the generated content",
            }
        };

        return agentType ? agentTypes[agentType as keyof typeof agentTypes] : null;
    }

    if (!selectedWorkspace) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <p className="text-gray-500 mb-4">Please select a workspace first</p>
                <Button onClick={() => router.push('/dashboard/workspaces')}>
                    Go to Workspaces
                </Button>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="animate-pulse space-y-4">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                <div className="h-64 bg-gray-100 rounded"></div>
            </div>
        );
    }

    if (!config) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Configuration not found</p>
                <Button className="mt-4" onClick={() => router.push('/dashboard/agents')}>
                    Back to Agents
                </Button>
            </div>
        );
    }

    const agentInfo = getAgentInfo(config.agentType);

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Edit Agent Configuration</h1>
                    <p className="text-gray-600 mt-1">
                        {agentInfo?.name} - {agentInfo?.description}
                    </p>
                </div>
                <Button variant="outline" onClick={() => router.push('/dashboard/agents')}>
                    Cancel
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Configuration Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <AgentConfigForm
                        workspaceId={selectedWorkspace.id}
                        agentType={config.agentType as "ideation" | "research" | "content" | "editor"}
                        initialData={config}
                        onSuccess={() => router.push('/dashboard/agents')}
                        onCancel={() => router.push('/dashboard/agents')}
                    />
                </CardContent>
            </Card>
        </div>
    );
} 