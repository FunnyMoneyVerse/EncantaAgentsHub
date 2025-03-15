# Changelog

All notable changes to the Encanta project will be documented in this file.

## [Unreleased]

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

## [0.1.0] - Initial Setup

### Added
- Initial project setup with Next.js
- Basic directory structure
- Environment configuration
- Database connection setup 