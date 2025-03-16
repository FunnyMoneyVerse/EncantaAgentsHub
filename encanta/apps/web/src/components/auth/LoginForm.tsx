"use client";

import { useState } from 'react';
import Link from 'next/link';
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
    email: z.string().email({
        message: 'Please enter a valid email address.',
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters.',
    }),
    rememberMe: z.boolean().optional(),
});

export default function LoginForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialize form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    });

    // Handle form submission
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);

        try {
            // In a real implementation, this would call your authentication API
            console.log('Submitting login form:', values);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Show success message and redirect (this would be handled by your auth system)
            toast.success('Login successful! Redirecting to dashboard...');

            // Redirect would happen here (e.g., using router.push('/dashboard'))
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Login failed. Please check your credentials and try again.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                            <div className="flex items-center justify-between">
                                <FormLabel>Password</FormLabel>
                                <Link
                                    href="/reset-password"
                                    className="text-sm font-medium text-purple-800 hover:text-purple-700"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <FormControl>
                                <Input
                                    placeholder="••••••••"
                                    type="password"
                                    autoComplete="current-password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel className="font-normal">Remember me</FormLabel>
                            </div>
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full bg-purple-800 hover:bg-purple-900 text-white"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing in...
                        </>
                    ) : (
                        "Sign in"
                    )}
                </Button>
            </form>
        </Form>
    );
} 