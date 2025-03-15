#!/bin/bash

# Create a backup of the original package.json
cp package.json package.json.bak

# Create a new package.json that forwards commands to the monorepo
cat > package.json << 'EOF'
{
  "name": "encanta-agents-hub-root",
  "version": "0.1.0",
  "private": true,
  "description": "Root package.json for Encanta Agents Hub monorepo",
  "scripts": {
    "dev": "cd encanta && npm run dev",
    "build": "cd encanta && npm run build",
    "start": "cd encanta && npm run start",
    "lint": "cd encanta && npm run lint",
    "format": "cd encanta && npm run format",
    "test": "cd encanta && npm run test"
  },
  "author": "",
  "license": "MIT"
}
EOF

echo "Updated root package.json to forward commands to the monorepo."
echo "Original package.json has been backed up as package.json.bak." 