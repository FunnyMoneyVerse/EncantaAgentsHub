import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign Up | Encanta',
    description: 'Create a new Encanta account to access the AI-powered content platform.',
};

export default function SignupLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 