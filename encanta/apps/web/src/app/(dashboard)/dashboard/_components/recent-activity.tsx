"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ActivityItem {
    id: string
    user: {
        name: string
        email: string
        image?: string
    }
    action: string
    date: string
    content: string
}

const recentActivity: ActivityItem[] = [
    {
        id: "1",
        user: {
            name: "John Doe",
            email: "john@example.com",
            image: "/avatars/01.png"
        },
        action: "created",
        date: "2 hours ago",
        content: "Blog post: 10 Tips for Better Content"
    },
    {
        id: "2",
        user: {
            name: "Sarah Johnson",
            email: "sarah@example.com",
            image: "/avatars/02.png"
        },
        action: "updated",
        date: "5 hours ago",
        content: "Landing page copy for Product Launch"
    },
    {
        id: "3",
        user: {
            name: "Michael Chen",
            email: "michael@example.com",
            image: "/avatars/03.png"
        },
        action: "commented on",
        date: "1 day ago",
        content: "Email campaign draft"
    },
    {
        id: "4",
        user: {
            name: "Emily Wilson",
            email: "emily@example.com",
            image: "/avatars/04.png"
        },
        action: "approved",
        date: "2 days ago",
        content: "Social media calendar for Q3"
    },
    {
        id: "5",
        user: {
            name: "Alex Rodriguez",
            email: "alex@example.com",
            image: "/avatars/05.png"
        },
        action: "shared",
        date: "3 days ago",
        content: "Brand guidelines document"
    }
]

export function RecentActivity() {
    return (
        <div className="space-y-8">
            {recentActivity.map((item) => (
                <div key={item.id} className="flex items-start">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={item.user.image} alt={item.user.name} />
                        <AvatarFallback>
                            {item.user.name.split(" ").map(name => name[0]).join("")}
                        </AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium">
                            <span className="font-semibold">{item.user.name}</span>{" "}
                            <span className="text-muted-foreground">{item.action}</span>
                        </p>
                        <p className="text-sm text-muted-foreground">{item.content}</p>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                </div>
            ))}
        </div>
    )
} 