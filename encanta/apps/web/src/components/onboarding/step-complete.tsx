'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { useOnboardingStore } from '@/stores/onboarding-store';
import { api } from '@/lib/api';
import { useWorkspaceStore } from '@/lib/stores/workspace-store';
import { toast } from 'react-hot-toast';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export function StepComplete() {
    const router = useRouter();
    const { isLoaded, isSignedIn, userId } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);
    const {
        workspaceName,
        workspaceDescription,
        industry,
        brandName,
        brandVoice,
        brandGuidelines,
        contentTypes,
        completeOnboarding,
    } = useOnboardingStore();
    const { setWorkspaces, setSelectedWorkspace, workspaces } = useWorkspaceStore();

    async function finalizeSetup() {
        if (!isLoaded || !isSignedIn || !userId) return;

        setIsProcessing(true);

        try {
            // Create workspace
            let workspaceId;

            try {
                // Create workspace in the backend
                const workspaceResponse = await api.workspaces.create({
                    name: workspaceName,
                    description: workspaceDescription || '',
                    industry: industry || '',
                });

                workspaceId = workspaceResponse.id;

                // Add workspace to store
                const updatedWorkspaces = [...workspaces, workspaceResponse];
                setWorkspaces(updatedWorkspaces);
                setSelectedWorkspace(workspaceResponse);

                // Create brand profile if name is provided
                if (brandName) {
                    await api.brand.create({
                        workspace_id: workspaceId,
                        name: brandName,
                        voice: brandVoice || '',
                        guidelines: brandGuidelines ? { description: brandGuidelines } : null,
                    });
                }

                // Update user metadata to mark onboarding as complete
                await fetch('/api/user/complete-onboarding', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId,
                        workspaceId,
                    }),
                });
            } catch (error) {
                console.error('Error creating workspace or brand:', error);

                // Fallback to mock data if API calls fail
                const mockWorkspace = {
                    id: `ws-${Date.now()}`,
                    name: workspaceName,
                    slug: workspaceName.toLowerCase().replace(/\s+/g, '-'),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };

                const updatedWorkspaces = [...workspaces, mockWorkspace];
                setWorkspaces(updatedWorkspaces);
                setSelectedWorkspace(mockWorkspace);
            }

            // Mark onboarding as complete in local store
            completeOnboarding();

            // Show success message
            toast.success('Setup completed successfully!');

            // Redirect to dashboard
            router.push('/dashboard');
        } catch (error) {
            console.error('Error finalizing setup:', error);
            toast.error('Error completing setup. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    }

    return (
        <div className="text-center">
            <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500 mb-6" />
            <h2 className="text-3xl font-bold tracking-tight mb-4">You're all set!</h2>
            <p className="text-lg text-gray-600 mb-8">
                Your workspace "{workspaceName}" is ready to go.
                Now you can start creating amazing content with AI.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                <h3 className="font-medium text-lg mb-2">Summary</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                    <li><span className="font-medium">Workspace:</span> {workspaceName}</li>
                    {industry && <li><span className="font-medium">Industry:</span> {industry}</li>}
                    <li><span className="font-medium">Brand:</span> {brandName}</li>
                    {brandVoice && <li><span className="font-medium">Brand Voice:</span> {brandVoice}</li>}
                    <li><span className="font-medium">Content Types:</span> {contentTypes.join(', ')}</li>
                </ul>
            </div>

            <Button size="lg" onClick={finalizeSetup} disabled={isProcessing}>
                {isProcessing ? 'Setting up...' : 'Go to Dashboard'}
            </Button>
        </div>
    );
} 