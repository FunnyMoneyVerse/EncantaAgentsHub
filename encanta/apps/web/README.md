# Encanta Web Application

This is the frontend web application for Encanta, built with Next.js, Tailwind CSS, and Shadcn UI components.

## Features

- **Workspaces Management**: Create and manage workspaces for different brands or projects
- **Content Management**: Create, edit, view, and manage content within workspaces
- **User Authentication**: Secure authentication using Clerk
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Error Handling**: Robust error handling and user feedback
- **API Integration**: Seamless connection to the Encanta API

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Set up environment variables:

Create a `.env.local` file with the following variables:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3004
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
```

### Development

```bash
npm run dev
# or
yarn dev
```

This will start the development server at http://localhost:3000.

## Project Structure

- `src/app`: Next.js application routes
  - `(dashboard)`: Dashboard routes (protected)
  - `(marketing)`: Marketing and public routes
  - `(auth)`: Authentication routes
- `src/components`: Reusable UI components
  - `ui`: Core UI components based on Shadcn
- `src/lib`: Utility functions and hooks
  - `api.ts`: API client for making requests to the backend
  - `workspace-store.ts`: Global state management for workspaces

## API Client

The application uses a custom API client that handles authentication and error management. The client provides:

- Typed request methods (get, post, put, delete)
- Error handling with descriptive messages
- Toast notifications for various error states
- Support for both direct endpoints and API-prefixed paths

## Recent Updates

- Enhanced error handling in the API client
- Improved UI feedback for loading and error states
- Added retry functionality for failed API requests
- Updated workspace and content components to better handle API errors
- Fixed API connectivity issues 