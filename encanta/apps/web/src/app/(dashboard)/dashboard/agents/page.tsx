"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useWorkspaceStore } from '@/lib/stores/workspace-store';
import { api } from '@/lib/api';
import { toast } from 'react-hot-toast';
import { formatDate } from '@/lib/utils';

// Define the agent configuration type
interface AgentConfig {
    id: string;
    name: string;
    agentType: 'ideation' | 'research' | 'content' | 'editor';
    workspaceId: string;
    createdAt: string;
    updatedAt: string;
}

export default function AgentsPage() {
    const router = useRouter();
    const { selectedWorkspace } = useWorkspaceStore();
    const [configs, setConfigs] = useState<AgentConfig[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<string | null>(null);

    // Fetch agent configurations
    useEffect(() => {
        async function fetchConfigs() {
            if (!selectedWorkspace) return;

            try {
                setIsLoading(true);
                const data = await api.agentConfigs.getForWorkspace(selectedWorkspace.id);
                setConfigs(data);
            } catch (error) {
                console.error('Error fetching agent configurations:', error);
                toast.error('Failed to load agent configurations');
            } finally {
                setIsLoading(false);
            }
        }

        fetchConfigs();
    }, [selectedWorkspace]);

    // Handle delete configuration
    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this configuration?')) {
            return;
        }

        try {
            await api.agentConfigs.delete(id);
            setConfigs(configs.filter(config => config.id !== id));
            toast.success('Agent configuration deleted successfully');
        } catch (error) {
            console.error('Error deleting agent configuration:', error);
            toast.error('Failed to delete agent configuration');
        }
    }

    // Get filtered configurations
    const filteredConfigs = filter
        ? configs.filter(config => config.agentType === filter)
        : configs;

    // Get agent type display name
    function getAgentTypeName(type: string) {
        const types = {
            ideation: 'Ideation Agent',
            research: 'Research Agent',
            content: 'Content Agent',
            editor: 'Editor Agent',
        };
        return types[type as keyof typeof types] || type;
    }

    // Get agent type badge color
    function getAgentTypeColor(type: string) {
        const colors = {
            ideation: 'bg-purple-100 text-purple-800',
            research: 'bg-blue-100 text-blue-800',
            content: 'bg-green-100 text-green-800',
            editor: 'bg-amber-100 text-amber-800',
        };
        return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
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

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Agent Configurations</h1>
                    <p className="text-gray-600 mt-1">
                        Customize AI agents for different stages of content creation
                    </p>
                </div>
                <div className="flex gap-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <Filter className="h-4 w-4 mr-2" />
                                {filter ? `Filter: ${getAgentTypeName(filter)}` : 'Filter'}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setFilter(null)}>
                                All Types
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setFilter('ideation')}>
                                Ideation Agents
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setFilter('research')}>
                                Research Agents
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setFilter('content')}>
                                Content Agents
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setFilter('editor')}>
                                Editor Agents
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Create Agent
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => router.push('/dashboard/agents/create?type=ideation')}>
                                Ideation Agent
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push('/dashboard/agents/create?type=research')}>
                                Research Agent
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push('/dashboard/agents/create?type=content')}>
                                Content Agent
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push('/dashboard/agents/create?type=editor')}>
                                Editor Agent
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse">
                            <div className="h-48 bg-gray-100 rounded-lg"></div>
                        </div>
                    ))}
                </div>
            ) : filteredConfigs.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <p className="text-gray-500 mb-4">
                            {filter
                                ? `No ${getAgentTypeName(filter)} configurations found`
                                : 'No agent configurations found'}
                        </p>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Create Agent
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => router.push('/dashboard/agents/create?type=ideation')}>
                                    Ideation Agent
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push('/dashboard/agents/create?type=research')}>
                                    Research Agent
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push('/dashboard/agents/create?type=content')}>
                                    Content Agent
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push('/dashboard/agents/create?type=editor')}>
                                    Editor Agent
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredConfigs.map((config) => (
                        <Card key={config.id} className="overflow-hidden">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className={`inline-block px-2 py-1 text-xs rounded-full mb-2 ${getAgentTypeColor(config.agentType)}`}>
                                            {getAgentTypeName(config.agentType)}
                                        </span>
                                        <CardTitle className="text-xl">{config.name}</CardTitle>
                                    </div>
                                    <div className="flex space-x-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => router.push(`/dashboard/agents/edit/${config.id}`)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(config.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-gray-500 mt-2">
                                    Created: {formatDate(config.createdAt)}
                                </div>
                                <div className="text-sm text-gray-500">
                                    Last updated: {formatDate(config.updatedAt)}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
} 