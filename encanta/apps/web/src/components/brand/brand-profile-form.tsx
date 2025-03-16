'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/lib/api';
import { toast } from 'react-hot-toast';

// Validation schema
const brandProfileSchema = z.object({
    name: z.string().min(1, 'Brand name is required'),
    voice: z.string().optional(),
    guidelines_description: z.string().optional(),
    key_messages: z.string().optional(),
    logo_url: z.string().optional(),
});

type BrandProfileFormValues = z.infer<typeof brandProfileSchema>;

// Voice tone options
const voiceTones = [
    { id: 'professional', name: 'Professional' },
    { id: 'friendly', name: 'Friendly & Approachable' },
    { id: 'authoritative', name: 'Authoritative & Expert' },
    { id: 'casual', name: 'Casual & Conversational' },
    { id: 'formal', name: 'Formal & Academic' },
    { id: 'witty', name: 'Witty & Humorous' },
    { id: 'inspirational', name: 'Inspirational & Motivational' },
];

interface BrandProfileFormProps {
    workspaceId: string;
    initialData?: any;
    onSuccess: (profile: any) => void;
    onCancel: () => void;
}

export function BrandProfileForm({
    workspaceId,
    initialData,
    onSuccess,
    onCancel
}: BrandProfileFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isEditing = !!initialData;

    // Initialize form with existing data or defaults
    const form = useForm<BrandProfileFormValues>({
        resolver: zodResolver(brandProfileSchema),
        defaultValues: initialData
            ? {
                name: initialData.name,
                voice: initialData.voice || '',
                guidelines_description: initialData.guidelines?.description || '',
                key_messages: initialData.guidelines?.keyMessages || '',
                logo_url: initialData.logo_url || '',
            }
            : {
                name: '',
                voice: '',
                guidelines_description: '',
                key_messages: '',
                logo_url: '',
            },
    });

    // Form submission handler
    async function onSubmit(data: BrandProfileFormValues) {
        setIsSubmitting(true);

        try {
            // Format data for API
            const formattedData = {
                workspace_id: workspaceId,
                name: data.name,
                voice: data.voice,
                guidelines: {
                    description: data.guidelines_description,
                    keyMessages: data.key_messages,
                },
                logo_url: data.logo_url,
            };

            // Create or update profile based on whether we're editing
            let result;

            if (isEditing) {
                result = await api.brand.update(initialData.id, formattedData);
            } else {
                result = await api.brand.create(formattedData);
            }

            onSuccess(result);
            toast.success(`Brand profile ${isEditing ? 'updated' : 'created'} successfully`);

        } catch (error) {
            console.error('Error saving brand profile:', error);
            toast.error(`Failed to ${isEditing ? 'update' : 'create'} brand profile`);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Brand Name*
                </label>
                <Input
                    id="name"
                    {...form.register('name')}
                    placeholder="Your Brand Name"
                />
                {form.formState.errors.name && (
                    <p className="mt-1 text-sm text-red-600">{form.formState.errors.name.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="voice" className="block text-sm font-medium text-gray-700 mb-1">
                    Brand Voice
                </label>
                <select
                    id="voice"
                    {...form.register('voice')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                    <option value="">Select a voice tone</option>
                    {voiceTones.map((tone) => (
                        <option key={tone.id} value={tone.id}>
                            {tone.name}
                        </option>
                    ))}
                </select>
                <p className="mt-1 text-sm text-gray-500">
                    This helps our AI match your brand's personality in generated content.
                </p>
            </div>

            <div>
                <label htmlFor="guidelines_description" className="block text-sm font-medium text-gray-700 mb-1">
                    Brand Guidelines
                </label>
                <Textarea
                    id="guidelines_description"
                    {...form.register('guidelines_description')}
                    placeholder="Describe your brand's personality, values, and style"
                    rows={3}
                />
            </div>

            <div>
                <label htmlFor="key_messages" className="block text-sm font-medium text-gray-700 mb-1">
                    Key Messages
                </label>
                <Textarea
                    id="key_messages"
                    {...form.register('key_messages')}
                    placeholder="Key points your brand emphasizes, separated by new lines"
                    rows={3}
                />
            </div>

            <div>
                <label htmlFor="logo_url" className="block text-sm font-medium text-gray-700 mb-1">
                    Logo URL
                </label>
                <Input
                    id="logo_url"
                    {...form.register('logo_url')}
                    placeholder="https://example.com/logo.png"
                />
                <p className="mt-1 text-sm text-gray-500">
                    Enter a URL for your brand logo (we'll add file upload in the future)
                </p>
            </div>

            <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : isEditing ? 'Update Profile' : 'Create Profile'}
                </Button>
            </div>
        </form>
    );
} 