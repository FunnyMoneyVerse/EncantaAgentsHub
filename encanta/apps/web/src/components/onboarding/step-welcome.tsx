'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useOnboardingStore } from '@/stores/onboarding-store';

export function StepWelcome() {
    const { setCurrentStep } = useOnboardingStore();

    return (
        <div className="text-center">
            <div className="mx-auto w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mb-6">
                <Image
                    src="/logo-icon.svg"
                    alt="Encanta"
                    width={40}
                    height={40}
                    className="text-indigo-600"
                />
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Welcome to Encanta!</h2>
            <p className="text-lg text-gray-600 mb-8">
                Let's set up your account in just a few steps. We'll help you create your workspace,
                define your brand, and start generating amazing content with AI.
            </p>
            <Button size="lg" onClick={() => setCurrentStep(2)}>
                Get Started
            </Button>
        </div>
    );
} 