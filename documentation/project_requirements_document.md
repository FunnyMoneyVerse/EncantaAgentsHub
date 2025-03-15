# Encanta Project Requirements Document

## 1. Project Overview

Encanta is an AI-powered content platform built to help startups and SMEs produce professional, strategically aligned content without the need for specialized marketing or technical AI skills. The platform combines the latest AI technology with strategic marketing expertise to empower businesses with both a self-service SaaS dashboard and high-touch consulting services. This hybrid model delivers a powerful content generation engine alongside expert support, ensuring users can quickly generate, review, and refine content that perfectly reflects their brand’s voice.

The purpose of Encanta is to simplify content creation by automating ideation, research, drafting, and editing through modular AI workflows. It is built to solve the complex problem of content production by offering guided onboarding for DIY users, personalized consultation options for more strategic needs, and a collaborative work environment for teams. Key objectives include delivering a consistent, intuitive user experience across both public and authenticated areas, ensuring high-quality output with reliable quality assurance mechanisms, and laying the foundation for future service integrations and workflow enhancements.

## 2. In-Scope vs. Out-of-Scope

### In-Scope

*   **Marketing Website**\
    • Dual-purpose public-facing site showcasing both the self-service platform and consulting services.\
    • Clear conversion paths for DIY users (guided onboarding, interactive demos, CTAs) and consulting clients (lead capture forms, scheduling options).
*   **SaaS Dashboard**\
    • Secure, authenticated area for users to manage workspaces and teams.\
    • Intuitive UI integrating guided walkthroughs for workspace creation and brand profile configuration.\
    • Real-time interfaces for content generation, file uploads, and collaboration.
*   **AI Agent System**\
    • Modular backend engine supporting tasks like ideation, research, drafting, and editing.\
    • Workflow orchestration that includes quality monitoring, fallback mechanisms, and potential human review when needed.\
    • Integration with external knowledge files and vector search (using Pinecone) to adapt outputs to brand voice and industry context.
*   **Workspace and Team Collaboration**\
    • Features including document sharing, version control, commenting, task management, and role-based access control.
*   **Brand Customization**\
    • Tools for configuring visual identity, tone & messaging, and live previews during content generation.
*   **Payment and Subscription Management**\
    • Stripe integration for defined subscription tiers, recurring billing, secure transactions, and customer portal for billing management.

### Out-of-Scope (For MVP or Later Phases)

*   Advanced analytics and comprehensive reporting dashboards (initially limited to admin-level metrics).
*   Detailed third-party integrations with platforms like WordPress, social media networks, or direct email marketing tools.
*   Extensive mass customization or community-generated templates beyond the initial set of demos and in-app tooltips.
*   Automated human review systems beyond basic fallback mechanisms (human review remains on a case-by-case basis for critical content).

## 3. User Flow

A new visitor lands on the engaging public-facing Encanta marketing website and is immediately introduced to two distinct paths: a guided process for DIY self-service users and dedicated CTAs for consulting service clients. The site features interactive demos, detailed value propositions, and prominently placed "Schedule a Consultation" or "Get Started" buttons. Depending on the user's preference, they are either directed to sign up for the self-service platform or to complete lead capture forms for personalized expert consultation.

After conversion, users register securely using Clerk and are taken to the SaaS dashboard. During onboarding, they are given an interactive, step-by-step walkthrough covering workspace creation, brand profile configuration, and content generation workflows. Inside the dashboard, users can access real-time AI-powered content creation tools, collaborate with team members via document sharing and commenting features, and manage workspaces with clear navigation. The user flow ensures a smooth transition from initial landing to continuous active engagement through guided steps and contextual assistance.

## 4. Core Features

*   **Dual-Mode Platform Architecture**\
    • A marketing website that communicates both self-service and consulting offerings.\
    • A secured SaaS dashboard for ongoing user and workspace management.
*   **Modular AI Workflows**\
    • Custom AI agents for ideation, research, drafting, and editing.\
    • Automated quality checks with fallback mechanisms and support for human review when needed.
*   **Workspace & Team Collaboration**\
    • Creation and management of multiple workspaces with role-based access controls.\
    • Real-time document editing, commenting, version control, and task management.
*   **Brand Customization & Profile Configuration**\
    • Tools to upload logos, select color palettes, and configure typography.\
    • Input guidelines for tone and messaging with a live preview for immediate feedback.
*   **Knowledge Management**\
    • File upload interfaces for storing external documents.\
    • Semantic search using vector embeddings via Pinecone for detailed contextual retrieval.
*   **Dynamic Content Generation Interface**\
    • Real-time progress tracking on AI tasks.\
    • User-friendly interfaces for content review, editing, and final approval.
*   **Payment and Subscription Management**\
    • Stripe integration for managing recurring subscriptions, trial periods, and customer billing.\
    • Self-service customer portal for subscription management and secure payments.
*   **Onboarding & Guided Tutorials**\
    • Interactive walkthroughs, pre-built templates, tooltips, and FAQ resources for both DIY and consulting clients.

## 5. Tech Stack & Tools

*   **Frontend Framework:** Next.js\
    • Coupled with Tailwind CSS for a modern, responsive, and mobile-friendly design.\
    • Organized directories: marketing pages under src/pages/marketing/ and authenticated dashboard under src/pages/app/.
*   **Backend Framework:** FastAPI (Python)\
    • Delivers high-performance, asynchronous API endpoints with robust background processing capabilities.
*   **Data & Storage:**\
    • Supabase for Postgres-based structured data and file storage.
*   **Authentication:**\
    • Clerk integration for secure user sign-up, login, and session management.
*   **AI & Data Processing:**\
    • Custom OpenAI agents (e.g., GPT o1, GPT 4o, GPT o3-mini) tuned for content generation tasks.\
    • Pinecone for vector embedding and semantic search across external knowledge files.
*   **Payments:**\
    • Stripe integration for managing subscriptions, billing events, webhooks, and customer portal management.
*   **Deployment & CI/CD:**\
    • Containerization (e.g., Docker) for backend services.\
    • Frontend deployments on platforms like Vercel/Netlify and backend on AWS/Heroku/DigitalOcean.\
    • Automated pipelines using GitHub Actions.
*   **IDE & Tools:**\
    • Cursor, Replit, V0 by Vercel, Expo, and Windsurf for enhanced development workflows and collaboration.

## 6. Non-Functional Requirements

*   **Performance:**\
    • The marketing site and SaaS dashboard must load quickly—aim for a target load time of under 2 seconds on modern devices.\
    • Backend endpoints should process AI tasks and user requests efficiently to handle multiple concurrent tasks.
*   **Security & Compliance:**\
    • PCI compliance via secure Stripe tools for payment processing.\
    • Data protection with encryption of sensitive data at rest and in transit.\
    • GDPR and CCPA compliance; implement user data controls, consent mechanisms, and robust audit logging.
*   **Scalability & Reliability:**\
    • Use caching and prompt optimization to manage AI API costs and handle increasing loads.\
    • Comprehensive quality monitoring and automated fallback mechanisms to ensure service reliability.
*   **Usability & Accessibility:**\
    • Adhere to WCAG 2.1 AA standards so all UI components, interactions, and navigations are accessible.\
    • Mobile-responsive design supporting all common device sizes, with clear navigation and contextual guidance.

## 7. Constraints & Assumptions

*   **Technical Dependencies:**\
    • The platform relies on the availability and performance of external AI models (OpenAI agents) and vector databases (Pinecone).\
    • Assumes stable internet connectivity for API calls and third-party service integrations (Stripe, Clerk).
*   **Design & Implementation Assumptions:**\
    • The MVP will focus on core content generation, workspace management, and basic AI workflows with room for future enhancements.\
    • The dual-mode approach (self-service vs. consulting) is expected to drive conversion, and the initial onboarding flows are critical for user retention.
*   **Development & Resource Limitations:**\
    • Advanced reporting features, in-depth analytics, and third-party integrations are deferred to later phases based on user feedback.\
    • Resource allocation is prioritized towards ensuring a consistent UX and robust backend infrastructure.

## 8. Known Issues & Potential Pitfalls

*   **API Rate Limits & Latency:**\
    • AI agent systems might face rate limits or slowdowns during peak times. Mitigation includes caching, prompt optimization, and potential load balancing.
*   **Integration Complexities:**\
    • Integrating multiple third-party services (Stripe, Clerk, Pinecone) could lead to synchronization issues or downtime. Regular monitoring and robust error handling are essential.
*   **User Experience & Onboarding:**\
    • Balancing simplicity for non-technical users with the power offered by advanced AI workflows may result in a learning curve. Iterative UX testing and responsive in-app tutorials will help minimize friction.
*   **Quality Assurance of AI Outputs:**\
    • Ensuring consistent, high-quality content generation may require fine-tuning of AI prompts and fallback triggers. Regular A/B testing and establishing clear quality metrics are recommended strategies.
*   **Data Privacy & Compliance:**\
    • Keeping up with evolving data privacy regulations such as GDPR and CCPA requires constant vigilance and possible future re-engineering of data handling procedures.

This document sets the clear boundaries and requirements for the Encanta platform, ensuring that every subsequent technical document has a well-defined blueprint to follow.
