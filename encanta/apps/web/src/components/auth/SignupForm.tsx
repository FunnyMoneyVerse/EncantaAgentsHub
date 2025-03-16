"use client";

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// Form validation schema
const formSchema = z.object({
    name: z.string().min(2, {
        message: 'Name must be at least 2 characters.',
    }),
    email: z.string().email({
        message: 'Please enter a valid email address.',
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters.',
    }).regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter.',
    }).regex(/[0-9]/, {
        message: 'Password must contain at least one number.',
    }),
    companyName: z.string().optional(),
    marketingConsent: z.boolean().optional(),
});

export default function SignupForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialize form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            companyName: '',
            marketingConsent: false,
        },
    });

    // Handle form submission
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);

        try {
            // In a real implementation, this would call your authentication API
            console.log('Submitting signup form:', values);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Show success message and redirect (this would be handled by your auth system)
            toast.success('Account created successfully! Redirecting to onboarding...');

            // Redirect would happen here (e.g., using router.push('/onboarding'))
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Sign up failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="John Doe"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email address</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="you@example.com"
                                    type="email"
                                    autoComplete="email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="••••••••"
                                    type="password"
                                    autoComplete="new-password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                            <p className="text-xs text-gray-500 mt-1">
                                Password must be at least 8 characters with at least one uppercase letter and one number.
                            </p>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company Name (Optional)</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Your company"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="marketingConsent"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel className="font-normal text-sm text-gray-600">
                                    I agree to receive updates about new features, best practices, and special offers.
                                </FormLabel>
                            </div>
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full bg-purple-800 hover:bg-purple-900 text-white mt-6"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating account...
                        </>
                    ) : (
                        "Sign up"
                    )}
                </Button>
            </form>
        </Form>
    );
} 