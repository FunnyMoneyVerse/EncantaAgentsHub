"use client";

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

// Form validation schema
const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    company: z.string().optional(),
    inquiry: z.string({
        required_error: "Please select an inquiry type.",
    }),
    message: z.string().min(10, {
        message: "Message must be at least 10 characters.",
    }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialize form
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            company: "",
            inquiry: "",
            message: "",
        },
    });

    // Handle form submission
    async function onSubmit(values: FormValues) {
        setIsSubmitting(true);

        try {
            // In a real implementation, this would send the form data to your backend
            console.log("Form submitted:", values);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Show success message
            toast.success("Your message has been sent successfully. We'll be in touch soon!");

            // Reset form
            form.reset();
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("There was an error sending your message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
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
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="john@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company (Optional)</FormLabel>
                            <FormControl>
                                <Input placeholder="Your company name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="inquiry"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Inquiry Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select inquiry type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="general">General Inquiry</SelectItem>
                                    <SelectItem value="sales">Sales Question</SelectItem>
                                    <SelectItem value="support">Customer Support</SelectItem>
                                    <SelectItem value="enterprise">Enterprise Solutions</SelectItem>
                                    <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="How can we help you?"
                                    rows={5}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
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
                            Sending...
                        </>
                    ) : (
                        "Send Message"
                    )}
                </Button>
            </form>
        </Form>
    );
} 