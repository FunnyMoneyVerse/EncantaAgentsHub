"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    FileText,
    Users,
    Settings,
    BarChart
} from "lucide-react"

interface NavItem {
    title: string
    href: string
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const navItems: NavItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Content",
        href: "/dashboard/content",
        icon: FileText,
    },
    {
        title: "Analytics",
        href: "/dashboard/analytics",
        icon: BarChart,
    },
    {
        title: "Team",
        href: "/dashboard/team",
        icon: Users,
    },
    {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
]

export function DashboardNav() {
    const pathname = usePathname()

    return (
        <nav className="grid items-start gap-2 px-2 py-4">
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                        pathname === item.href ? "bg-accent text-accent-foreground" : "transparent"
                    )}
                >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                </Link>
            ))}
        </nav>
    )
} 