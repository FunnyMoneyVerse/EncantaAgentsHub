'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useOnboardingStore } from '@/stores/onboarding-store';
import { toast } from 'react-hot-toast';

// Validation schema
const workspaceSchema = z.object({
    workspaceName: z.string().min(1, 'Workspace name is required'),
    workspaceDescription: z.string().optional(),
    industry: z.string().optional(),
});

type WorkspaceFormValues = z.infer<typeof workspaceSchema>;

// Industry options
const industries = [
    { id: 'technology', name: 'Technology' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'finance', name: 'Finance' },
    { id: 'education', name: 'Education' },
    { id: 'ecommerce', name: 'E-Commerce' },
    { id: 'marketing', name: 'Marketing & Advertising' },
    { id: 'media', name: 'Media & Entertainment' },
    { id: 'food', name: 'Food & Beverage' },
    { id: 'travel', name: 'Travel & Hospitality' },
    { id: 'real-estate', name: 'Real Estate' },
    { id: 'other', name: 'Other' },
];

export function StepWorkspace() {
    const { workspaceName, workspaceDescription, industry, setWorkspaceDetails } = useOnboardingStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialize form
    const form = useForm<WorkspaceFormValues>({
        resolver: zodResolver(workspaceSchema),
        defaultValues: {
            workspaceName: workspaceName || '',
            workspaceDescription: workspaceDescription || '',
            industry: industry || '',
        },
    });

    // Form submission handler
    async function onSubmit(data: WorkspaceFormValues) {
        setIsSubmitting(true);

        try {
            // Save data in store and advance to next step
            setWorkspaceDetails({
                workspaceName: data.workspaceName,
                workspaceDescription: data.workspaceDescription,
                industry: data.industry,
            });

            // In a real implementation, you would create the workspace in the backend here
            toast.success('Workspace details saved');
        } catch (error) {
            toast.error('Failed to save workspace details');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Create Your Workspace</h2>
            <p className="text-gray-600 mb-6">
                A workspace is where you'll manage all your content and brand settings.
                You can create multiple workspaces later for different projects or clients.
            </p>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label htmlFor="workspaceName" className="block text-sm font-medium text-gray-700 mb-1">
                        Workspace Name*
                    </label>
                    <Input
                        id="workspaceName"
                        {...form.register('workspaceName')}
                        placeholder="My Workspace"
                    />
                    {form.formState.errors.workspaceName && (
                        <p className="mt-1 text-sm text-red-600">{form.formState.errors.workspaceName.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="workspaceDescription" className="block text-sm font-medium text-gray-700 mb-1">
                        Description (Optional)
                    </label>
                    <Textarea
                        id="workspaceDescription"
                        {...form.register('workspaceDescription')}
                        placeholder="What's this workspace for?"
                        rows={3}
                    />
                </div>

                <div>
                    <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                        Industry (Optional)
                    </label>
                    <select
                        id="industry"
                        {...form.register('industry')}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value="">Select an industry</option>
                        {industries.map((industry) => (
                            <option key={industry.id} value={industry.id}>
                                {industry.name}
                            </option>
                        ))}
                    </select>
                    <p className="mt-1 text-sm text-gray-500">
                        Selecting an industry helps us provide relevant content ideas.
                    </p>
                </div>

                <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : 'Continue'}
                    </Button>
                </div>
            </form>
        </div>
    );
} 