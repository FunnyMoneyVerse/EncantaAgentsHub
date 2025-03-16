"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusIcon, Building2Icon } from 'lucide-react';
import Link from 'next/link';
import { useWorkspaceStore } from '@/lib/stores/workspace-store';
import { toast } from 'sonner';
import { api } from '@/lib/api';

// Match the interface from workspace-store.ts
interface Workspace {
    id: string;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
}

export default function WorkspacesPage() {
    const router = useRouter();
    const { workspaces, setWorkspaces, setSelectedWorkspace } = useWorkspaceStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchWorkspaces() {
            try {
                setIsLoading(true);
                // Fetch real workspaces from the API
                const data = await api.workspaces.getAll();
                setWorkspaces(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching workspaces:', error);
                toast.error('Failed to load workspaces');
                setIsLoading(false);
            }
        }

        fetchWorkspaces();
    }, [setWorkspaces]);

    function handleSelectWorkspace(workspace: Workspace) {
        setSelectedWorkspace(workspace);
        router.push(`/dashboard/workspaces/${workspace.id}`);
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Workspaces</h1>
                <Link href="/dashboard/workspaces/create">
                    <Button>
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Create Workspace
                    </Button>
                </Link>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="animate-pulse">
                            <CardHeader className="pb-2">
                                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </CardHeader>
                            <CardContent>
                                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            </CardContent>
                            <CardFooter>
                                <div className="h-8 bg-gray-200 rounded w-full"></div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {workspaces.map((workspace) => (
                        <Card key={workspace.id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center">
                                    <Building2Icon className="h-5 w-5 mr-2 text-primary" />
                                    {workspace.name}
                                </CardTitle>
                                <div className="text-xs text-gray-500">
                                    Created {new Date(workspace.createdAt).toLocaleDateString()}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600">
                                    {/* Display the slug as a fallback since description isn't in the interface */}
                                    {workspace.slug}
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => handleSelectWorkspace(workspace)}
                                >
                                    Select Workspace
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}

                    {workspaces.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center p-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            <Building2Icon className="h-12 w-12 text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-1">No workspaces yet</h3>
                            <p className="text-sm text-gray-500 mb-4 text-center">
                                Create your first workspace to start organizing your content.
                            </p>
                            <Link href="/dashboard/workspaces/create">
                                <Button>
                                    <PlusIcon className="h-4 w-4 mr-2" />
                                    Create Workspace
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
} 