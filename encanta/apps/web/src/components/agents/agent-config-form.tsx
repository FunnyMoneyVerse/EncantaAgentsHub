"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { api } from "@/lib/api"
import { toast } from "react-hot-toast"
import { SelectAgentConfig } from "@/db/schema"

// Validation schema
const agentConfigSchema = z.object({
    name: z.string().min(1, "Name is required"),
    instructions: z.string().optional(),
    examples: z.array(
        z.object({
            input: z.string(),
            output: z.string()
        })
    ).optional(),
    parameters: z.record(z.any()).optional(),
    isDefault: z.boolean().optional()
})

type AgentConfigFormValues = z.infer<typeof agentConfigSchema>

interface AgentConfigFormProps {
    workspaceId: string
    agentType: "ideation" | "research" | "content" | "editor"
    initialData?: SelectAgentConfig
    onSuccess: (config: any) => void
    onCancel: () => void
}

export function AgentConfigForm({
    workspaceId,
    agentType,
    initialData,
    onSuccess,
    onCancel
}: AgentConfigFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [examples, setExamples] = useState<{ input: string; output: string }[]>(
        initialData?.examples as any[] || [{ input: "", output: "" }]
    )
    const isEditing = !!initialData

    // Initialize form with existing data or defaults
    const form = useForm<AgentConfigFormValues>({
        resolver: zodResolver(agentConfigSchema),
        defaultValues: initialData
            ? {
                name: initialData.name,
                instructions: initialData.instructions || "",
                examples: initialData.examples as any[] || [],
                parameters: initialData.parameters as Record<string, any> || {},
                isDefault: initialData.isDefault || false
            }
            : {
                name: "",
                instructions: "",
                examples: [],
                parameters: {},
                isDefault: false
            }
    })

    // Add a new example
    const addExample = () => {
        setExamples([...examples, { input: "", output: "" }])
    }

    // Remove an example
    const removeExample = (index: number) => {
        setExamples(examples.filter((_, i) => i !== index))
    }

    // Update an example
    const updateExample = (index: number, field: "input" | "output", value: string) => {
        const newExamples = [...examples]
        newExamples[index][field] = value
        setExamples(newExamples)
    }

    // Form submission handler
    async function onSubmit(data: AgentConfigFormValues) {
        setIsSubmitting(true)

        try {
            // Filter out empty examples
            const filteredExamples = examples.filter(
                example => example.input.trim() !== "" && example.output.trim() !== ""
            )

            // Format data for API
            const formattedData = {
                ...data,
                examples: filteredExamples,
                workspaceId: workspaceId,
                agentType: agentType
            }

            // Create or update config based on whether we're editing
            let result

            if (isEditing && initialData) {
                result = await api.agentConfigs.update(initialData.id, formattedData)
            } else {
                result = await api.agentConfigs.create(formattedData)
            }

            onSuccess(result)
            toast.success(`Agent configuration ${isEditing ? "updated" : "created"} successfully`)
        } catch (error) {
            console.error("Error saving agent configuration:", error)
            toast.error(`Failed to ${isEditing ? "update" : "create"} agent configuration`)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Configuration Name*
                </label>
                <Input
                    id="name"
                    {...form.register("name")}
                    placeholder="E.g., Default Content Writer, SEO Specialist"
                />
                {form.formState.errors.name && (
                    <p className="mt-1 text-sm text-red-600">{form.formState.errors.name.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">
                    Custom Instructions
                </label>
                <Textarea
                    id="instructions"
                    {...form.register("instructions")}
                    placeholder="Provide specific instructions for this agent configuration"
                    rows={5}
                />
                <p className="mt-1 text-sm text-gray-500">
                    These instructions will be added to the agent's system prompt to customize its behavior.
                </p>
            </div>

            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Few-Shot Examples
                    </label>
                    <Button type="button" variant="outline" size="sm" onClick={addExample}>
                        Add Example
                    </Button>
                </div>

                <div className="space-y-4">
                    {examples.map((example, index) => (
                        <div key={index} className="border rounded-md p-4 bg-gray-50">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="text-sm font-medium">Example {index + 1}</h4>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeExample(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Remove
                                </Button>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">
                                        Input
                                    </label>
                                    <Textarea
                                        value={example.input}
                                        onChange={(e) => updateExample(index, "input", e.target.value)}
                                        placeholder="Example input for the agent"
                                        rows={2}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">
                                        Output
                                    </label>
                                    <Textarea
                                        value={example.output}
                                        onChange={(e) => updateExample(index, "output", e.target.value)}
                                        placeholder="Expected output from the agent"
                                        rows={3}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="mt-2 text-sm text-gray-500">
                    Examples help the agent understand the expected format and style of responses.
                </p>
            </div>

            <div className="flex items-center">
                <input
                    id="isDefault"
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    {...form.register("isDefault")}
                />
                <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-700">
                    Set as default configuration for this agent type
                </label>
            </div>

            <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : isEditing ? "Update Configuration" : "Create Configuration"}
                </Button>
            </div>
        </form>
    )
} 