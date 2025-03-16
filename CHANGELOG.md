# Changelog

All notable changes to the Encanta project will be documented in this file.

## [Unreleased]

### Added
- Created dashboard overview page with:
  - Summary statistics (content count, team members, workspace activity)
  - Recent content list
  - Recent activity list
  - Quick access to content creation
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
- Agent Configuration Management
  - Created agent configuration listing page with filtering by agent type
  - Implemented agent configuration creation page with support for different agent types
  - Added agent configuration editing functionality
  - Integrated agent configurations with content generation process
  - Added form for customizing agent behavior with instructions and examples
  - Implemented default configuration selection for each agent type
  - Added database schema and API endpoints for agent configurations
  - Created server actions for CRUD operations on agent configurations
- Enhanced Knowledge Management System:
  - Improved document processing with better chunking and metadata extraction
  - Added support for different file types (PDF, CSV, DOCX, TXT, MD)
  - Implemented file processing status indicators in the UI
  - Created knowledge file preview component to view processed chunks
  - Enhanced vector search functionality with improved query handling

### Changed
- Updated route matchers in middleware to use more precise patterns
- Improved SSO callback page to handle different redirect scenarios
- Updated existing login and signup pages to use Clerk authentication
- Modified dashboard layout to check for authenticated users
- Enhanced middleware to handle authentication redirects

### Fixed
- Fixed middleware to use the correct Clerk authentication method
- Added onboarding route to public routes in middleware
- Fixed authentication issues with Clerk:
  - Converted login and signup routes to catch-all routes (`[[...sign-in]]` and `[[...sign-up]]`) to properly handle Clerk authentication
  - Updated middleware to correctly handle SSO callback routes
  - Fixed hydration errors in auth layout
  - Added proper OAuth callback handling with `AuthenticateWithRedirectCallback`
- Fixed pricing and features pages by removing "use server" directives that were causing runtime errors
- Added missing public routes to middleware (cookies, privacy, terms)

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

## [Unreleased - Previous Updates]

### Added
- Database schemas:
  - `workspaces-schema.ts`: For managing workspaces
  - `brand-profiles-schema.ts`: For storing brand profile information
  - `documents-schema.ts`: For document management
  - `comments-schema.ts`: For document comments
  - `team-members-schema.ts`: For team member management with role-based access
  - `content-projects-schema.ts`: For content project management
  - `knowledge-files-schema.ts`: For knowledge file management
  - `subscriptions-schema.ts`: For subscription management
- Server actions:
  - Workspaces: CRUD operations for workspace management
  - Brand Profiles: CRUD operations for brand profile management
- Marketing pages:
  - Home page: With hero section, features section, and pricing section
  - Pricing page: Detailed pricing information
  - Contact page: Contact form and contact information
  - About page: Company information and values
- Components:
  - `HeroSection`: Hero section for the landing page
  - `FeaturesSection`: Features section for the landing page
  - `PricingSection`: Pricing section for the landing page
- Shared packages structure:
  - `@encanta/ui`: For shared UI components
  - `@encanta/utils`: For shared utility functions
  - `@encanta/config`: For shared configuration

### Changed
- Migrated project to a monorepo structure using npm workspaces
  - Reorganized code into `apps/web`, `apps/api`, and `packages` directories
  - Updated build and development scripts to support the monorepo
  - Created a unified README with comprehensive documentation
- Updated project structure to a more modular approach with separate directories for frontend and backend

### Fixed
- Various linter errors related to missing type declarations

## [0.1.0] - 2025-03-15

### Added
- Initial project setup with Next.js
- Basic directory structure
- Environment configuration
- Database connection setup 