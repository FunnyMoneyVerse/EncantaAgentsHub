# Encanta API

This is the backend API for Encanta, built with FastAPI and SQLite (for development).

## Features

- **Workspace Management**: Create, retrieve, and manage workspaces
- **Content Management**: Store and retrieve content for workspaces
- **Database Service**: SQLite database with async operations
- **Error Handling**: Comprehensive error handling and logging
- **Mock Data**: Seeding capabilities for testing
- **CORS Support**: Configured for cross-origin requests
- **Debug Endpoints**: Special endpoints for troubleshooting

## Getting Started

### Prerequisites

- Python 3.8+
- pip

### Installation

1. Install dependencies:

```bash
pip install -r requirements.txt
```

2. Set up environment variables:

Create a `.env.local` file with the following variables:

```
SQLITE_DB_PATH=./database.sqlite
CORS_ORIGINS=http://localhost:3000,http://localhost:3002
```

### Development

```bash
python simple_main.py
```

This will start the API server at http://localhost:3004.

## Project Structure

- `app`: Main application package
  - `api`: API routes and dependencies
    - `routes`: Route handlers for different endpoints
    - `models`: Pydantic models for request/response validation
  - `services`: Core services
    - `db.py`: Database service for SQLite operations
  - `utils`: Utility functions
  - `core`: Core application components
    - `logging.py`: Logging configuration

## API Endpoints

### Workspaces

- `GET /workspaces`: Get all workspaces
- `GET /workspaces/{workspace_id}`: Get a workspace by ID
- `POST /workspaces`: Create a new workspace

### Content

- `GET /content/workspace/{workspace_id}`: Get all content for a workspace
- `GET /content/{content_id}`: Get a specific content item
- `POST /content`: Create a new content item

### Debug

- `GET /debug/content/{workspace_id}`: Debug endpoint to directly access content

## Database

The API uses a SQLite database for development, which can be found at the path specified in the `SQLITE_DB_PATH` environment variable. The database is initialized with tables for workspaces and content when the server starts.

## Recent Updates

- Added content model and endpoints
- Implemented SQLite database service with async support
- Added debug endpoints for troubleshooting
- Fixed database initialization and connection issues
- Enhanced error handling and logging
- Added mock data generation for testing

## Overview

Encanta API provides the backend services for the Encanta platform, including:

- Content generation using AI
- Workspace management
- Knowledge base management
- Brand profile management
- Agent configuration
- Dual-mode experience (self-service and consulting)

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- Supabase account
- OpenAI API key
- Pinecone account

### Installation

1. Clone the repository
2. Navigate to the API directory: `cd encanta/apps/api`
3. Copy the example environment file: `cp .env.example .env.local`
4. Update the environment variables in `.env.local` with your API keys
5. Make the start script executable: `chmod +x start_backend.sh`
6. Run the start script: `./start_backend.sh`

The API will be available at `http://localhost:3004`.

## Database Setup

### Option 1: Using the Web Interface (Recommended)

You can create and manage data directly through the web interface. The application provides forms and interfaces for:

1. Creating workspaces
2. Managing workspace members
3. Creating and editing content
4. Uploading knowledge files
5. Configuring brand profiles
6. Setting up agent configurations

This is the recommended approach as it ensures data integrity and proper relationships between entities.

### Option 2: Direct Database Setup

If you prefer to set up the database directly, you can use the SQL scripts provided in the `scripts/db` directory:

1. Connect to your Supabase project
2. Run the SQL scripts in the SQL Editor
3. Verify that the tables have been created successfully

```sql
-- Example of creating the workspaces table
CREATE TABLE workspaces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  industry TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Additional tables...
```

## API Endpoints

### Content

- `GET /api/content/workspace/{workspace_id}` - Get content for a workspace
- `POST /api/content` - Create new content
- `POST /api/content/generate` - Generate content using AI
- `GET /api/content/task/{task_id}` - Get the status of a content generation task

### Workspaces

- `GET /api/workspaces` - Get all workspaces for the current user
- `GET /api/workspaces/{workspace_id}` - Get workspace details
- `POST /api/workspaces` - Create a new workspace
- `PUT /api/workspaces/{workspace_id}` - Update a workspace

### Knowledge

- `GET /api/knowledge/workspace/{workspace_id}` - Get knowledge items for a workspace
- `POST /api/knowledge` - Add a new knowledge item
- `DELETE /api/knowledge/{knowledge_id}` - Delete a knowledge item

### Agent Configs

- `GET /api/agent-configs/workspace/{workspace_id}` - Get agent configurations for a workspace
- `POST /api/agent-configs` - Create a new agent configuration
- `PUT /api/agent-configs/{config_id}` - Update an agent configuration

### Brand

- `GET /api/brand/workspace/{workspace_id}` - Get brand profile for a workspace
- `POST /api/brand` - Create a new brand profile
- `PUT /api/brand/{profile_id}` - Update a brand profile

### Modes (Dual-Mode Experience)

- `GET /api/modes/workspace/{workspace_id}/mode` - Get the current mode for a workspace
- `PUT /api/modes/workspace/{workspace_id}/mode` - Update the mode for a workspace
- `GET /api/modes/workspace/{workspace_id}/consultants` - Get consultants for a workspace
- `POST /api/modes/workspace/{workspace_id}/consultants` - Add a consultant to a workspace
- `DELETE /api/modes/workspace/{workspace_id}/consultants/{consultant_id}` - Remove a consultant from a workspace
- `POST /api/modes/workspace/{workspace_id}/request-consultation` - Request a consultation
- `GET /api/modes/consultations` - Get consultation requests for a consultant
- `PUT /api/modes/consultations/{request_id}` - Update a consultation request

## Dual-Mode Experience

Encanta offers a dual-mode experience for content creation:

### Self-Service Mode

In self-service mode, users can:

- Generate content using AI without human intervention
- Configure AI agents to match their specific needs
- Manage their knowledge base and brand profile
- Create and edit content independently

### Consulting Mode

In consulting mode, users can:

- Work with human experts alongside AI
- Request consultations on specific content pieces
- Get expert feedback and improvements
- Collaborate with specialists in content creation, SEO, and marketing

### Switching Modes

Workspace administrators can switch between modes using the API or the web interface. Both modes can be enabled simultaneously, allowing users to choose the appropriate approach for each content project.

## Testing

To test the API:

1. Start the API server: `./start_backend.sh`
2. Run the test scripts:
   - `python test_api.py` - Test basic API endpoints
   - `python test_content_workflow.py` - Test content generation workflow
   - `python test_dual_mode.py` - Test dual-mode functionality

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify that your Supabase URL and key are correctly set in the `.env.local` file
   - Check that your Supabase project is active and accessible

2. **OpenAI API Errors**
   - Ensure your OpenAI API key is valid and has sufficient credits
   - Check that the models specified in the agent configurations are available to your account

3. **Missing Tables**
   - If you encounter errors about missing tables, ensure you've either:
     - Created the necessary data through the web interface
     - Run the SQL scripts to set up the database directly

### Development Mode

During development, the API can run in a testing mode that uses mock data instead of connecting to Supabase:

1. Set `ENVIRONMENT=testing` in your `.env.local` file
2. Start the API server
3. The API will use mock data for all operations

This is useful for development and testing without affecting your production database.

## License

Proprietary - All rights reserved 