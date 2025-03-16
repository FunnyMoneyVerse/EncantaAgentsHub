'use client';

import { useWorkspaceStore } from '@/lib/stores/workspace-store';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function AgentsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { selectedWorkspace } = useWorkspaceStore();
    const router = useRouter();

    if (!selectedWorkspace) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8">
                <h1 className="text-2xl font-bold mb-4">Workspace Required</h1>
                <p className="text-gray-500 mb-6 text-center max-w-md">
                    You need to select a workspace before you can manage agent configurations.
                    Agent configurations are specific to each workspace.
                </p>
                <Button onClick={() => router.push('/dashboard/workspaces')}>
                    Go to Workspaces
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-6 px-4 max-w-6xl">
            {children}
        </div>
    );
} 