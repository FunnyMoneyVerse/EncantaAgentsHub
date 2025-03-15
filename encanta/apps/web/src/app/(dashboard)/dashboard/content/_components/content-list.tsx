"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Edit, Trash, Eye } from "lucide-react"

interface ContentItem {
    id: string
    title: string
    description: string
    type: "blog" | "social" | "email" | "ad" | "landing"
    status: "draft" | "review" | "published"
    date: string
}

const contentItems: ContentItem[] = [
    {
        id: "1",
        title: "10 Tips for Better Content Creation",
        description: "A comprehensive guide to creating engaging content that converts.",
        type: "blog",
        status: "published",
        date: "2023-10-15"
    },
    {
        id: "2",
        title: "Product Launch Email Sequence",
        description: "5-part email sequence for the new product launch.",
        type: "email",
        status: "draft",
        date: "2023-10-20"
    },
    {
        id: "3",
        title: "Summer Sale Campaign",
        description: "Social media posts for the upcoming summer sale.",
        type: "social",
        status: "review",
        date: "2023-10-22"
    },
    {
        id: "4",
        title: "New Feature Announcement",
        description: "Blog post announcing our latest feature release.",
        type: "blog",
        status: "draft",
        date: "2023-10-25"
    },
    {
        id: "5",
        title: "Holiday Promotion Landing Page",
        description: "Landing page for the holiday season promotions.",
        type: "landing",
        status: "published",
        date: "2023-10-28"
    }
]

const typeColors = {
    blog: "bg-blue-100 text-blue-800",
    social: "bg-purple-100 text-purple-800",
    email: "bg-green-100 text-green-800",
    ad: "bg-yellow-100 text-yellow-800",
    landing: "bg-pink-100 text-pink-800"
}

const statusColors = {
    draft: "bg-gray-100 text-gray-800",
    review: "bg-yellow-100 text-yellow-800",
    published: "bg-green-100 text-green-800"
}

export function ContentList() {
    const [items, setItems] = useState<ContentItem[]>(contentItems)

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Your Content</h2>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create New
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                    <Card key={item.id}>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-lg">{item.title}</CardTitle>
                                <Badge className={statusColors[item.status]}>
                                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                </Badge>
                            </div>
                            <CardDescription>{item.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <Badge className={typeColors[item.type]}>
                                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                    Created: {new Date(item.date).toLocaleDateString()}
                                </span>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" size="sm">
                                <Eye className="mr-2 h-4 w-4" />
                                View
                            </Button>
                            <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Trash className="mr-2 h-4 w-4" />
                                    Delete
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
} 