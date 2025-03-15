# Encanta - AI-Driven Content Platform for SMEs

Encanta is an AI-powered content platform built to help startups and SMEs produce professional, strategically aligned content without the need for specialized marketing or technical AI skills. The platform combines the latest AI technology with strategic marketing expertise to empower businesses with both a self-service SaaS dashboard and high-touch consulting services.

## Monorepo Structure

This project is organized as a monorepo using npm workspaces. The main structure is:

```
encanta/                      # Root monorepo directory
├── apps/                     # Applications
│   ├── web/                  # Next.js web application
│   │   ├── src/              # Source code
│   │   │   ├── actions/      # Server actions
│   │   │   ├── app/          # Next.js app router
│   │   │   ├── components/   # UI components
│   │   │   ├── db/           # Database schemas and utilities
│   │   │   ├── lib/          # Utility functions
│   │   │   ├── styles/       # Global styles
│   │   │   └── types/        # TypeScript type definitions
│   │   ├── public/           # Static assets
│   │   └── package.json      # Web app dependencies
│   └── api/                  # API server (if applicable)
├── packages/                 # Shared packages
│   ├── ui/                   # Shared UI components
│   ├── utils/                # Shared utility functions
│   └── config/               # Shared configuration
└── package.json              # Root package.json for workspace management
```

## Features

- **Dual-Mode Platform Architecture**: A marketing website that communicates both self-service and consulting offerings, and a secured SaaS dashboard for ongoing user and workspace management.
- **Modular AI Workflows**: Custom AI agents for ideation, research, drafting, and editing with automated quality checks and fallback mechanisms.
- **Workspace & Team Collaboration**: Creation and management of multiple workspaces with role-based access controls, real-time document editing, commenting, version control, and task management.
- **Brand Customization & Profile Configuration**: Tools to upload logos, select color palettes, and configure typography with input guidelines for tone and messaging.
- **Knowledge Management**: File upload interfaces for storing external documents with semantic search using vector embeddings via Pinecone for detailed contextual retrieval.
- **Dynamic Content Generation Interface**: Real-time progress tracking on AI tasks with user-friendly interfaces for content review, editing, and final approval.
- **Payment and Subscription Management**: Stripe integration for managing recurring subscriptions, trial periods, and customer billing.
- **Onboarding & Guided Tutorials**: Interactive walkthroughs, pre-built templates, tooltips, and FAQ resources for both DIY and consulting clients.

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS, Shadcn, Framer Motion
- **Backend**: Supabase, Drizzle ORM, Server Actions
- **Authentication**: Clerk
- **Payments**: Stripe
- **Analytics**: PostHog
- **AI & Data Processing**: Custom OpenAI agents, Pinecone for vector embedding and semantic search
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm (v8+ recommended)
- PostgreSQL database
- Clerk account for authentication
- Stripe account for payments
- PostHog account for analytics
- OpenAI API key
- Pinecone account for vector search

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/encanta.git
   cd encanta
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp encanta/apps/web/.env.example encanta/apps/web/.env.local
   ```
   Then edit the `.env.local` file with your API keys and configuration.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the web app.

## Available Scripts

From the root directory, you can run:

- `npm run dev` - Start all development servers
- `npm run dev:web` - Start only the web development server
- `npm run dev:api` - Start only the API development server
- `npm run build` - Build all applications
- `npm run start` - Start all applications in production mode
- `npm run lint` - Run linting on all workspaces
- `npm run format` - Format code with Prettier

## Working with the Monorepo

### Adding a New Feature to the Web App

1. Navigate to the web app directory:
   ```bash
   cd encanta/apps/web/src
   ```

2. Create your new component, page, or feature
   ```bash
   # Example: Creating a new component
   mkdir -p components/NewFeature
   touch components/NewFeature/index.tsx
   ```

3. Import and use shared packages if needed:
   ```tsx
   // Example: Using a shared UI component
   import { Button } from "@encanta/ui";
   ```

### Creating a Shared Package

1. Create a new directory in the packages folder:
   ```bash
   mkdir -p encanta/packages/my-package
   ```

2. Initialize the package:
   ```bash
   cd encanta/packages/my-package
   npm init -y
   ```

3. Update the package.json to use the @encanta scope:
   ```json
   {
     "name": "@encanta/my-package",
     "version": "0.1.0",
     "private": true
   }
   ```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

MIT
