# Changelog

All notable changes to the Encanta project will be documented in this file.

## [Unreleased]

### Added
- Dashboard components:
  - Workspace management with listing and creation pages
  - Knowledge management for uploading and managing files
  - Brand profile management with voice, color palette, and logo settings
  - Dashboard overview with summary statistics and recent activity
- Authentication improvements:
  - Clerk Authentication Integration
  - Catch-all routes for login and signup
  - SSO callback handling
  - Middleware for route protection
- API server with FastAPI:
  - Basic endpoints for workspaces
  - CORS configuration
  - Health check endpoint
- OpenAI integration for content generation
- Stripe payment flow for subscription management
- Supabase integration with Row Level Security (RLS) policies
- Subscription management page for viewing and managing subscriptions
- API routes for Stripe checkout and customer portal sessions
- API routes for handling Stripe webhooks
- Environment variables for OpenAI, Stripe, and Supabase
- Documentation for setting up Supabase RLS policies

### Changed
- Route matchers in middleware to use more precise patterns
- Improved SSO callback page to handle different redirect scenarios
- Updated API client to make real calls to the backend
- Replaced simulated content generation with actual API calls
- Updated content list page to fetch real data from the API
- Updated content creation page to use real API calls

### Fixed
- Authentication issues with Clerk:
  - Converted login and signup routes to catch-all routes (`[[...sign-in]]` and `[[...sign-up]]`)
  - Updated middleware for SSO callback routes
  - Fixed hydration errors in auth layout
  - Added proper OAuth callback handling
- Next.js configuration:
  - Removed deprecated options
  - Updated to use new syntax for external packages
- Fixed environment variables configuration for API and web app
- Fixed CORS configuration to use environment variables

## [0.2.0] - 2024-03-16

### Added
- Clerk Authentication Integration:
  - Updated root layout with ClerkProvider
  - Integrated Clerk SignIn and SignUp components in login and signup pages
  - Added authentication check in dashboard layout
  - Created middleware for route protection
  - Added UserButton in dashboard header
  - Created basic onboarding page
- UI Components:
  - Dropdown Menu component
  - Spinner component
  - Toast component
  - File Upload component
- Utility Functions:
  - API client for making authenticated requests
  - Storage helpers for managing Supabase storage paths
  - Date formatting and text manipulation utilities
- Supabase Integration:
  - Row Level Security (RLS) policies for storage buckets
  - Storage bucket naming conventions

### Changed
- Updated existing login and signup pages to use Clerk authentication
- Modified dashboard layout to check for authenticated users
- Enhanced middleware to handle authentication redirects

### Fixed
- Fixed middleware to use the correct Clerk authentication method
- Added onboarding route to public routes in middleware

## [0.1.1] - 2024-03-15

### Added
- Marketing section with responsive layout
- About page with company story, values, team section, and statistics
- Contact page with form and company information
- Features page with detailed feature sections and comparison table
- Pricing page with pricing table and FAQ section
- Authentication pages (login and signup) with form validation
- Navigation bar with mobile-responsive menu
- Footer with company info, navigation links, and newsletter signup
- CTA section component for use across marketing pages
- UI components (Checkbox, Tooltip, Accordion) for enhanced interactivity
- Analytics integration with PostHog
- Google Fonts integration (Montserrat and Roboto)
- Enhanced Tailwind configuration with custom animations and brand colors

### Image Requirements
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

### Placeholder Links
- Social media:
  - Twitter: https://twitter.com/encantaAI
  - LinkedIn: https://linkedin.com/company/encanta
  - Facebook: https://facebook.com/encantaAI
  - Instagram: https://instagram.com/encantaAI
- Demo booking: https://calendly.com/encanta/demo

## [0.1.0] - 2025-03-15

### Initial release
- Basic project structure
- Authentication setup
- Dashboard layout 