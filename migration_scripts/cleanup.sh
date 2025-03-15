#!/bin/bash

# This script is used to clean up after the migration
# It will remove the original files that have been migrated to the monorepo
# WARNING: Only run this after you have verified that the migration was successful

echo "This script will remove the original files that have been migrated to the monorepo."
echo "WARNING: Only run this after you have verified that the migration was successful."
echo "Press Ctrl+C to cancel or Enter to continue..."
read

# Create a backup directory
BACKUP_DIR="pre_monorepo_backup_$(date +%Y%m%d%H%M%S)"
mkdir -p "$BACKUP_DIR"

# Move original directories to the backup
mv actions "$BACKUP_DIR/"
mv app "$BACKUP_DIR/"
mv components "$BACKUP_DIR/"
mv db "$BACKUP_DIR/"
mv lib "$BACKUP_DIR/"
mv types "$BACKUP_DIR/"
mv hooks "$BACKUP_DIR/"
mv public "$BACKUP_DIR/"
mv prompts "$BACKUP_DIR/"

# Move original config files to the backup
mv .env.local "$BACKUP_DIR/"
mv .env.example "$BACKUP_DIR/"
mv next.config.mjs "$BACKUP_DIR/"
mv tailwind.config.ts "$BACKUP_DIR/"
mv postcss.config.mjs "$BACKUP_DIR/"
mv drizzle.config.ts "$BACKUP_DIR/"
mv components.json "$BACKUP_DIR/"
mv middleware.ts "$BACKUP_DIR/"

echo "Original files have been moved to $BACKUP_DIR"
echo "Migration cleanup complete." 