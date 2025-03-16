import type { Metadata } from "next"
import { Toaster } from "react-hot-toast"
import { ClerkProvider } from "@clerk/nextjs"
import { ThemeProvider } from "@/components/theme-provider"
import { fontMontserrat, fontRoboto } from "@/lib/fonts"
import "../styles/globals.css"
import { Analytics } from '@/components/analytics'

// Define metadata using a function that returns the metadata object
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: {
            default: "Encanta - AI-Powered Content Creation",
            template: "%s | Encanta"
        },
        description:
            "Encanta helps businesses create strategic content at scale using AI technology and marketing expertise.",
        keywords: [
            "AI content creation",
            "content marketing",
            "AI writing",
            "marketing automation",
            "content strategy"
        ],
        authors: [
            {
                name: "Encanta Team"
            }
        ],
        creator: "Encanta",
        openGraph: {
            type: "website",
            locale: "en_US",
            url: "https://encanta.ai",
            title: "Encanta - AI-Powered Content Creation",
            description:
                "Encanta helps businesses create strategic content at scale using AI technology and marketing expertise.",
            siteName: "Encanta"
        },
        twitter: {
            card: "summary_large_image",
            title: "Encanta - AI-Powered Content Creation",
            description:
                "Encanta helps businesses create strategic content at scale using AI technology and marketing expertise.",
            creator: "@encanta"
        },
        icons: {
            icon: "/favicon.ico"
        }
    }
}

export default async function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <html lang="en" className={`${fontMontserrat.variable} ${fontRoboto.variable}`} suppressHydrationWarning>
                <body className="min-h-screen flex flex-col font-roboto" suppressHydrationWarning>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                        <Toaster position="bottom-right" />
                        <Analytics />
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    )
} 