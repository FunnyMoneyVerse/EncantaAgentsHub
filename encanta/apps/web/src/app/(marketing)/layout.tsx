import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import { Analytics } from '@/components/analytics';
import { fontMontserrat, fontRoboto } from '@/lib/fonts';
import '@/styles/globals.css';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: {
            template: '%s | Encanta',
            default: 'Encanta | Strategic AI for Remarkable Content',
        },
        description: 'Encanta is an AI-powered content platform that empowers startups and SMEs to produce professional, strategically aligned content without specialized marketing or technical AI skills.',
        keywords: ['content creation', 'AI writing', 'marketing content', 'ai content platform', 'content strategy'],
        authors: [{ name: 'Encanta Team' }],
        creator: 'Encanta',
        openGraph: {
            type: 'website',
            locale: 'en_US',
            url: 'https://encanta.io',
            siteName: 'Encanta',
            title: 'Encanta | Strategic AI for Remarkable Content',
            description: 'Encanta is an AI-powered content platform that empowers startups and SMEs to produce professional, strategically aligned content without specialized marketing or technical AI skills.',
            images: [
                {
                    url: 'https://encanta.io/images/social-card.png',
                    width: 1200,
                    height: 630,
                    alt: 'Encanta Social Card',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Encanta | Strategic AI for Remarkable Content',
            description: 'Encanta is an AI-powered content platform that empowers startups and SMEs to produce professional, strategically aligned content without specialized marketing or technical AI skills.',
            creator: '@encantaAI',
            images: ['https://encanta.io/images/social-card.png'],
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

export default async function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${fontMontserrat.variable} ${fontRoboto.variable}`}>
            <body className="min-h-screen flex flex-col font-roboto">
                <Navbar />
                {children}
                <Footer />
                <Analytics />
            </body>
        </html>
    );
} 