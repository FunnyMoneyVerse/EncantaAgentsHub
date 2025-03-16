"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Workspace {
    id: string
    name: string
    slug: string
    createdAt: string
    updatedAt: string
}

interface WorkspaceState {
    workspaces: Workspace[]
    selectedWorkspace: Workspace | null
    setWorkspaces: (workspaces: Workspace[]) => void
    setSelectedWorkspace: (workspace: Workspace | null) => void
    getWorkspaceById: (id: string) => Workspace | undefined
}

export const useWorkspaceStore = create<WorkspaceState>()(
    persist(
        (set, get) => ({
            workspaces: [],
            selectedWorkspace: null,
            setWorkspaces: (workspaces) => set({ workspaces }),
            setSelectedWorkspace: (workspace) => set({ selectedWorkspace: workspace }),
            getWorkspaceById: (id) => get().workspaces.find((w) => w.id === id),
        }),
        {
            name: "workspace-store",
        }
    )
) 