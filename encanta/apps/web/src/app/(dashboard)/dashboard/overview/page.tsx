"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useWorkspaceStore } from '@/lib/stores/workspace-store';
import { PlusIcon, BarChart3Icon, FileTextIcon, UsersIcon } from 'lucide-react';
import Link from 'next/link';

// Define types for our data
interface ContentItem {
    id: string;
    title: string;
    type: string;
    date: string;
}

interface ActivityItem {
    id: string;
    action: string;
    user: string;
    date: string;
}

interface DashboardStats {
    contentCount: number;
    recentContent: ContentItem[];
    teamMembers: number;
    workspaceActivity: ActivityItem[];
}

export default function DashboardOverviewPage() {
    const { selectedWorkspace } = useWorkspaceStore();
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState<DashboardStats>({
        contentCount: 0,
        recentContent: [],
        teamMembers: 0,
        workspaceActivity: []
    });

    useEffect(() => {
        // Simulate loading data
        const timer = setTimeout(() => {
            setStats({
                contentCount: 12,
                recentContent: [
                    { id: '1', title: 'Blog Post: 10 Ways to Improve Your Content Strategy', type: 'blog', date: '2025-03-15' },
                    { id: '2', title: 'Email Campaign: Spring Sale Announcement', type: 'email', date: '2025-03-14' },
                    { id: '3', title: 'Social Media Post: Product Launch', type: 'social_post', date: '2025-03-13' }
                ],
                teamMembers: 3,
                workspaceActivity: [
                    { id: '1', action: 'Created content', user: 'John Doe', date: '2025-03-15T14:30:00Z' },
                    { id: '2', action: 'Updated brand profile', user: 'Jane Smith', date: '2025-03-14T10:15:00Z' },
                    { id: '3', action: 'Added team member', user: 'John Doe', date: '2025-03-13T09:45:00Z' }
                ]
            });
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (!selectedWorkspace) {
        return (
            <div className="p-8 text-center">
                <p className="text-gray-500 mb-4">Please select a workspace to view your dashboard.</p>
                <Link href="/dashboard/workspaces">
                    <Button>Go to Workspaces</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <Link href="/dashboard/content/create">
                    <Button>
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Create Content
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Content</CardTitle>
                        <FileTextIcon className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{isLoading ? '...' : stats.contentCount}</div>
                        <p className="text-xs text-gray-500 mt-1">Across all content types</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                        <UsersIcon className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{isLoading ? '...' : stats.teamMembers}</div>
                        <p className="text-xs text-gray-500 mt-1">Active in this workspace</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Workspace Activity</CardTitle>
                        <BarChart3Icon className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{isLoading ? '...' : stats.workspaceActivity.length}</div>
                        <p className="text-xs text-gray-500 mt-1">Actions in the last 7 days</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="py-6 text-center text-gray-500">Loading...</div>
                        ) : stats.recentContent.length > 0 ? (
                            <div className="space-y-4">
                                {stats.recentContent.map((content) => (
                                    <div key={content.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                                        <div>
                                            <p className="font-medium text-sm">{content.title}</p>
                                            <p className="text-xs text-gray-500">
                                                {content.type === 'blog' ? 'Blog Post' :
                                                    content.type === 'email' ? 'Email Campaign' :
                                                        content.type === 'social_post' ? 'Social Media Post' :
                                                            content.type}
                                            </p>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {new Date(content.date).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-6 text-center text-gray-500">
                                <p>No content created yet</p>
                                <Link href="/dashboard/content/create">
                                    <Button variant="outline" className="mt-2">
                                        Create Your First Content
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="py-6 text-center text-gray-500">Loading...</div>
                        ) : stats.workspaceActivity.length > 0 ? (
                            <div className="space-y-4">
                                {stats.workspaceActivity.map((activity) => (
                                    <div key={activity.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                                        <div>
                                            <p className="font-medium text-sm">{activity.action}</p>
                                            <p className="text-xs text-gray-500">by {activity.user}</p>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {new Date(activity.date).toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-6 text-center text-gray-500">
                                <p>No recent activity</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 