'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useWorkspaceStore } from '@/lib/stores/workspace-store';
import { api } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

// Define the content item type
interface ContentItem {
    id: string;
    title: string;
    content_type: string;
    status: string;
    created_at: string;
}

export default function ContentListPage() {
    const router = useRouter();
    const { selectedWorkspace } = useWorkspaceStore();
    const [content, setContent] = useState<ContentItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (!selectedWorkspace) return;

        async function fetchContent() {
            try {
                setIsLoading(true);

                // Fetch content from the API
                const contentData = await api.content.getForWorkspace(selectedWorkspace.id);
                setContent(contentData);
            } catch (error) {
                console.error('Error fetching content:', error);
                toast.error('Failed to load content');
            } finally {
                setIsLoading(false);
            }
        }

        fetchContent();
    }, [selectedWorkspace]);

    // Filter content based on search query
    const filteredContent = content.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                    <h1 className="text-3xl font-bold">Content</h1>
                    <p className="text-gray-600 mt-1">
                        Manage your content in {selectedWorkspace.name}
                    </p>
                </div>
                <Button onClick={() => router.push('/dashboard/content/create')}>
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Create Content
                </Button>
            </div>

            {/* Search and Filter */}
            <div className="mb-6">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                        type="text"
                        placeholder="Search content..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Content List */}
            <Card>
                <CardHeader>
                    <CardTitle>All Content</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="animate-pulse flex">
                                    <div className="h-12 w-12 bg-gray-200 rounded"></div>
                                    <div className="ml-4 flex-1 space-y-2 py-1">
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filteredContent.length === 0 ? (
                        <div className="text-center py-12">
                            {searchQuery ? (
                                <p className="text-gray-500">No content matches your search</p>
                            ) : (
                                <>
                                    <p className="text-gray-500 mb-4">No content created yet</p>
                                    <Button
                                        onClick={() => router.push('/dashboard/content/create')}
                                    >
                                        Create Your First Content
                                    </Button>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Title
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Type
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Created
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredContent.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-gray-50 cursor-pointer"
                                            onClick={() => router.push(`/dashboard/content/${item.id}`)}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{item.title}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500 capitalize">
                                                    {item.content_type.replace('_', ' ')}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === 'published' ? 'bg-green-100 text-green-800' :
                                                    item.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                                                        item.status === 'review' ? 'bg-blue-100 text-blue-800' :
                                                            'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(item.created_at)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        router.push(`/dashboard/content/${item.id}`);
                                                    }}
                                                >
                                                    View
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
} 