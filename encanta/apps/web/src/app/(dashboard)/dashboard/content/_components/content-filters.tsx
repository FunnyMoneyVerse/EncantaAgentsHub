"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

export function ContentFilters() {
    const [searchQuery, setSearchQuery] = useState("")
    const [contentType, setContentType] = useState("all")
    const [status, setStatus] = useState("all")

    return (
        <div className="flex items-center gap-2">
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search content..."
                    className="w-[200px] pl-8 md:w-[300px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <Select value={contentType} onValueChange={setContentType}>
                <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Content Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="blog">Blog</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="ad">Ad</SelectItem>
                    <SelectItem value="landing">Landing Page</SelectItem>
                </SelectContent>
            </Select>

            <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="review">In Review</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
            </Button>
        </div>
    )
} 