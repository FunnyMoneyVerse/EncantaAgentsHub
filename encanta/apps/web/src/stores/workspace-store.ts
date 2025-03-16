import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Workspace {
    id: string;
    name: string;
    description?: string;
    industry?: string;
    created_at: string;
    slug: string;
    updatedAt: string;
    createdAt: string;
}

interface WorkspaceState {
    workspaces: Workspace[];
    selectedWorkspace: Workspace | null;
    isLoading: boolean;
    setWorkspaces: (workspaces: Workspace[]) => void;
    setSelectedWorkspace: (workspace: Workspace | null) => void;
    addWorkspace: (workspace: Workspace) => void;
    updateWorkspace: (updatedWorkspace: Workspace) => void;
    removeWorkspace: (workspaceId: string) => void;
    getWorkspaceById: (id: string) => Workspace | undefined;
}

export const useWorkspaceStore = create<WorkspaceState>()(
    persist(
        (set, get) => ({
            workspaces: [],
            selectedWorkspace: null,
            isLoading: true,

            setWorkspaces: (workspaces) => set({
                workspaces,
                isLoading: false,
            }),

            setSelectedWorkspace: (workspace) => set({
                selectedWorkspace: workspace
            }),

            addWorkspace: (workspace) => set((state) => ({
                workspaces: [...state.workspaces, workspace],
                selectedWorkspace: state.workspaces.length === 0 ? workspace : state.selectedWorkspace,
            })),

            updateWorkspace: (updatedWorkspace) => set((state) => {
                const updatedWorkspaces = state.workspaces.map((w) =>
                    w.id === updatedWorkspace.id ? updatedWorkspace : w
                );

                return {
                    workspaces: updatedWorkspaces,
                    selectedWorkspace: state.selectedWorkspace?.id === updatedWorkspace.id
                        ? updatedWorkspace
                        : state.selectedWorkspace,
                };
            }),

            removeWorkspace: (workspaceId) => set((state) => {
                const filteredWorkspaces = state.workspaces.filter((w) => w.id !== workspaceId);

                return {
                    workspaces: filteredWorkspaces,
                    selectedWorkspace: state.selectedWorkspace?.id === workspaceId
                        ? filteredWorkspaces[0] || null
                        : state.selectedWorkspace,
                };
            }),

            getWorkspaceById: (id) => get().workspaces.find((w) => w.id === id),
        }),
        {
            name: 'encanta-workspace-storage',
            partialize: (state) => ({ selectedWorkspace: state.selectedWorkspace }),
        }
    )
); 