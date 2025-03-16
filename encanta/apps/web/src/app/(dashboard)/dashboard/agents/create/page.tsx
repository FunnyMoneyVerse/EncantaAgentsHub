'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useWorkspaceStore } from '@/lib/stores/workspace-store';
import { api } from '@/lib/api';
import { toast } from 'react-hot-toast';
import { AgentConfigForm } from '@/components/agents/agent-config-form';

export default function CreateAgentConfigPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { selectedWorkspace } = useWorkspaceStore();
    const [agentType, setAgentType] = useState<string | null>(null);

    // Get agent type from query parameters
    useEffect(() => {
        const type = searchParams.get('type');
        if (type && ['ideation', 'research', 'content', 'editor'].includes(type)) {
            setAgentType(type);
        } else {
            // Default to ideation if no valid type provided
            setAgentType('ideation');
        }
    }, [searchParams]);

    // Handle form submission
    async function handleSubmit(data: any) {
        if (!selectedWorkspace) {
            toast.error('No active workspace selected');
            return;
        }

        try {
            // Add workspace ID and agent type to data
            const configData = {
                ...data,
                workspaceId: selectedWorkspace.id,
                agentType: agentType
            };

            // Create new configuration
            await api.agentConfigs.create(configData);

            toast.success('Agent configuration created successfully');
            router.push('/dashboard/agents');
        } catch (error) {
            console.error('Error creating agent configuration:', error);
            toast.error('Failed to create agent configuration');
        }
    }

    // Get display info for the selected agent type
    function getAgentInfo() {
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

    const agentInfo = getAgentInfo();

    if (!agentInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Create Agent Configuration</h1>
                    <p className="text-gray-600 mt-1">
                        {agentInfo.name} - {agentInfo.description}
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
                        agentType={agentType as "ideation" | "research" | "content" | "editor"}
                        onSuccess={() => router.push('/dashboard/agents')}
                        onCancel={() => router.push('/dashboard/agents')}
                    />
                </CardContent>
            </Card>
        </div>
    );
} 