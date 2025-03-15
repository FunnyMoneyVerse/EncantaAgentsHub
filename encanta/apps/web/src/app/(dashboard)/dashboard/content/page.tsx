"use server"

import { ContentList } from "./_components/content-list"
import { ContentFilters } from "./_components/content-filters"

export const metadata = {
    title: "Content Management | Encanta",
    description: "Manage your content projects and assets"
}

export default async function ContentPage() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
                    <p className="text-muted-foreground">
                        Create, manage, and organize your content projects.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <ContentFilters />
                </div>
            </div>

            <ContentList />
        </div>
    )
} 