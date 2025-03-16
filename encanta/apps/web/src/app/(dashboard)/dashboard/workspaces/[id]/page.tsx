'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { api } from '@/lib/api';
import { toast } from 'react-hot-toast';
import { useWorkspaceStore } from '@/lib/stores/workspace-store';
import {
    BuildingOfficeIcon,
    UsersIcon,
    DocumentTextIcon,
    CogIcon,
    ArrowRightIcon,
} from '@heroicons/react/24/outline';

export default function WorkspaceDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { setSelectedWorkspace } = useWorkspaceStore();
    const [workspace, setWorkspace] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({
        contentCount: 0,
        memberCount: 0,
        brandCount: 0,
        knowledgeCount: 0,
    });

    // Fetch workspace data
    useEffect(() => {
        async function fetchWorkspace() {
            try {
                setIsLoading(true);
                const data = await api.workspaces.getById(params.id);
                setWorkspace(data);

                // In a real implementation, we would fetch these statistics from appropriate endpoints
                // For now, we'll use mock data
                setStats({
                    contentCount: Math.floor(Math.random() * 20),
                    memberCount: Math.floor(Math.random() * 5) + 1,
                    brandCount: Math.floor(Math.random() * 3),
                    knowledgeCount: Math.floor(Math.random() * 10),
                });
            } catch (error) {
                console.error('Error fetching workspace:', error);
                toast.error('Failed to load workspace');
                router.push('/dashboard/workspaces');
            } finally {
                setIsLoading(false);
            }
        }

        fetchWorkspace();
    }, [params.id, router]);

    // Handle setting active workspace
    function handleSetActive() {
        setSelectedWorkspace(workspace);
        router.push('/dashboard');
    }

    // Industry display mapping
    const industryDisplayNames: Record<string, string> = {
        'technology': 'Technology',
        'healthcare': 'Healthcare',
        'finance': 'Finance',
        'education': 'Education',
        'ecommerce': 'E-Commerce',
        'marketing': 'Marketing & Advertising',
        'media': 'Media & Entertainment',
        'food': 'Food & Beverage',
        'travel': 'Travel & Hospitality',
        'real-estate': 'Real Estate',
        'other': 'Other',
    };

    if (isLoading) {
        return (
            <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="h-40 bg-gray-100 rounded"></div>
                    <div className="h-40 bg-gray-100 rounded"></div>
                </div>
            </div>
        );
    }

    if (!workspace) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900">Workspace not found</h2>
                <p className="mt-2 text-gray-600">The workspace you're looking for doesn't exist or you don't have access to it.</p>
                <Button className="mt-6" onClick={() => router.push('/dashboard/workspaces')}>
                    Back to Workspaces
                </Button>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">{workspace.name}</h1>
                    <p className="text-gray-600 mt-1">
                        {workspace.industry ? industryDisplayNames[workspace.industry] || workspace.industry : 'No industry specified'}
                    </p>
                </div>
                <div className="flex space-x-3">
                    <Button variant="outline" onClick={() => router.push(`/dashboard/workspaces/${params.id}/settings`)}>
                        <CogIcon className="h-5 w-5 mr-2" />
                        Settings
                    </Button>
                    <Button onClick={handleSetActive}>
                        Set as Active
                        <ArrowRightIcon className="h-5 w-5 ml-2" />
                    </Button>
                </div>
            </div>

            {workspace.description && (
                <Card className="mb-6">
                    <CardContent className="p-4">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
                        <p className="text-gray-800">{workspace.description}</p>
                    </CardContent>
                </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg mr-3">
                                <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Content</p>
                                <p className="text-2xl font-semibold">{stats.contentCount}</p>
                            </div>
                        </div>
                        <Button
                            variant="link"
                            className="text-blue-600 hover:text-blue-800 p-0 h-auto mt-2"
                            onClick={() => {
                                setSelectedWorkspace(workspace);
                                router.push('/dashboard/content');
                            }}
                        >
                            View Content
                            <ArrowRightIcon className="h-4 w-4 ml-1" />
                        </Button>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg mr-3">
                                <UsersIcon className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Team Members</p>
                                <p className="text-2xl font-semibold">{stats.memberCount}</p>
                            </div>
                        </div>
                        <Button
                            variant="link"
                            className="text-green-600 hover:text-green-800 p-0 h-auto mt-2"
                            onClick={() => router.push(`/dashboard/workspaces/${params.id}/settings?tab=members`)}
                        >
                            Manage Team
                            <ArrowRightIcon className="h-4 w-4 ml-1" />
                        </Button>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg mr-3">
                                <BuildingOfficeIcon className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Brand Profiles</p>
                                <p className="text-2xl font-semibold">{stats.brandCount}</p>
                            </div>
                        </div>
                        <Button
                            variant="link"
                            className="text-purple-600 hover:text-purple-800 p-0 h-auto mt-2"
                            onClick={() => {
                                setSelectedWorkspace(workspace);
                                router.push('/dashboard/brand');
                            }}
                        >
                            Manage Brands
                            <ArrowRightIcon className="h-4 w-4 ml-1" />
                        </Button>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                        <div className="flex items-center">
                            <div className="p-2 bg-amber-100 rounded-lg mr-3">
                                <DocumentTextIcon className="h-6 w-6 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Knowledge Files</p>
                                <p className="text-2xl font-semibold">{stats.knowledgeCount}</p>
                            </div>
                        </div>
                        <Button
                            variant="link"
                            className="text-amber-600 hover:text-amber-800 p-0 h-auto mt-2"
                            onClick={() => {
                                setSelectedWorkspace(workspace);
                                router.push('/dashboard/knowledge');
                            }}
                        >
                            View Knowledge
                            <ArrowRightIcon className="h-4 w-4 ml-1" />
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {/* In a real implementation, we would fetch and display recent activity */}
                        {/* For now, we'll display a message */}
                        <p className="text-center py-6 text-gray-500">
                            Activity tracking will be implemented in a future update.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 