import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Dashboard | Encanta",
    description: "Manage your content and analytics"
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 