# Encanta Monorepo

This is the main monorepo for the Encanta Agents Hub project. It contains all the applications and shared packages.

## Structure

- `apps/web`: Next.js web application
- `apps/api`: FastAPI backend (if applicable)
- `packages`: Shared packages
- `config`: Shared configuration

## Development

### Prerequisites

- Node.js 18+
- npm 8+
- PostgreSQL 14+

### Setup

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp apps/web/.env.example apps/web/.env.local
```

3. Start the development server:

```bash
npm run dev
```

### Available Scripts

- `npm run dev`: Start all development servers
- `npm run dev:web`: Start only the web development server
- `npm run dev:api`: Start only the API development server
- `npm run build`: Build all applications
- `npm run start`: Start all applications in production mode

## Architecture

The Encanta Agents Hub is built with a modern tech stack:

- **Frontend**: Next.js, Tailwind CSS, Shadcn UI
- **Backend**: Supabase, Drizzle ORM
- **Authentication**: Clerk
- **Payments**: Stripe

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

MIT 