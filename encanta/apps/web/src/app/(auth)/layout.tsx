import { Metadata } from 'next';
import { fontMontserrat, fontRoboto } from '@/lib/fonts';
import { Analytics } from '@/components/analytics';
import '@/styles/globals.css';
import Link from 'next/link';
import Image from 'next/image';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: {
            template: '%s | Encanta',
            default: 'Authentication | Encanta',
        },
        description: 'Sign in to your Encanta account or create a new one to access the AI-powered content platform.',
        robots: {
            index: false,
            follow: true,
        },
    };
}

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${fontMontserrat.variable} ${fontRoboto.variable}`}>
            <body className="min-h-screen flex flex-col font-roboto" suppressHydrationWarning>
                {children}
                <Analytics />
            </body>
        </html>
    );
} 