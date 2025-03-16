import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OnboardingState {
    // Current step
    currentStep: number;

    // Workspace details
    workspaceName: string;
    workspaceDescription?: string;
    industry?: string;

    // Brand details
    brandName: string;
    brandVoice?: string;
    brandGuidelines?: string;

    // Content preferences
    contentTypes: string[];

    // Onboarding status
    isOnboardingComplete: boolean;

    // Actions
    setCurrentStep: (step: number) => void;
    setWorkspaceDetails: (details: {
        workspaceName: string;
        workspaceDescription?: string;
        industry?: string;
    }) => void;
    setBrandDetails: (details: {
        brandName: string;
        brandVoice?: string;
        brandGuidelines?: string;
    }) => void;
    setContentPreferences: (contentTypes: string[]) => void;
    completeOnboarding: () => void;
    resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
    persist(
        (set) => ({
            // Initial state
            currentStep: 1,
            workspaceName: '',
            workspaceDescription: '',
            industry: '',
            brandName: '',
            brandVoice: '',
            brandGuidelines: '',
            contentTypes: [],
            isOnboardingComplete: false,

            // Actions
            setCurrentStep: (step) => set({ currentStep: step }),

            setWorkspaceDetails: (details) => set((state) => ({
                ...state,
                workspaceName: details.workspaceName,
                workspaceDescription: details.workspaceDescription,
                industry: details.industry,
                currentStep: state.currentStep + 1,
            })),

            setBrandDetails: (details) => set((state) => ({
                ...state,
                brandName: details.brandName,
                brandVoice: details.brandVoice,
                brandGuidelines: details.brandGuidelines,
                currentStep: state.currentStep + 1,
            })),

            setContentPreferences: (contentTypes) => set((state) => ({
                ...state,
                contentTypes,
                currentStep: state.currentStep + 1,
            })),

            completeOnboarding: () => set({ isOnboardingComplete: true }),

            resetOnboarding: () => set({
                currentStep: 1,
                workspaceName: '',
                workspaceDescription: '',
                industry: '',
                brandName: '',
                brandVoice: '',
                brandGuidelines: '',
                contentTypes: [],
                isOnboardingComplete: false,
            }),
        }),
        {
            name: 'encanta-onboarding-storage',
        }
    )
); 