import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login | Encanta',
    description: 'Sign in to your Encanta account to access the AI-powered content platform.',
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 