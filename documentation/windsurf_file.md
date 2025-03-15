# .windsurfrules

## Project Overview

*   **Type:** windsurf_file
*   **Description:** Encanta is an AI-powered content platform that empowers startups and SMEs to produce professional, strategically aligned content without requiring specialized marketing or technical AI expertise. The platform combines a self-service SaaS dashboard with expert consulting services, streamlining content ideation, generation, and strategic refinement.
*   **Primary Goal:** Simplify content creation by automating ideation, research, drafting, and editing through modular AI workflows while providing an intuitive, guided onboarding experience.

## Project Structure

### Framework-Specific Routing

*   **Directory Rules:**

    *   [Next.js (Pages Router)]: Uses a flat file structure under the src/pages directory where public marketing pages reside in src/pages/marketing and authenticated dashboard pages are organized in src/pages/app, following the pages/[route].tsx pattern.
    *   Example 1: "Next.js 14 (App Router)" → app/[route]/page.tsx conventions
    *   Example 2: "Next.js (Pages Router)" → pages/[route].tsx pattern
    *   Example 3: "React Router 6" → src/routes/ with createBrowserRouter

### Core Directories

*   **Versioned Structure:**

    *   [src/pages/marketing]: Contains public-facing marketing pages that showcase platform features and conversion pathways for both self-service and consulting services.
    *   [src/pages/app]: Hosts the authenticated SaaS dashboard where users manage workspaces, collaborate, and initiate AI-powered content workflows.

### Key Files

*   **Stack-Versioned Patterns:**

    *   [pages/_app.js]: Used for customizing global behaviors and styles in the Next.js Pages Router setup.
    *   Example 1: app/dashboard/layout.tsx → Next.js 14 root layouts (for App Router projects)
    *   Example 2: pages/_app.js → Next.js Pages Router customization

## Tech Stack Rules

*   **Version Enforcement:**

    *   [next@latest]: Next.js is used following the Pages Router pattern, ensuring that all public and authenticated routes align with this flat file structure; mixing App Router conventions is not permitted.

## PRD Compliance

*   **Non-Negotiable:**

    *   "Implement strict data privacy policies, obtain user consent, and provide mechanisms for users to access, correct, or delete their data." → This ensures that all components comply with GDPR, CCPA, and WCAG 2.1 AA standards while upholding robust security practices consistently across the platform.

## App Flow Integration

*   **Stack-Aligned Flow:**

    *   Example: "Next.js Pages Router Auth Flow → src/pages/app/signin.tsx uses Clerk for secure user authentication and directs users to a guided onboarding experience within the SaaS dashboard."
