# Backend Structure Document for Encanta

This document outlines the backend components of Encanta, the AI-powered content platform for startups and SMEs. It is written in everyday language so that everyone, regardless of their technical background, can easily understand the backend setup and infrastructure.

## 1. Backend Architecture

Encanta's backend is designed using modern patterns to ensure scalability, ease of maintenance, and high performance. Here are the key points:

*   **Design Patterns and Frameworks:**

    *   Uses the FastAPI framework (written in Python) for building API endpoints.
    *   Follows a modular design so that various components (like AI workflows, authentication, and workspace management) can be independently developed and maintained.

*   **How it Supports the Project:**

    *   **Scalability:** The separation of concerns and modular design allow new features or additional users to be added with minimal impact on existing systems.
    *   **Maintainability:** Clear divisions in the codebase make it easier to track and update specific parts, as needed.
    *   **Performance:** FastAPI is known for its speed and asynchronous support which helps handle multiple requests without slowdowns.

## 2. Database Management

Encanta uses modern database management practices with a mix of SQL and NoSQL technologies.

*   **Technologies Used:**

    *   **SQL Database:** PostgreSQL (managed through Supabase) is used for structured data such as user profiles, subscriptions, and team collaboration details.
    *   **File Storage:** Supabase also handles file storage for attachments and data uploads.
    *   **NoSQL/Vector Search:** Pinecone is used for semantic search on uploaded documents, providing fast, intelligent search based on vector embeddings.

*   **Data Practices:**

    *   Data is securely stored with encryption at rest and in transit.
    *   Structured data is organized with tables for easily storing and retrieving records, while search data uses vectorized representations for efficient look-up.
    *   Regular backups and audit logging help maintain data integrity and security.

## 3. Database Schema

For the SQL database in PostgreSQL, here's a simplified version of the schema:

`-- Users Table CREATE TABLE users ( id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, password_hash VARCHAR(255) NOT NULL, role VARCHAR(50) NOT NULL, -- Example: admin, editor, viewer created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ); -- Workspaces Table CREATE TABLE workspaces ( id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, brand_id INTEGER, -- Reference to brand profile created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ); -- Documents Table CREATE TABLE documents ( id SERIAL PRIMARY KEY, workspace_id INTEGER REFERENCES workspaces(id), title VARCHAR(255) NOT NULL, content TEXT, version INTEGER DEFAULT 1, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ); -- Comments Table CREATE TABLE comments ( id SERIAL PRIMARY KEY, document_id INTEGER REFERENCES documents(id), user_id INTEGER REFERENCES users(id), comment TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ); -- Subscriptions Table CREATE TABLE subscriptions ( id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(id), subscription_tier VARCHAR(50), -- Free, Starter, Professional, Business, Enterprise billing_cycle VARCHAR(50), -- Monthly, Annual started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ); -- Audit Logs Table CREATE TABLE audit_logs ( id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(id), action VARCHAR(255), timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP );`

For non-SQL components like semantic search, a NoSQL-like approach is used where data is stored in Pinecone with vector embeddings to facilitate fast and efficient search operations.

## 4. API Design and Endpoints

Encanta’s backend exposes a collection of API endpoints developed using FastAPI. They can be broadly categorized as follows:

*   **API Approach:**

    *   Follows RESTful design principles for clear, resource-oriented endpoints.

*   **Key Endpoints Include:**

    *   **Authentication:** Endpoints to login, logout, and verify tokens, integrated with Clerk.
    *   **Workspace Management:** Endpoints for creating, retrieving, updating, and deleting workspaces and related content.
    *   **AI Workflow Triggering:** Endpoints to initiate, monitor, and manage AI-based tasks (for drafting, editing, etc.).
    *   **File and Knowledge Management:** Endpoints to upload files and manage integration with Pinecone for semantic search.
    *   **Subscription and Payment:** Endpoints to handle subscription actions with Stripe, including webhook event handlers for billing updates.

These endpoints ensure the frontend (whether part of the SaaS dashboard or public website) can seamlessly interact with the backend to retrieve or update data.

## 5. Hosting Solutions

Encanta’s backend is hosted using cloud providers to ensure high availability and cost-effectiveness.

*   **Hosting Options:**

    *   Options include AWS, Heroku, or DigitalOcean based on scalability and cost management needs.
    *   This flexibility means the backend can be scaled up during high demand or tuned for cost-savings when needed.

*   **Benefits:**

    *   **Reliability:** Cloud hosting providers are known for high uptime and robust infrastructure.
    *   **Scalability:** Resources can be quickly adjusted based on traffic, ensuring a smooth user experience.
    *   **Cost-Effectiveness:** Pay-as-you-go pricing helps reduce upfront costs and only scales as usage increases.

## 6. Infrastructure Components

A robust infrastructure supports Encanta’s backend to ensure a smooth and fast user experience.

*   **Load Balancers:** Distribute incoming traffic across multiple instances to ensure no single server is overwhelmed.
*   **Caching Mechanisms:** Use caching to store frequently accessed data, reducing load on the database and increasing response speed.
*   **Content Delivery Networks (CDNs):** Help deliver static assets (like images or CSS files) faster to users around the world.
*   **Background Processing:** Handles long-running AI tasks in the background to keep the main API responsive.

These components work together to achieve high performance, resiliency, and efficient resource usage.

## 7. Security Measures

Security is a top priority for Encanta to protect user data and ensure regulatory compliance.

*   **Protocols and Practices:**

    *   **Authentication and Authorization:**

        *   Utilizes Clerk for secure authentication.
        *   Role-based access control (RBAC) is implemented to ensure users only access what they’re permitted to.

    *   **Data Encryption:**

        *   Data is encrypted both at rest (in databases and file storage) and in transit (using HTTPS and secure protocols).

    *   **Audit Logging:** Tracks user actions to help detect and respond to suspicious activities.

    *   **Regular Security Audits:** Periodic checks and updates to security measures to ensure compliance with GDPR, CCPA, and other regulations.

## 8. Monitoring and Maintenance

To keep Encanta running smoothly, several tools and strategies are employed for regular monitoring and maintenance.

*   **Monitoring Tools:**

    *   Uses logging and monitoring tools (integrated with cloud provider services) to keep track of server performance, errors, and usage patterns.
    *   Real-time dashboards help visualize health metrics and performance indicators.

*   **Maintenance Strategies:**

    *   Routine updates and patches ensure the backend remains secure and efficient.
    *   CI/CD pipelines (using GitHub Actions) automate testing and deployment, reducing downtime and ensuring that new features or fixes are rolled out smoothly.

## 9. Conclusion and Overall Backend Summary

Encanta’s backend is built with a focus on clarity, speed, and security, ensuring a seamless experience for both the DIY self-service users and consulting clients. Here's a quick recap:

*   **Architecture:** Modular design with FastAPI, ensuring scalability and maintainability.
*   **Database Management:** Combines PostgreSQL (via Supabase) for structured data and Pinecone for vector-based semantic search.
*   **API Endpoints:** RESTful endpoints handle everything from authentication and workspace management to AI operations and payment processing.
*   **Hosting and Infrastructure:** Deployed on cloud platforms with load balancers, caching, and CDNs for enhanced performance.
*   **Security:** Robust measures including role-based access, encryption, and regular audits to protect data.
*   **Monitoring and Maintenance:** Leveraging CI/CD pipelines and real-time monitoring tools to keep the system healthy and updated.

This carefully planned backend setup not only supports Encanta’s current needs but also positions the platform for future growth and feature additions, ensuring it remains a competitive tool for content creation and management.

By integrating modern frameworks, cloud solutions, and comprehensive security protocols, Encanta offers a backend that is robust, efficient, and ready to support ambitious AI-powered content workflows.
