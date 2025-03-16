'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    HomeIcon,
    DocumentTextIcon,
    UsersIcon,
    RocketLaunchIcon,
    SparklesIcon,
    ChartBarIcon,
    Cog6ToothIcon
} from '@heroicons/react/24/outline';

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Content', href: '/dashboard/content', icon: DocumentTextIcon },
    { name: 'Workspaces', href: '/dashboard/workspaces', icon: UsersIcon },
    { name: 'Brand', href: '/dashboard/brand', icon: RocketLaunchIcon },
    { name: 'Agents', href: '/dashboard/agents', icon: SparklesIcon },
    { name: 'Knowledge', href: '/dashboard/knowledge', icon: SparklesIcon },
    { name: 'Analytics', href: '/dashboard/analytics', icon: ChartBarIcon },
    { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="hidden md:flex md:flex-col md:w-64 md:bg-gray-800">
            <div className="flex flex-col flex-1 min-h-0">
                <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
                    <h1 className="text-xl font-bold text-white">Encanta</h1>
                </div>
                <div className="flex-1 flex flex-col overflow-y-auto">
                    <nav className="flex-1 px-2 py-4 space-y-1">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`
                    group flex items-center px-2 py-2 text-sm font-medium rounded-md
                    ${isActive
                                            ? 'bg-gray-900 text-white'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
                  `}
                                >
                                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </div>
    );
} 