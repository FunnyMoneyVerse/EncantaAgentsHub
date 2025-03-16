import { Metadata } from 'next';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Header } from "@/components/dashboard/header";
import { Sidebar } from '@/components/dashboard/sidebar';

export const metadata: Metadata = {
    title: "Dashboard | Encanta",
    description: "Manage your content and analytics"
};

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId } = await auth();

    if (!userId) {
        redirect('/login');
    }

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
} 