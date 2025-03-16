"use client"

import Link from 'next/link';
import { SignIn } from '@clerk/nextjs';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-white to-white p-4">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <Link href="/" className="inline-block">
                        <h1 className="text-3xl font-bold text-purple-800">Encanta</h1>
                    </Link>
                    <p className="mt-2 text-gray-600">Sign in to your account</p>
                </div>

                <SignIn
                    appearance={{
                        elements: {
                            rootBox: "mx-auto w-full",
                            card: "bg-white rounded-lg shadow-lg p-8 mb-6 border-0",
                            headerTitle: "hidden",
                            headerSubtitle: "hidden",
                            formButtonPrimary: "bg-purple-700 hover:bg-purple-800 w-full",
                            formButtonReset: "text-sm text-purple-700 hover:text-purple-600",
                            footerAction: "text-center text-gray-600",
                            footerActionLink: "text-purple-700 hover:text-purple-600 font-medium",
                            socialButtonsBlockButton: "border border-gray-200 hover:bg-gray-50",
                            socialButtonsBlockButtonText: "text-sm font-medium",
                            dividerLine: "bg-gray-200",
                            dividerText: "text-gray-500 text-sm",
                        }
                    }}
                    path="/login"
                    routing="path"
                    signUpUrl="/signup"
                    redirectUrl="/dashboard"
                />
            </div>
        </div>
    );
} 