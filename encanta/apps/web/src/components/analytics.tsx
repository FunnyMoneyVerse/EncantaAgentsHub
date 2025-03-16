"use client";

import { useEffect, useState } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { usePathname, useSearchParams } from 'next/navigation';

// PostHog initialization will happen in useEffect

export function Analytics() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        // Initialize PostHog only in the browser and if the API key is available
        const posthogApiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
        const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';

        if (posthogApiKey && !isInitialized) {
            posthog.init(posthogApiKey, {
                api_host: posthogHost,
                capture_pageview: false, // We'll manually capture pageviews
                persistence: 'localStorage',
                autocapture: true,
                session_recording: {
                    maskAllInputs: true,
                    maskInputOptions: {
                        password: true,
                        email: true,
                        number: true,
                        search: true,
                        tel: true,
                        text: true,
                        url: true
                    }
                }
            });
            setIsInitialized(true);
        }
    }, [isInitialized]);

    useEffect(() => {
        if (isInitialized) {
            // Track pageviews
            const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
            posthog.capture('$pageview', {
                $current_url: url
            });
        }
    }, [pathname, searchParams, isInitialized]);

    // Only render PostHogProvider on the client after initialization
    if (!isInitialized) {
        return null;
    }

    return (
        <PostHogProvider client={posthog}>
            {/* PostHog provider wraps the app */}
        </PostHogProvider>
    );
} 