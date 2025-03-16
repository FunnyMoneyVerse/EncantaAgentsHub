# Agent Configuration System

This directory contains components for managing AI agent configurations in the Encanta platform.

## Overview

The Agent Configuration system allows users to customize the behavior of AI agents used in the content generation process. There are four types of agents:

1. **Ideation Agent**: Generates creative content ideas and approaches
2. **Research Agent**: Gathers facts, statistics, and insights on topics
3. **Content Agent**: Creates the main content based on ideas and research
4. **Editor Agent**: Refines and improves the generated content

Each agent can have multiple configurations per workspace, with one optionally set as the default.

## Components

### AgentConfigForm

The main form component used for both creating and editing agent configurations. It allows users to:

- Set a name for the configuration
- Provide custom instructions to guide the agent's behavior
- Add few-shot examples (input/output pairs) to demonstrate desired outputs
- Set a configuration as the default for its agent type

### Usage

```tsx
<AgentConfigForm
  workspaceId="workspace-id"
  agentType="ideation" // or "research", "content", "editor"
  initialData={existingConfig} // Optional, for editing
  onSuccess={(config) => {
    // Handle successful creation/update
  }}
  onCancel={() => {
    // Handle cancellation
  }}
/>
```

## Pages

### Agent Listing Page

Located at `/dashboard/agents`, this page displays all agent configurations for the current workspace. Users can:

- Filter configurations by agent type
- Create new configurations
- Edit existing configurations
- Delete configurations

### Create Agent Page

Located at `/dashboard/agents/create?type=[agent-type]`, this page allows users to create a new agent configuration of the specified type.

### Edit Agent Page

Located at `/dashboard/agents/edit/[id]`, this page allows users to edit an existing agent configuration.

## Integration with Content Creation

Agent configurations are integrated with the content creation process. When creating content, users can select which agent configuration to use for each step of the generation process:

1. Select a workspace
2. Fill out the content details (title, type, topic, etc.)
3. Choose agent configurations for each step (ideation, research, content, editor)
4. Generate content

If no configuration is selected for a particular agent type, the system will use the default configuration or fall back to the system default.

## Data Structure

Each agent configuration includes:

```typescript
interface AgentConfig {
  id: string;
  name: string;
  agentType: 'ideation' | 'research' | 'content' | 'editor';
  workspaceId: string;
  instructions?: string;
  examples?: Array<{ input: string; output: string }>;
  parameters?: Record<string, any>;
  isDefault?: boolean;
  createdAt: string;
  updatedAt: string;
}
```

## API Integration

The agent configuration system interacts with the following API endpoints:

- `api.agentConfigs.getForWorkspace(workspaceId, agentType?)`: Get all configurations for a workspace, optionally filtered by agent type
- `api.agentConfigs.getById(id)`: Get a specific configuration by ID
- `api.agentConfigs.create(data)`: Create a new configuration
- `api.agentConfigs.update(id, data)`: Update an existing configuration
- `api.agentConfigs.delete(id)`: Delete a configuration 