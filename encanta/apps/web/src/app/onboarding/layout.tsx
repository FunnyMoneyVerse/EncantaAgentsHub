import { Metadata } from 'next';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
    title: 'Onboarding | Encanta',
    description: 'Set up your Encanta account',
};

export default async function OnboardingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Check if user is authenticated
    const { userId } = await auth();

    if (!userId) {
        redirect('/login');
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Toaster position="top-right" />
            {children}
        </div>
    );
} 