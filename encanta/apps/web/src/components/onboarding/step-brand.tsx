'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useOnboardingStore } from '@/stores/onboarding-store';
import { toast } from 'react-hot-toast';

// Validation schema
const brandSchema = z.object({
    brandName: z.string().min(1, 'Brand name is required'),
    brandVoice: z.string().optional(),
    brandGuidelines: z.string().optional(),
});

type BrandFormValues = z.infer<typeof brandSchema>;

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

export function StepBrand() {
    const { brandName, brandVoice, brandGuidelines, setBrandDetails } = useOnboardingStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialize form
    const form = useForm<BrandFormValues>({
        resolver: zodResolver(brandSchema),
        defaultValues: {
            brandName: brandName || '',
            brandVoice: brandVoice || '',
            brandGuidelines: brandGuidelines || '',
        },
    });

    // Form submission handler
    async function onSubmit(data: BrandFormValues) {
        setIsSubmitting(true);

        try {
            // Save data in store and advance to next step
            setBrandDetails({
                brandName: data.brandName,
                brandVoice: data.brandVoice,
                brandGuidelines: data.brandGuidelines,
            });

            // In a real implementation, you would create the brand profile in the backend here
            toast.success('Brand details saved');
        } catch (error) {
            toast.error('Failed to save brand details');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Define Your Brand</h2>
            <p className="text-gray-600 mb-6">
                Help our AI understand your brand's voice and style to create more authentic content.
                You can refine these settings later.
            </p>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label htmlFor="brandName" className="block text-sm font-medium text-gray-700 mb-1">
                        Brand Name*
                    </label>
                    <Input
                        id="brandName"
                        {...form.register('brandName')}
                        placeholder="Your Brand Name"
                    />
                    {form.formState.errors.brandName && (
                        <p className="mt-1 text-sm text-red-600">{form.formState.errors.brandName.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="brandVoice" className="block text-sm font-medium text-gray-700 mb-1">
                        Brand Voice (Optional)
                    </label>
                    <select
                        id="brandVoice"
                        {...form.register('brandVoice')}
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
                        This helps us match your brand's personality in generated content.
                    </p>
                </div>

                <div>
                    <label htmlFor="brandGuidelines" className="block text-sm font-medium text-gray-700 mb-1">
                        Brand Guidelines (Optional)
                    </label>
                    <Textarea
                        id="brandGuidelines"
                        {...form.register('brandGuidelines')}
                        placeholder="Key messaging, values, or specific language to use or avoid"
                        rows={5}
                    />
                    <p className="mt-1 text-sm text-gray-500">
                        Include any specific terminology, phrases, or values that define your brand.
                    </p>
                </div>

                <div className="flex justify-end pt-4">
                    <Button variant="outline" type="button" onClick={() => form.reset()} className="mr-4">
                        Reset
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : 'Continue'}
                    </Button>
                </div>
            </form>
        </div>
    );
} 