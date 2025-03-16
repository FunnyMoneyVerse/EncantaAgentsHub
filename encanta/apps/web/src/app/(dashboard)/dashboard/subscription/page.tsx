'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { toast } from 'react-hot-toast';
import { useAuth } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';

interface SubscriptionPlan {
    id: string;
    name: string;
    description: string;
    price: number;
    interval: 'month' | 'year';
    features: string[];
    priceId: string;
    popular?: boolean;
}

interface CurrentSubscription {
    id: string;
    status: string;
    plan: {
        id: string;
        name: string;
    };
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
}

export default function SubscriptionPage() {
    const router = useRouter();
    const { isLoaded, isSignedIn } = useAuth();
    const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
    const [currentSubscription, setCurrentSubscription] = useState<CurrentSubscription | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (!isLoaded) return;

        if (!isSignedIn) {
            router.push('/sign-in');
            return;
        }

        async function fetchData() {
            try {
                setIsLoading(true);

                // Fetch subscription plans
                const plansData = await api.subscriptions.getPlans();
                setPlans(plansData);

                // Fetch current subscription
                try {
                    const subscriptionData = await api.subscriptions.getCurrentSubscription();
                    setCurrentSubscription(subscriptionData);
                } catch (error) {
                    // User might not have a subscription yet
                    console.log('No active subscription found');
                }
            } catch (error) {
                console.error('Error fetching subscription data:', error);
                toast.error('Failed to load subscription information');
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [isLoaded, isSignedIn, router]);

    const handleSubscribe = async (priceId: string) => {
        if (!isSignedIn) {
            toast.error('Please sign in to subscribe');
            return;
        }

        setIsProcessing(true);
        try {
            // Create checkout session
            const { url } = await api.subscriptions.createCheckoutSession(
                priceId,
                `${window.location.origin}/dashboard/subscription`
            );

            // Redirect to checkout
            window.location.href = url;
        } catch (error) {
            console.error('Error creating checkout session:', error);
            toast.error('Failed to start checkout process');
            setIsProcessing(false);
        }
    };

    const handleManageSubscription = async () => {
        if (!isSignedIn) {
            toast.error('Please sign in to manage your subscription');
            return;
        }

        setIsProcessing(true);
        try {
            // Create customer portal session
            const { url } = await api.subscriptions.createPortalSession(
                `${window.location.origin}/dashboard/subscription`
            );

            // Redirect to customer portal
            window.location.href = url;
        } catch (error) {
            console.error('Error creating portal session:', error);
            toast.error('Failed to open subscription management portal');
            setIsProcessing(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Subscription Management</h1>
                <p className="text-gray-600 mt-1">
                    Manage your subscription and billing information
                </p>
            </div>

            {/* Current Subscription */}
            <Card>
                <CardHeader>
                    <CardTitle>Current Subscription</CardTitle>
                    <CardDescription>
                        Your current subscription details and status
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {currentSubscription ? (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Plan</p>
                                    <p className="text-lg font-semibold">{currentSubscription.plan.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Status</p>
                                    <p className="text-lg font-semibold capitalize">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${currentSubscription.status === 'active' ? 'bg-green-100 text-green-800' :
                                                currentSubscription.status === 'trialing' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-gray-100 text-gray-800'
                                            }`}>
                                            {currentSubscription.status}
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Current Period Ends</p>
                                    <p className="text-lg font-semibold">
                                        {new Date(currentSubscription.currentPeriodEnd).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Auto Renew</p>
                                    <p className="text-lg font-semibold">
                                        {currentSubscription.cancelAtPeriodEnd ? 'No' : 'Yes'}
                                    </p>
                                </div>
                            </div>

                            <Button
                                onClick={handleManageSubscription}
                                disabled={isProcessing}
                                className="mt-4"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    'Manage Subscription'
                                )}
                            </Button>
                        </div>
                    ) : (
                        <div className="text-center py-6">
                            <p className="text-gray-500 mb-4">You don't have an active subscription</p>
                            <p className="text-sm text-gray-500 mb-6">
                                Choose a plan below to get started with premium features
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Available Plans */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Available Plans</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {plans.map((plan) => (
                        <Card key={plan.id} className={`relative ${plan.popular ? 'border-blue-500' : ''}`}>
                            {plan.popular && (
                                <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-xs font-bold uppercase rounded-bl-lg rounded-tr-lg">
                                    Popular
                                </div>
                            )}
                            <CardHeader>
                                <CardTitle>{plan.name}</CardTitle>
                                <CardDescription>{plan.description}</CardDescription>
                                <div className="mt-2">
                                    <span className="text-3xl font-bold">${plan.price}</span>
                                    <span className="text-gray-500">/{plan.interval}</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-center">
                                            <svg
                                                className="h-5 w-5 text-green-500 mr-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    onClick={() => handleSubscribe(plan.priceId)}
                                    disabled={isProcessing || (currentSubscription?.plan.id === plan.id)}
                                    className="w-full"
                                    variant={currentSubscription?.plan.id === plan.id ? "outline" : "default"}
                                >
                                    {isProcessing ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Processing...
                                        </>
                                    ) : currentSubscription?.plan.id === plan.id ? (
                                        'Current Plan'
                                    ) : (
                                        'Subscribe'
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
} 