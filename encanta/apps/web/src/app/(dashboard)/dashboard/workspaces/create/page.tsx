"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useWorkspaceStore } from '@/lib/stores/workspace-store';
import { toast } from 'sonner';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

// Form validation schema
const workspaceFormSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters").max(50, "Name must be less than 50 characters"),
    slug: z.string().min(3, "Slug must be at least 3 characters").max(50, "Slug must be less than 50 characters")
        .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens")
});

type WorkspaceFormValues = z.infer<typeof workspaceFormSchema>;

export default function CreateWorkspacePage() {
    const router = useRouter();
    const { setWorkspaces, workspaces, setSelectedWorkspace } = useWorkspaceStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<WorkspaceFormValues>({
        resolver: zodResolver(workspaceFormSchema),
        defaultValues: {
            name: '',
            slug: ''
        }
    });

    // Auto-generate slug from name
    const watchName = form.watch('name');
    const generateSlug = (name: string) => {
        return name.toLowerCase()
            .replace(/\s+/g, '-')        // Replace spaces with hyphens
            .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
            .replace(/\-\-+/g, '-')      // Replace multiple hyphens with single hyphen
            .replace(/^-+/, '')          // Trim hyphens from start
            .replace(/-+$/, '');         // Trim hyphens from end
    };

    // Update slug when name changes if slug is empty or was auto-generated
    const currentSlug = form.getValues('slug');
    if (watchName && (!currentSlug || currentSlug === generateSlug(form.getValues('name').slice(0, -1)))) {
        form.setValue('slug', generateSlug(watchName));
    }

    async function onSubmit(data: WorkspaceFormValues) {
        try {
            setIsSubmitting(true);

            // In a real app, you would send this to your API
            // For now, we'll just simulate a successful creation
            setTimeout(() => {
                const newWorkspace = {
                    id: Math.random().toString(36).substring(2, 9), // Generate a random ID
                    name: data.name,
                    slug: data.slug,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };

                // Add the new workspace to the store
                setWorkspaces([...workspaces, newWorkspace]);

                // Set it as the selected workspace
                setSelectedWorkspace(newWorkspace);

                toast.success('Workspace created successfully');
                router.push(`/dashboard/workspaces/${newWorkspace.id}`);
            }, 1000);
        } catch (error) {
            console.error('Error creating workspace:', error);
            toast.error('Failed to create workspace');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Link href="/dashboard/workspaces" className="mr-4">
                        <Button variant="ghost" size="icon">
                            <ArrowLeftIcon className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold">Create Workspace</h1>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Workspace Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Workspace Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="My Awesome Workspace" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Workspace Slug</FormLabel>
                                        <FormControl>
                                            <Input placeholder="my-awesome-workspace" {...field} />
                                        </FormControl>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Used in URLs and API calls. Only lowercase letters, numbers, and hyphens.
                                        </p>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end">
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Creating...' : 'Create Workspace'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
} 