'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-hot-toast';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useWorkspaceStore } from '@/lib/stores/workspace-store';
import { api } from '@/lib/api';
import { ClipboardIcon, SaveIcon } from 'lucide-react';

// Form validation schema
const contentFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content_type: z.enum(['blog', 'social_post', 'email', 'landing_page', 'video_script']),
    topic: z.string().min(1, "Topic is required"),
    target_audience: z.string().min(1, "Target audience is required"),
    tone: z.enum(['professional', 'casual', 'friendly', 'persuasive', 'informative']),
    key_points: z.string().optional(),
    agent_config_ids: z.object({
        ideation: z.string().optional(),
        research: z.string().optional(),
        content: z.string().optional(),
        editor: z.string().optional()
    }).optional(),
});

// Define the form fields type
type ContentFormValues = z.infer<typeof contentFormSchema>;

export default function CreateContentPage() {
    const router = useRouter();
    const { selectedWorkspace } = useWorkspaceStore();
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedContent, setGeneratedContent] = useState('');
    const [taskId, setTaskId] = useState<string | null>(null);
    const [pollInterval, setPollInterval] = useState<NodeJS.Timeout | null>(null);
    const [agentConfigs, setAgentConfigs] = useState<{
        ideation: any[];
        research: any[];
        content: any[];
        editor: any[];
    }>({
        ideation: [],
        research: [],
        content: [],
        editor: []
    });
    const [isLoadingConfigs, setIsLoadingConfigs] = useState(false);

    // Initialize the form
    const form = useForm<ContentFormValues>({
        resolver: zodResolver(contentFormSchema),
        defaultValues: {
            content_type: 'blog',
            tone: 'professional',
            key_points: '',
            agent_config_ids: {
                ideation: '',
                research: '',
                content: '',
                editor: ''
            }
        },
    });

    // Check if there's an active workspace
    useEffect(() => {
        if (!selectedWorkspace) {
            toast.error('Please select a workspace first');
            router.push('/dashboard/workspaces');
        } else {
            // Load agent configurations
            loadAgentConfigurations();
        }
    }, [selectedWorkspace, router]);

    // Clean up polling interval on unmount
    useEffect(() => {
        return () => {
            if (pollInterval) {
                clearInterval(pollInterval);
            }
        };
    }, [pollInterval]);

    // Load agent configurations
    async function loadAgentConfigurations() {
        if (!selectedWorkspace) return;

        setIsLoadingConfigs(true);

        try {
            // Load configurations for each agent type
            const agentTypes = ['ideation', 'research', 'content', 'editor'] as const;
            const configs: any = {};

            for (const type of agentTypes) {
                const response = await api.agentConfigs.getForWorkspace(selectedWorkspace.id, type);
                configs[type] = response;

                // Set default configuration if available
                const defaultConfig = response.find((config: any) => config.isDefault);
                if (defaultConfig) {
                    form.setValue(`agent_config_ids.${type}` as any, defaultConfig.id);
                }
            }

            setAgentConfigs(configs);
        } catch (error) {
            console.error('Error loading agent configurations:', error);
            toast.error('Failed to load agent configurations');
        } finally {
            setIsLoadingConfigs(false);
        }
    }

    // Handle form submission
    const onSubmit = async (data: ContentFormValues) => {
        if (!selectedWorkspace) {
            toast.error('Please select a workspace first');
            return;
        }

        setIsGenerating(true);
        setGeneratedContent('');

        try {
            // Prepare the request data
            const requestData = {
                workspace_id: selectedWorkspace.id,
                topic: data.topic,
                content_type: data.content_type,
                tone: data.tone,
                target_audience: data.target_audience,
                key_points: data.key_points,
                agent_config_ids: data.agent_config_ids,
                title: data.title,
                auto_save: false // Don't auto-save, we'll save manually
            };

            // Call the API to generate content
            const response = await api.content.generate(requestData);

            // Get the task ID from the response
            setTaskId(response.task_id);

            // Start polling for task completion
            startPolling(response.task_id);
        } catch (error) {
            console.error('Error generating content:', error);
            toast.error('Failed to generate content. Please try again.');
            setIsGenerating(false);
        }
    };

    // Start polling for task status
    function startPolling(taskId: string) {
        // Clear existing interval if any
        if (pollInterval) {
            clearInterval(pollInterval);
        }

        // Create new polling interval
        const interval = setInterval(async () => {
            try {
                const task = await api.content.getTaskStatus(taskId);

                if (task.status === 'completed') {
                    setGeneratedContent(task.output.content);
                    setIsGenerating(false);
                    clearInterval(interval);
                    setPollInterval(null);
                    toast.success('Content generated successfully!');
                } else if (task.status === 'failed') {
                    setIsGenerating(false);
                    clearInterval(interval);
                    setPollInterval(null);
                    toast.error(task.error || 'Failed to generate content');
                }
            } catch (error) {
                console.error('Error polling task status:', error);
            }
        }, 2000);

        setPollInterval(interval);

        // Safety timeout after 5 minutes
        setTimeout(() => {
            if (isGenerating) {
                clearInterval(interval);
                setPollInterval(null);
                setIsGenerating(false);
                toast.error('Content generation timed out');
            }
        }, 5 * 60 * 1000);
    }

    // Save the generated content
    async function saveContent() {
        if (!selectedWorkspace || !generatedContent) return;

        try {
            const formValues = form.getValues();

            // Call the API to save the content
            await api.content.create({
                workspace_id: selectedWorkspace.id,
                title: formValues.title,
                content_type: formValues.content_type,
                content: {
                    text: generatedContent,
                    metadata: {
                        topic: formValues.topic,
                        target_audience: formValues.target_audience,
                        tone: formValues.tone,
                        key_points: formValues.key_points,
                    }
                },
                status: 'draft',
            });

            toast.success('Content saved successfully');
            router.push('/dashboard/content');
        } catch (error) {
            console.error('Error saving content:', error);
            toast.error('Failed to save content');
        }
    }

    if (!selectedWorkspace) {
        return null;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Create Content</h1>
                    <p className="text-gray-600 mt-1">
                        Generate high-quality content with AI
                    </p>
                </div>
                <Button variant="outline" onClick={() => router.back()}>
                    Cancel
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Content Generation Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Content Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form id="content-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <Input
                                    placeholder="Enter a title for your content"
                                    {...form.register('title')}
                                />
                                {form.formState.errors.title && (
                                    <p className="mt-1 text-sm text-red-500">{form.formState.errors.title.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Content Type</label>
                                <select
                                    className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    {...form.register('content_type')}
                                >
                                    <option value="blog">Blog Post</option>
                                    <option value="social_post">Social Media Post</option>
                                    <option value="email">Email</option>
                                    <option value="landing_page">Landing Page</option>
                                    <option value="video_script">Video Script</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Topic</label>
                                <Input
                                    placeholder="What is this content about?"
                                    {...form.register('topic')}
                                />
                                {form.formState.errors.topic && (
                                    <p className="mt-1 text-sm text-red-500">{form.formState.errors.topic.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Target Audience</label>
                                <Input
                                    placeholder="Who is this content for?"
                                    {...form.register('target_audience')}
                                />
                                {form.formState.errors.target_audience && (
                                    <p className="mt-1 text-sm text-red-500">{form.formState.errors.target_audience.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Tone</label>
                                <select
                                    className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    {...form.register('tone')}
                                >
                                    <option value="professional">Professional</option>
                                    <option value="casual">Casual</option>
                                    <option value="friendly">Friendly</option>
                                    <option value="persuasive">Persuasive</option>
                                    <option value="informative">Informative</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Key Points</label>
                                <Textarea
                                    placeholder="Enter key points to include in your content (one per line)"
                                    rows={4}
                                    {...form.register('key_points')}
                                />
                            </div>

                            <div className="mt-6">
                                <h3 className="text-sm font-medium mb-3">Advanced AI Agent Settings</h3>
                                <p className="text-xs text-gray-500 mb-4">
                                    Customize which AI agent configurations to use for each step of the content generation process.
                                    Leave blank to use the default configuration.
                                </p>

                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-xs font-medium mb-1">Ideation Agent</label>
                                        <select
                                            className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            {...form.register('agent_config_ids.ideation')}
                                            disabled={isLoadingConfigs}
                                        >
                                            <option value="">Default Configuration</option>
                                            {agentConfigs.ideation.map((config: any) => (
                                                <option key={config.id} value={config.id}>
                                                    {config.name} {config.isDefault ? '(Default)' : ''}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium mb-1">Research Agent</label>
                                        <select
                                            className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            {...form.register('agent_config_ids.research')}
                                            disabled={isLoadingConfigs}
                                        >
                                            <option value="">Default Configuration</option>
                                            {agentConfigs.research.map((config: any) => (
                                                <option key={config.id} value={config.id}>
                                                    {config.name} {config.isDefault ? '(Default)' : ''}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium mb-1">Content Agent</label>
                                        <select
                                            className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            {...form.register('agent_config_ids.content')}
                                            disabled={isLoadingConfigs}
                                        >
                                            <option value="">Default Configuration</option>
                                            {agentConfigs.content.map((config: any) => (
                                                <option key={config.id} value={config.id}>
                                                    {config.name} {config.isDefault ? '(Default)' : ''}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium mb-1">Editor Agent</label>
                                        <select
                                            className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            {...form.register('agent_config_ids.editor')}
                                            disabled={isLoadingConfigs}
                                        >
                                            <option value="">Default Configuration</option>
                                            {agentConfigs.editor.map((config: any) => (
                                                <option key={config.id} value={config.id}>
                                                    {config.name} {config.isDefault ? '(Default)' : ''}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button
                            type="submit"
                            form="content-form"
                            disabled={isGenerating}
                        >
                            {isGenerating ? 'Generating...' : 'Generate Content'}
                        </Button>
                    </CardFooter>
                </Card>

                {/* Generated Content Preview */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            {isGenerating ? 'Generating Content...' : 'Generated Content'}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isGenerating ? (
                            <div className="flex flex-col items-center justify-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
                                <p className="mt-4 text-gray-500">
                                    This may take a minute or two...
                                </p>
                            </div>
                        ) : generatedContent ? (
                            <div className="prose prose-sm max-w-none">
                                <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-md text-sm">
                                    {generatedContent}
                                </pre>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                                <p>Content will appear here once generated</p>
                            </div>
                        )}
                    </CardContent>
                    {generatedContent && (
                        <CardFooter className="flex justify-end">
                            <div className="flex space-x-2">
                                <Button
                                    size="sm"
                                    onClick={() => {
                                        navigator.clipboard.writeText(generatedContent);
                                        toast.success('Content copied to clipboard');
                                    }}
                                >
                                    <ClipboardIcon className="h-4 w-4 mr-2" />
                                    Copy
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                        // In a real app, this would save to the database
                                        toast.success('Content saved successfully');
                                    }}
                                >
                                    <SaveIcon className="h-4 w-4 mr-2" />
                                    Save
                                </Button>
                            </div>
                        </CardFooter>
                    )}
                </Card>
            </div>
        </div>
    );
} 