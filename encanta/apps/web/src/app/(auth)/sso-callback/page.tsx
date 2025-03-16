"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Get the redirect URL from the query parameters or default to dashboard
        const redirectUrl = searchParams.get("redirect_url") || "/dashboard";
        const afterSignInUrl = searchParams.get("after_sign_in_url") || "/dashboard";
        const afterSignUpUrl = searchParams.get("after_sign_up_url") || "/onboarding";

        // Redirect after a short delay to allow Clerk to process the callback
        const timer = setTimeout(() => {
            if (redirectUrl) {
                router.push(redirectUrl);
            } else if (afterSignInUrl) {
                router.push(afterSignInUrl);
            } else if (afterSignUpUrl) {
                router.push(afterSignUpUrl);
            } else {
                router.push("/dashboard");
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, [router, searchParams]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-white to-white">
            <AuthenticateWithRedirectCallback />
            <div className="text-center">
                <Spinner size="lg" />
                <h2 className="mt-4 text-xl font-semibold text-gray-800">
                    Completing authentication...
                </h2>
                <p className="mt-2 text-gray-600">
                    You'll be redirected automatically in a moment.
                </p>
            </div>
        </div>
    );
} 