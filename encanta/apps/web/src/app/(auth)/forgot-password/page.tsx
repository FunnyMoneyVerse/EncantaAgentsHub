import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRightIcon } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Forgot Password | Encanta',
        description: 'Reset your Encanta account password.',
    };
}

export default async function ForgotPasswordPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-white to-white p-4">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <Link href="/" className="inline-block">
                        <h1 className="text-3xl font-bold text-purple-800">Encanta</h1>
                    </Link>
                    <p className="mt-2 text-gray-600">Reset your password</p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Forgot your password?</h2>
                        <p className="text-gray-600">
                            Enter your email address and we'll send you a link to reset your password.
                        </p>
                    </div>

                    <form className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                required
                                className="w-full"
                            />
                        </div>

                        <Button type="submit" className="w-full bg-purple-700 hover:bg-purple-800">
                            Send reset link
                            <ArrowRightIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </form>
                </div>

                <div className="text-center">
                    <p className="text-gray-600">
                        Remember your password?{' '}
                        <Link href="/login" className="text-purple-700 hover:text-purple-600 font-medium">
                            Back to login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
} 