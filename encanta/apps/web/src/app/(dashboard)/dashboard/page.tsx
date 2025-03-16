'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useWorkspaceStore } from '@/lib/stores/workspace-store';
import {
    DocumentTextIcon,
    RocketLaunchIcon,
    LightBulbIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline';
import { api } from '@/lib/api';

interface ContentItem {
    id: string;
    title: string;
    content_type: string;
    status: string;
    created_at: string;
}

export default function DashboardPage() {
    const router = useRouter();
    const { selectedWorkspace } = useWorkspaceStore();
    const [recentContent, setRecentContent] = useState<ContentItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            if (!selectedWorkspace) return;

            try {
                setIsLoading(true);
                // Fetch real content from the API
                const data = await api.content.getForWorkspace(selectedWorkspace.id, {
                    limit: 5,
                    sort: 'created_at:desc'
                });
                setRecentContent(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching recent content:', error);
                setIsLoading(false);
            }
        }

        fetchData();
    }, [selectedWorkspace]);

    // If no workspace, show create workspace prompt
    if (!selectedWorkspace) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold mb-2">Welcome to Encanta!</h1>
                    <p className="text-gray-600 mb-6">
                        Get started by creating your first workspace
                    </p>
                    <Button
                        onClick={() => router.push('/dashboard/workspaces/create')}
                        size="lg"
                    >
                        Create Workspace
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Welcome to {selectedWorkspace.name}</h1>
                <p className="text-gray-600 mt-1">
                    Manage your content in the {selectedWorkspace.name} workspace
                </p>
            </div>

            {/* Quick Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 p-3 bg-blue-100 rounded-lg">
                                <DocumentTextIcon className="h-8 w-8 text-blue-600" />
                            </div>
                            <div className="ml-4">
                                <h3 className="font-medium text-lg">Create Content</h3>
                                <p className="text-gray-600 text-sm mb-3">
                                    Generate AI-powered content for your brand
                                </p>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => router.push('/dashboard/content/create')}
                                    className="mt-2"
                                >
                                    Get Started
                                    <ArrowRightIcon className="h-4 w-4 ml-2" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 p-3 bg-purple-100 rounded-lg">
                                <RocketLaunchIcon className="h-8 w-8 text-purple-600" />
                            </div>
                            <div className="ml-4">
                                <h3 className="font-medium text-lg">Manage Brand</h3>
                                <p className="text-gray-600 text-sm mb-3">
                                    Configure your brand voice and style
                                </p>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => router.push('/dashboard/brand')}
                                    className="mt-2"
                                >
                                    Configure Brand
                                    <ArrowRightIcon className="h-4 w-4 ml-2" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 p-3 bg-amber-100 rounded-lg">
                                <LightBulbIcon className="h-8 w-8 text-amber-600" />
                            </div>
                            <div className="ml-4">
                                <h3 className="font-medium text-lg">Knowledge Base</h3>
                                <p className="text-gray-600 text-sm mb-3">
                                    Upload files to enhance AI content
                                </p>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => router.push('/dashboard/knowledge')}
                                    className="mt-2"
                                >
                                    Add Knowledge
                                    <ArrowRightIcon className="h-4 w-4 ml-2" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Content */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Recent Content</CardTitle>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push('/dashboard/content')}
                        >
                            View All
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="animate-pulse flex">
                                    <div className="h-12 w-12 bg-gray-200 rounded"></div>
                                    <div className="ml-4 flex-1 space-y-2 py-1">
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : recentContent.length === 0 ? (
                        <div className="text-center py-6">
                            <p className="text-gray-500 mb-4">No content created yet</p>
                            <Button
                                onClick={() => router.push('/dashboard/content/create')}
                            >
                                Create Your First Content
                            </Button>
                        </div>
                    ) : (
                        <div className="divide-y">
                            {recentContent.map((content: any) => (
                                <div key={content.id} className="py-4 flex justify-between items-center">
                                    <div>
                                        <h4 className="font-medium">{content.title}</h4>
                                        <div className="flex items-center text-sm text-gray-500 mt-1">
                                            <span className="capitalize">{content.content_type.replace('_', ' ')}</span>
                                            <span className="mx-2">•</span>
                                            <span>{content.created_at}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${content.status === 'published' ? 'bg-green-100 text-green-800' :
                                            content.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                            {content.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
} 