import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Content Management | Encanta",
    description: "Manage your content projects and assets"
};

export default function ContentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 