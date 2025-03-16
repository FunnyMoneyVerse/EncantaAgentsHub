"use client"

import { toast } from "react-hot-toast"

/**
 * Base URL for API requests
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3004'

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
    statusCode: number

    constructor(message: string, statusCode: number) {
        super(message)
        this.statusCode = statusCode
        this.name = 'ApiError'
    }
}

/**
 * Makes an authenticated API request
 */
export async function fetchWithAuth(
    endpoint: string,
    options: RequestInit = {},
    showErrorToast: boolean = true
) {
    const url = `${API_BASE_URL}${endpoint}`

    try {
        // Get auth token from Clerk
        const res = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        })

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}))
            const errorMessage = errorData.detail || errorData.message || `Request failed with status ${res.status}`

            if (showErrorToast) {
                toast.error(errorMessage)
            }

            throw new ApiError(errorMessage, res.status)
        }

        return await res.json()
    } catch (error) {
        if (error instanceof ApiError) {
            throw error
        }

        const message = error instanceof Error ? error.message : 'An unknown error occurred'

        if (showErrorToast) {
            toast.error(`Network error: ${message}`)
        }

        throw new ApiError(message, 0)
    }
}

/**
 * API client with methods for different endpoints
 */
export const api = {
    // Workspace endpoints
    workspaces: {
        getAll: () => fetchWithAuth('/api/workspaces'),
        getById: (id: string) => fetchWithAuth(`/api/workspaces/${id}`),
        create: (data: any) => fetchWithAuth('/api/workspaces', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
        update: (id: string, data: any) => fetchWithAuth(`/api/workspaces/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),
        delete: (id: string) => fetchWithAuth(`/api/workspaces/${id}`, {
            method: 'DELETE',
        }),
    },

    // Content endpoints
    content: {
        getForWorkspace: (workspaceId: string, params = {}) => {
            const queryParams = new URLSearchParams()
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    queryParams.append(key, String(value))
                }
            })

            const query = queryParams.toString() ? `?${queryParams.toString()}` : ''
            return fetchWithAuth(`/api/content/workspace/${workspaceId}${query}`)
        },
        create: (data: any) => fetchWithAuth('/api/content', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
        generate: (data: any) => fetchWithAuth('/api/content/generate', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
        getTaskStatus: (taskId: string) => fetchWithAuth(`/api/content/task/${taskId}`),
    },

    // Brand endpoints
    brand: {
        getForWorkspace: (workspaceId: string) => fetchWithAuth(`/api/brand?workspace_id=${workspaceId}`),
        create: (data: any) => fetchWithAuth('/api/brand', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
        update: (id: string, data: any) => fetchWithAuth(`/api/brand/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),
    },

    // Knowledge file endpoints
    knowledge: {
        getForWorkspace: (workspaceId: string) => fetchWithAuth(`/api/knowledge/workspace/${workspaceId}`),
        delete: (fileId: string) => fetchWithAuth(`/api/knowledge/${fileId}`, {
            method: 'DELETE',
        }),
        getFileChunks: (fileId: string) => fetchWithAuth(`/api/knowledge/file/${fileId}/chunks`),
    },

    // Agent configuration endpoints
    agentConfigs: {
        getForWorkspace: (workspaceId: string, agentType?: string) => {
            const query = agentType ? `?workspace_id=${workspaceId}&agent_type=${agentType}` : `?workspace_id=${workspaceId}`
            return fetchWithAuth(`/api/agent-configs${query}`)
        },
        getById: (id: string) => fetchWithAuth(`/api/agent-configs/${id}`),
        create: (data: any) => fetchWithAuth('/api/agent-configs', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
        update: (id: string, data: any) => fetchWithAuth('/api/agent-configs', {
            method: 'PUT',
            body: JSON.stringify({ id, ...data }),
        }),
        delete: (id: string) => fetchWithAuth(`/api/agent-configs/${id}`, {
            method: 'DELETE',
        }),
    },

    // Subscription endpoints
    subscriptions: {
        getPlans: () => fetchWithAuth('/api/subscriptions/plans'),
        getCurrentSubscription: () => fetchWithAuth('/api/subscriptions/current'),
        createCheckoutSession: (priceId: string, returnUrl: string) => fetchWithAuth('/api/subscriptions/create-checkout-session', {
            method: 'POST',
            body: JSON.stringify({ priceId, returnUrl }),
        }),
        createPortalSession: (returnUrl: string) => fetchWithAuth('/api/subscriptions/create-portal-session', {
            method: 'POST',
            body: JSON.stringify({ returnUrl }),
        }),
    },
} 