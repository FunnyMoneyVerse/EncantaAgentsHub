# Changelog

All notable changes to the Encanta project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2024-03-19

### Added
- Full content management functionality
  - Content listing, viewing, and creation
  - Support for various content types (blog, email, document)
  - Content status tracking (draft, review, published, archived)
- Content API endpoints
  - `/content/workspace/{workspace_id}` to retrieve workspace content
  - `/content/{content_id}` to get specific content items
  - Content creation and update endpoints
- Debug endpoint for troubleshooting content issues
- SQLite database service for persistent content storage
- Mock data generation for testing purposes
- Empty state components for zero-content scenarios

### Fixed
- API Error handling improvements to provide clear feedback on 404 and other errors
- Fixed workspace content retrieval issues
- Enhanced error state handling in UI components
- Improved API client with better error management
- Fixed database connection and initialization
- Environment variable configuration for proper API connectivity
- Added retry functionality for failed API requests

### Changed
- Migrated from in-memory to file-based SQLite database
- Enhanced content JSON parsing and storage
- Updated workspace detail page with improved error handling
- Improved UI feedback during loading and error states

## [0.1.0] - 2024-03-01

### Added
- Initial project setup with Next.js frontend and FastAPI backend
- Workspace management functionality
- User authentication with Clerk
- Basic API structure and endpoints
- UI components with Tailwind and Shadcn 