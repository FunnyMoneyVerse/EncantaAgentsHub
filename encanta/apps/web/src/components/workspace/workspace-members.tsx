'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api';
import { toast } from 'react-hot-toast';
import { PlusIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface WorkspaceMembersProps {
    workspaceId: string;
}

interface Member {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'content_manager' | 'workspace_manager' | 'content_creator' | 'editor' | 'viewer';
    isCurrentUser: boolean;
    isPending?: boolean;
}

export function WorkspaceMembers({ workspaceId }: WorkspaceMembersProps) {
    const [members, setMembers] = useState<Member[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isInviting, setIsInviting] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteRole, setInviteRole] = useState<Member['role']>('editor');

    // Fetch workspace members
    useEffect(() => {
        async function fetchMembers() {
            try {
                setIsLoading(true);
                // In a real implementation, we would have an API endpoint for this
                // For now, we'll use mock data
                setMembers([
                    { id: '1', name: 'You', email: 'you@example.com', role: 'admin', isCurrentUser: true },
                    // Add more mock members here as needed
                ]);
            } catch (error) {
                console.error('Error fetching members:', error);
                toast.error('Failed to load team members');
            } finally {
                setIsLoading(false);
            }
        }

        fetchMembers();
    }, [workspaceId]);

    // Handle member invitation
    async function handleInvite(e: React.FormEvent) {
        e.preventDefault();

        if (!inviteEmail.trim()) {
            toast.error('Please enter an email address');
            return;
        }

        try {
            // In a real implementation, we would have an API call here
            // For now, we'll just simulate a successful invitation

            // Add the new member to the list
            const newMember: Member = {
                id: Date.now().toString(),
                name: inviteEmail.split('@')[0],
                email: inviteEmail,
                role: inviteRole,
                isCurrentUser: false,
                isPending: true,
            };

            setMembers([...members, newMember]);
            setInviteEmail('');
            setIsInviting(false);

            toast.success(`Invitation sent to ${inviteEmail}`);
        } catch (error) {
            toast.error('Failed to send invitation');
        }
    }

    // Handle member removal
    async function handleRemoveMember(memberId: string) {
        if (!confirm('Are you sure you want to remove this team member?')) {
            return;
        }

        try {
            // In a real implementation, we would have an API call here

            // Remove the member from the list
            setMembers(members.filter((member) => member.id !== memberId));

            toast.success('Team member removed successfully');
        } catch (error) {
            toast.error('Failed to remove team member');
        }
    }

    // Role display mapping
    const roleDisplayNames: Record<Member['role'], string> = {
        'admin': 'Admin',
        'content_manager': 'Content Manager',
        'workspace_manager': 'Workspace Manager',
        'content_creator': 'Content Creator',
        'editor': 'Editor',
        'viewer': 'Viewer',
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Team Members</CardTitle>
                {!isInviting && (
                    <Button onClick={() => setIsInviting(true)}>
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Invite Member
                    </Button>
                )}
            </CardHeader>
            <CardContent>
                {isInviting && (
                    <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                        <h3 className="text-lg font-medium mb-4">Invite Team Member</h3>
                        <form onSubmit={handleInvite} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address*
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={inviteEmail}
                                    onChange={(e) => setInviteEmail(e.target.value)}
                                    placeholder="colleague@example.com"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                                    Role
                                </label>
                                <select
                                    id="role"
                                    value={inviteRole}
                                    onChange={(e) => setInviteRole(e.target.value as Member['role'])}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                >
                                    <option value="editor">Editor</option>
                                    <option value="content_creator">Content Creator</option>
                                    <option value="content_manager">Content Manager</option>
                                    <option value="workspace_manager">Workspace Manager</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <div className="flex justify-end space-x-3 pt-2">
                                <Button type="button" variant="outline" onClick={() => setIsInviting(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    Send Invitation
                                </Button>
                            </div>
                        </form>
                    </div>
                )}

                {isLoading ? (
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="animate-pulse flex items-center p-3">
                                <div className="h-10 w-10 bg-gray-200 rounded-full mr-4"></div>
                                <div className="flex-1">
                                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                                </div>
                                <div className="h-8 w-24 bg-gray-200 rounded"></div>
                            </div>
                        ))}
                    </div>
                ) : members.length === 0 ? (
                    <div className="text-center py-6">
                        <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No team members</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Start collaborating by inviting team members
                        </p>
                        <div className="mt-6">
                            <Button onClick={() => setIsInviting(true)}>
                                <PlusIcon className="h-5 w-5 mr-2" />
                                Invite Member
                            </Button>
                        </div>
                    </div>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {members.map((member) => (
                            <li key={member.id} className="py-4 flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                            <span className="text-indigo-800 font-medium">
                                                {member.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900">{member.name}</p>
                                        <p className="text-sm text-gray-500">{member.email}</p>
                                        {member.isPending && (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                Pending
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-sm text-gray-500 mr-4">
                                        {roleDisplayNames[member.role]}
                                    </span>
                                    {!member.isCurrentUser && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveMember(member.id)}
                                            className="text-gray-400 hover:text-red-500"
                                        >
                                            <XMarkIcon className="h-5 w-5" />
                                        </button>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    );
} 