"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

// FAQ data
const faqItems = [
    {
        question: "What is Encanta?",
        answer: "Encanta is an AI-powered content platform that combines advanced AI technology with strategic marketing expertise. It enables startups and SMEs to produce professional, strategically aligned content without needing specialized marketing knowledge or technical AI skills."
    },
    {
        question: "How does the free trial work?",
        answer: "Our 14-day free trial gives you full access to all features of your selected plan with no credit card required. You can create content, set up your brand voice, and explore all the platform capabilities. At the end of the trial, you can choose to subscribe or downgrade to our free plan."
    },
    {
        question: "Can I change plans later?",
        answer: "Yes, you can upgrade, downgrade, or cancel your plan at any time. When upgrading, you'll get immediate access to the new features and be charged the prorated difference. When downgrading, the change will take effect at the end of your current billing cycle."
    },
    {
        question: "What counts as a 'content piece'?",
        answer: "A content piece can be a blog post, social media post, email, product description, or any other type of content you create using Encanta. The length of the content doesn't matter - whether it's a short tweet or a 2,000-word blog post, it counts as one piece."
    },
    {
        question: "How does the AI workflow process work?",
        answer: "Our AI workflow consists of four specialized agents: Ideation (generates content concepts), Research (gathers relevant facts and insights), Content (produces well-structured content), and Editor (refines and polishes the content). These agents work together to create high-quality, strategic content aligned with your brand voice and goals."
    },
    {
        question: "Can I collaborate with my team?",
        answer: "Yes, our Pro and Business plans include team collaboration features. You can invite team members, assign roles and permissions, and work together on content in real-time with commenting and collaborative editing capabilities."
    },
    {
        question: "What is brand voice customization?",
        answer: "Brand voice customization allows you to define and maintain a consistent tone, style, and messaging across all your content. Our platform analyzes your existing content and preferences through an interactive assessment, then ensures all AI-generated content matches your unique brand voice."
    },
    {
        question: "Do you offer refunds?",
        answer: "We offer a 30-day money-back guarantee for annual subscriptions. If you're not satisfied with Encanta within the first 30 days, contact our support team for a full refund. Monthly subscriptions can be canceled at any time but are not eligible for refunds."
    },
    {
        question: "What kind of support do you offer?",
        answer: "All plans include email support. The Free plan has standard support with responses within 48 hours. Pro plan users get priority email support with responses within 24 hours. Business plan users receive dedicated support with a personal account manager and phone support."
    },
    {
        question: "Do you offer custom enterprise plans?",
        answer: (
            <>
                Yes, for larger teams or organizations with specific needs, we offer custom enterprise plans with tailored features, dedicated support, and flexible billing options. Please{" "}
                <Link href="/contact" className="text-purple-800 hover:text-purple-700 underline">
                    contact our sales team
                </Link>{" "}
                to discuss your requirements.
            </>
        )
    }
];

export default function FAQ() {
    return (
        <div className="w-full max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left font-medium text-gray-900">
                            {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-700">
                            {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
} 