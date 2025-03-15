# Encanta - AI-Driven Content Platform for SMEs

Encanta is an AI-powered content platform built to help startups and SMEs produce professional, strategically aligned content without the need for specialized marketing or technical AI skills. The platform combines the latest AI technology with strategic marketing expertise to empower businesses with both a self-service SaaS dashboard and high-touch consulting services.

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

- Node.js (v20.2.1 or later)
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
   - Copy `.env.example` to `.env.local`
   - Fill in the required environment variables

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

- `actions` - Server actions
  - `db` - Database related actions
  - Other actions
- `app` - Next.js app router
  - `api` - API routes
  - `(marketing)` - Marketing pages
  - `(auth)` - Authentication pages
  - `(dashboard)` - Dashboard pages
- `components` - Shared components
  - `ui` - UI components
  - `utilities` - Utility components
- `db` - Database
  - `schema` - Database schemas
- `lib` - Library code
  - `hooks` - Custom hooks
- `public` - Static assets
- `types` - Type definitions

## License

This project is licensed under the MIT License - see the LICENSE file for details.

# Encanta Agents Hub

This project is structured as a monorepo using npm workspaces. The main code is located in the `encanta` directory.

## Project Structure

```
encanta/
├── apps/
│   ├── web/         # Next.js web application
│   └── api/         # FastAPI backend (if applicable)
├── packages/        # Shared packages
└── config/          # Shared configuration
```

## Development

To start the development server:

```bash
npm run dev
```

This will start the development servers for all workspaces.

## Building

To build all applications:

```bash
npm run build
```

## Starting in Production Mode

To start the applications in production mode:

```bash
npm run start
```

## Project History

This project was originally structured as a standalone Next.js application. It has been migrated to a monorepo structure to better support multiple applications and shared packages.

The migration was performed using scripts in the `migration_scripts` directory. The original files have been preserved in the root directory for reference, but all active development should now take place in the `encanta` directory.

## License

MIT
