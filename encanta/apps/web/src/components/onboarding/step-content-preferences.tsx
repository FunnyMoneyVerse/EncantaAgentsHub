'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useOnboardingStore } from '@/stores/onboarding-store';
import { toast } from 'react-hot-toast';
import {
    DocumentTextIcon,
    ChatBubbleLeftRightIcon,
    EnvelopeIcon,
    GlobeAltIcon,
    VideoCameraIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

// Content type options with icons
const contentTypes = [
    { id: 'blog', name: 'Blog Posts', icon: DocumentTextIcon, description: 'In-depth articles to establish thought leadership' },
    { id: 'social_post', name: 'Social Media', icon: ChatBubbleLeftRightIcon, description: 'Engaging posts for LinkedIn, Twitter, etc.' },
    { id: 'email', name: 'Email Campaigns', icon: EnvelopeIcon, description: 'Newsletters and marketing emails' },
    { id: 'landing_page', name: 'Landing Pages', icon: GlobeAltIcon, description: 'Conversion-focused web content' },
    { id: 'video_script', name: 'Video Scripts', icon: VideoCameraIcon, description: 'Scripts for video content' },
];

export function StepContentPreferences() {
    const { contentTypes: selectedContentTypes, setContentPreferences } = useOnboardingStore();
    const [selected, setSelected] = useState<string[]>(selectedContentTypes || []);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Toggle selection handler
    function toggleContentType(id: string) {
        setSelected((prev) => {
            if (prev.includes(id)) {
                return prev.filter((type) => type !== id);
            } else {
                return [...prev, id];
            }
        });
    }

    // Form submission handler
    async function handleSubmit() {
        if (selected.length === 0) {
            toast.error('Please select at least one content type');
            return;
        }

        setIsSubmitting(true);

        try {
            // Save data in store and advance to next step
            setContentPreferences(selected);

            // In a real implementation, you would save preferences in the backend here
            toast.success('Content preferences saved');
        } catch (error) {
            toast.error('Failed to save content preferences');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Content Preferences</h2>
            <p className="text-gray-600 mb-6">
                Select the types of content you're interested in creating.
                This helps us tailor your experience.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {contentTypes.map((type) => (
                    <Card
                        key={type.id}
                        className={cn(
                            "border cursor-pointer hover:border-indigo-300 hover:shadow transition-all",
                            selected.includes(type.id) ? "border-indigo-500 bg-indigo-50" : ""
                        )}
                        onClick={() => toggleContentType(type.id)}
                    >
                        <div className="p-4 flex items-start">
                            <div className={cn(
                                "flex-shrink-0 p-2 rounded-lg mr-4",
                                selected.includes(type.id) ? "bg-indigo-100" : "bg-gray-100"
                            )}>
                                <type.icon className={cn(
                                    "h-6 w-6",
                                    selected.includes(type.id) ? "text-indigo-600" : "text-gray-500"
                                )} />
                            </div>
                            <div>
                                <h3 className={cn(
                                    "font-medium",
                                    selected.includes(type.id) ? "text-indigo-700" : "text-gray-900"
                                )}>
                                    {type.name}
                                </h3>
                                <p className="text-sm text-gray-500">{type.description}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="flex justify-end">
                <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Continue'}
                </Button>
            </div>
        </div>
    );
} 