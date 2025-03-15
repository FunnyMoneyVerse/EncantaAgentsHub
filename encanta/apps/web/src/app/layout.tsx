"use server"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../styles/globals.css"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
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

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <Toaster position="bottom-right" />
                </ThemeProvider>
            </body>
        </html>
    )
} 