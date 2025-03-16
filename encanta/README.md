# Encanta Monorepo

This is the main monorepo for the Encanta Agents Hub project. It contains all the applications and shared packages.

## Documentation Structure

This project maintains two sets of documentation files:

1. **Root Documentation** (`/README.md` and `/CHANGELOG.md`): Contains comprehensive project documentation and history.
2. **Monorepo Documentation** (this README and CHANGELOG): Contains information specific to the monorepo structure.

For more information about this structure, see:
- [/README-STRUCTURE.md](../README-STRUCTURE.md) - Explains the dual README structure
- [/CHANGELOG-STRUCTURE.md](../CHANGELOG-STRUCTURE.md) - Explains the dual CHANGELOG structure

## Structure

- `apps/web`: Next.js web application
- `apps/api`: FastAPI backend (if applicable)
- `packages`: Shared packages
- `config`: Shared configuration

## Marketing Section

The marketing section of the website includes:

- **Home Page**: Landing page with hero section, features, testimonials, pricing preview, and CTA
- **About Page**: Company story, values, team section, and statistics
- **Contact Page**: Contact form, company information, and office location
- **Features Page**: Detailed feature sections, comparison table, and CTA
- **Pricing Page**: Pricing plans, feature comparison, FAQ section, and CTA

## Authentication Pages

The authentication section includes:

- **Login Page**: Email/password login with social login options
- **Signup Page**: New account registration with form validation
- **Reset Password**: (Coming soon)

### Image Requirements

The following images need to be added to the project:

- `/public/images/social-card.png` (1200x630px) - For social media sharing
- `/public/images/team/naeem.jpg` - Founder's photo (square aspect ratio recommended)
- `/public/images/about/founding-story.jpg` - Visual representation of Encanta's founding story (4:3 aspect ratio)
- `/public/images/features/ai-workflows-detailed.png` - AI workflows feature image (4:3 aspect ratio)
- `/public/images/features/team-collaboration-detailed.png` - Team collaboration feature image (4:3 aspect ratio)
- `/public/images/features/brand-voice-detailed.png` - Brand voice feature image (4:3 aspect ratio)
- `/public/images/features/knowledge-management-detailed.png` - Knowledge management feature image (4:3 aspect ratio)
- `/public/images/features/content-generation-detailed.png` - Content generation feature image (4:3 aspect ratio)
- `/public/images/features/integrations-detailed.png` - Integrations feature image (4:3 aspect ratio)
- `/public/images/auth/dashboard-preview.jpg` - Dashboard preview image for login page (4:3 aspect ratio)

See `docs/IMAGE_GUIDELINES.md` for detailed specifications.

### Placeholder Links

The following placeholder links are used throughout the marketing section:

- **Social Media**:
  - Twitter: https://twitter.com/encantaAI
  - LinkedIn: https://linkedin.com/company/encanta
  - Facebook: https://facebook.com/encantaAI
  - Instagram: https://instagram.com/encantaAI
- **Demo Booking**: https://calendly.com/encanta/demo

See `docs/PLACEHOLDER_LINKS.md` for details on updating these links.

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
- **Analytics**: PostHog

## Environment Variables

The following environment variables are required:

```
# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

MIT 