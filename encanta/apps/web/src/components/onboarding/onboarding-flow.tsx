'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { useOnboardingStore } from '@/stores/onboarding-store';
import { StepWelcome } from './step-welcome';
import { StepWorkspace } from './step-workspace';
import { StepBrand } from './step-brand';
import { StepContentPreferences } from './step-content-preferences';
import { StepComplete } from './step-complete';

export function OnboardingFlow() {
    const router = useRouter();
    const { currentStep, isOnboardingComplete } = useOnboardingStore();

    // If onboarding is complete, redirect to dashboard
    useEffect(() => {
        if (isOnboardingComplete) {
            router.push('/dashboard');
        }
    }, [isOnboardingComplete, router]);

    // Render the appropriate step based on currentStep
    function renderStep() {
        switch (currentStep) {
            case 1:
                return <StepWelcome />;
            case 2:
                return <StepWorkspace />;
            case 3:
                return <StepBrand />;
            case 4:
                return <StepContentPreferences />;
            case 5:
                return <StepComplete />;
            default:
                return <StepWelcome />;
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-3xl">
                {/* Progress indicator */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        {[1, 2, 3, 4, 5].map((step) => (
                            <div key={step} className="flex flex-col items-center">
                                <div
                                    className={`flex h-8 w-8 items-center justify-center rounded-full ${step <= currentStep
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-gray-200 text-gray-500'
                                        }`}
                                >
                                    {step < currentStep ? (
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    ) : (
                                        step
                                    )}
                                </div>
                                <div className="mt-2 text-xs text-gray-500">
                                    {step === 1
                                        ? 'Welcome'
                                        : step === 2
                                            ? 'Workspace'
                                            : step === 3
                                                ? 'Brand'
                                                : step === 4
                                                    ? 'Content'
                                                    : 'Complete'}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 h-1 w-full bg-gray-200">
                        <div
                            className="h-1 bg-indigo-600 transition-all duration-300"
                            style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Step content */}
                <Card className="shadow-lg">
                    <CardContent className="p-8">{renderStep()}</CardContent>
                </Card>
            </div>
        </div>
    );
} 