"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useWorkspaceStore } from '@/lib/stores/workspace-store';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { SaveIcon, UploadIcon } from 'lucide-react';

interface BrandProfile {
    id?: string;
    name: string;
    voice: string;
    guidelines: {
        tone?: string;
        style?: string;
        keywords?: string[];
        avoidWords?: string[];
    };
    colorPalette: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
    };
    logoUrl?: string;
    [key: string]: any; // Add index signature to allow dynamic property access
}

export default function BrandProfilePage() {
    const params = useParams();
    const workspaceId = params.id as string;
    const { getWorkspaceById } = useWorkspaceStore();
    const workspace = getWorkspaceById(workspaceId);

    const [brandProfile, setBrandProfile] = useState<BrandProfile>({
        name: workspace?.name || '',
        voice: '',
        guidelines: {
            tone: '',
            style: '',
            keywords: [],
            avoidWords: []
        },
        colorPalette: {
            primary: '#6A0DAD', // Majestic Purple default
            secondary: '#1C1C1C', // Midnight Black default
            accent: '#00B4D8', // Vibrant Teal default
            background: '#F5F5F5' // Pearl White default
        }
    });

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [keywordsInput, setKeywordsInput] = useState('');
    const [avoidWordsInput, setAvoidWordsInput] = useState('');

    useEffect(() => {
        if (workspace) {
            fetchBrandProfile();
        } else {
            setIsLoading(false);
        }
    }, [workspace]);

    async function fetchBrandProfile() {
        try {
            setIsLoading(true);
            // In a real app, you would fetch the brand profile from the API
            // For now, we'll just simulate loading with mock data
            setTimeout(() => {
                const mockBrandProfile: BrandProfile = {
                    id: '1',
                    name: workspace?.name || '',
                    voice: 'Professional and authoritative, but approachable',
                    guidelines: {
                        tone: 'Confident and knowledgeable',
                        style: 'Clear, concise, and jargon-free',
                        keywords: ['innovative', 'reliable', 'expert', 'solution'],
                        avoidWords: ['cheap', 'basic', 'simple']
                    },
                    colorPalette: {
                        primary: '#6A0DAD',
                        secondary: '#1C1C1C',
                        accent: '#00B4D8',
                        background: '#F5F5F5'
                    },
                    logoUrl: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=200&h=200&fit=crop'
                };

                setBrandProfile(mockBrandProfile);
                setKeywordsInput(mockBrandProfile.guidelines.keywords?.join(', ') || '');
                setAvoidWordsInput(mockBrandProfile.guidelines.avoidWords?.join(', ') || '');
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            console.error('Error fetching brand profile:', error);
            toast.error('Failed to load brand profile');
            setIsLoading(false);
        }
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;

        if (name.includes('.')) {
            const [section, field] = name.split('.');
            setBrandProfile(prev => ({
                ...prev,
                [section]: {
                    ...prev[section as keyof BrandProfile],
                    [field]: value
                }
            }));
        } else {
            setBrandProfile(prev => ({
                ...prev,
                [name]: value
            }));
        }
    }

    function handleColorChange(colorKey: string, value: string) {
        setBrandProfile(prev => ({
            ...prev,
            colorPalette: {
                ...prev.colorPalette,
                [colorKey]: value
            }
        }));
    }

    function handleKeywordsChange(e: React.ChangeEvent<HTMLInputElement>) {
        setKeywordsInput(e.target.value);
        const keywords = e.target.value.split(',').map(word => word.trim()).filter(Boolean);

        setBrandProfile(prev => ({
            ...prev,
            guidelines: {
                ...prev.guidelines,
                keywords
            }
        }));
    }

    function handleAvoidWordsChange(e: React.ChangeEvent<HTMLInputElement>) {
        setAvoidWordsInput(e.target.value);
        const avoidWords = e.target.value.split(',').map(word => word.trim()).filter(Boolean);

        setBrandProfile(prev => ({
            ...prev,
            guidelines: {
                ...prev.guidelines,
                avoidWords
            }
        }));
    }

    async function handleSave() {
        try {
            setIsSaving(true);

            // In a real app, you would send this to your API
            // For now, we'll just simulate a successful save
            setTimeout(() => {
                toast.success('Brand profile saved successfully');
                setIsSaving(false);
            }, 1000);
        } catch (error) {
            console.error('Error saving brand profile:', error);
            toast.error('Failed to save brand profile');
            setIsSaving(false);
        }
    }

    if (!workspace) {
        return (
            <div className="p-8 text-center">
                <p className="text-gray-500 mb-4">Workspace not found.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Brand Profile</h1>
                <Button onClick={handleSave} disabled={isSaving}>
                    <SaveIcon className="h-4 w-4 mr-2" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>

            {isLoading ? (
                <div className="space-y-6">
                    <Card className="animate-pulse">
                        <CardHeader>
                            <div className="h-7 bg-gray-200 rounded w-1/4 mb-2"></div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="h-10 bg-gray-200 rounded w-full"></div>
                            <div className="h-10 bg-gray-200 rounded w-full"></div>
                            <div className="h-10 bg-gray-200 rounded w-full"></div>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <Tabs defaultValue="voice">
                    <TabsList className="mb-6">
                        <TabsTrigger value="voice">Brand Voice</TabsTrigger>
                        <TabsTrigger value="colors">Color Palette</TabsTrigger>
                        <TabsTrigger value="logo">Logo</TabsTrigger>
                    </TabsList>

                    <TabsContent value="voice" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Brand Voice & Tone</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="voice">Brand Voice</Label>
                                    <Textarea
                                        id="voice"
                                        name="voice"
                                        value={brandProfile.voice}
                                        onChange={handleInputChange}
                                        placeholder="Describe your brand's voice (e.g., professional, friendly, authoritative)"
                                        className="min-h-[100px]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="guidelines.tone">Tone</Label>
                                    <Input
                                        id="guidelines.tone"
                                        name="guidelines.tone"
                                        value={brandProfile.guidelines.tone || ''}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Confident, Casual, Formal"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="guidelines.style">Writing Style</Label>
                                    <Input
                                        id="guidelines.style"
                                        name="guidelines.style"
                                        value={brandProfile.guidelines.style || ''}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Concise, Detailed, Conversational"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="keywords">Keywords (comma separated)</Label>
                                    <Input
                                        id="keywords"
                                        value={keywordsInput}
                                        onChange={handleKeywordsChange}
                                        placeholder="e.g., innovative, reliable, expert"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="avoidWords">Words to Avoid (comma separated)</Label>
                                    <Input
                                        id="avoidWords"
                                        value={avoidWordsInput}
                                        onChange={handleAvoidWordsChange}
                                        placeholder="e.g., cheap, basic, simple"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="colors" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Color Palette</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="primary-color">Primary Color</Label>
                                        <div className="flex items-center space-x-2">
                                            <div
                                                className="w-10 h-10 rounded border"
                                                style={{ backgroundColor: brandProfile.colorPalette.primary }}
                                            ></div>
                                            <Input
                                                id="primary-color"
                                                type="text"
                                                value={brandProfile.colorPalette.primary}
                                                onChange={(e) => handleColorChange('primary', e.target.value)}
                                            />
                                            <Input
                                                type="color"
                                                value={brandProfile.colorPalette.primary}
                                                onChange={(e) => handleColorChange('primary', e.target.value)}
                                                className="w-10 h-10 p-1"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="secondary-color">Secondary Color</Label>
                                        <div className="flex items-center space-x-2">
                                            <div
                                                className="w-10 h-10 rounded border"
                                                style={{ backgroundColor: brandProfile.colorPalette.secondary }}
                                            ></div>
                                            <Input
                                                id="secondary-color"
                                                type="text"
                                                value={brandProfile.colorPalette.secondary}
                                                onChange={(e) => handleColorChange('secondary', e.target.value)}
                                            />
                                            <Input
                                                type="color"
                                                value={brandProfile.colorPalette.secondary}
                                                onChange={(e) => handleColorChange('secondary', e.target.value)}
                                                className="w-10 h-10 p-1"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="accent-color">Accent Color</Label>
                                        <div className="flex items-center space-x-2">
                                            <div
                                                className="w-10 h-10 rounded border"
                                                style={{ backgroundColor: brandProfile.colorPalette.accent }}
                                            ></div>
                                            <Input
                                                id="accent-color"
                                                type="text"
                                                value={brandProfile.colorPalette.accent}
                                                onChange={(e) => handleColorChange('accent', e.target.value)}
                                            />
                                            <Input
                                                type="color"
                                                value={brandProfile.colorPalette.accent}
                                                onChange={(e) => handleColorChange('accent', e.target.value)}
                                                className="w-10 h-10 p-1"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="background-color">Background Color</Label>
                                        <div className="flex items-center space-x-2">
                                            <div
                                                className="w-10 h-10 rounded border"
                                                style={{ backgroundColor: brandProfile.colorPalette.background }}
                                            ></div>
                                            <Input
                                                id="background-color"
                                                type="text"
                                                value={brandProfile.colorPalette.background}
                                                onChange={(e) => handleColorChange('background', e.target.value)}
                                            />
                                            <Input
                                                type="color"
                                                value={brandProfile.colorPalette.background}
                                                onChange={(e) => handleColorChange('background', e.target.value)}
                                                className="w-10 h-10 p-1"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <h3 className="text-lg font-medium mb-4">Preview</h3>
                                    <div
                                        className="p-6 rounded-lg border"
                                        style={{ backgroundColor: brandProfile.colorPalette.background }}
                                    >
                                        <div
                                            className="p-4 rounded-md mb-4"
                                            style={{ backgroundColor: brandProfile.colorPalette.primary, color: '#ffffff' }}
                                        >
                                            Primary Color
                                        </div>
                                        <div
                                            className="p-4 rounded-md mb-4"
                                            style={{ backgroundColor: brandProfile.colorPalette.secondary, color: '#ffffff' }}
                                        >
                                            Secondary Color
                                        </div>
                                        <div
                                            className="p-4 rounded-md"
                                            style={{ backgroundColor: brandProfile.colorPalette.accent, color: '#ffffff' }}
                                        >
                                            Accent Color
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="logo" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Logo</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg">
                                    {brandProfile.logoUrl ? (
                                        <div className="space-y-4 text-center">
                                            <img
                                                src={brandProfile.logoUrl}
                                                alt="Brand Logo"
                                                className="w-40 h-40 object-contain mx-auto"
                                            />
                                            <Button variant="outline" onClick={() => setBrandProfile(prev => ({ ...prev, logoUrl: undefined }))}>
                                                Remove Logo
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4 text-center">
                                            <div className="w-40 h-40 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
                                                <UploadIcon className="h-12 w-12 text-gray-400" />
                                            </div>
                                            <div>
                                                <Button>
                                                    <UploadIcon className="h-4 w-4 mr-2" />
                                                    Upload Logo
                                                </Button>
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                Recommended size: 400x400px. Max file size: 2MB.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            )}
        </div>
    );
} 