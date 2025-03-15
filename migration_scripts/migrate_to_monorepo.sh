#!/bin/bash

# Create a log file
LOG_FILE="migration_log.txt"
echo "Migration started at $(date)" > "$LOG_FILE"

# Function to copy a file and log the action
copy_file() {
  local source="$1"
  local destination="$2"
  
  # Create directory if it doesn't exist
  mkdir -p "$(dirname "$destination")"
  
  # Copy the file
  cp "$source" "$destination"
  
  echo "Copied: $source -> $destination" >> "$LOG_FILE"
}

# Function to merge schema index files
merge_schema_index() {
  local source="db/schema/index.ts"
  local destination="encanta/apps/web/src/db/schema/index.ts"
  
  # Create a backup of the destination file
  cp "$destination" "${destination}.bak"
  
  # Get the exports from the source file that don't exist in the destination
  grep -v "^/\*" "$source" | grep "export \* from" | while read -r line; do
    if ! grep -q "$line" "$destination"; then
      echo "$line" >> "$destination"
    fi
  done
  
  echo "Merged: $source -> $destination" >> "$LOG_FILE"
}

echo "Migrating files that exist only in the root project..." >> "$LOG_FILE"

# Migrate actions
copy_file "actions/db/profiles-actions.ts" "encanta/apps/web/src/actions/db/profiles-actions.ts"
copy_file "actions/db/todos-actions.ts" "encanta/apps/web/src/actions/db/todos-actions.ts"
copy_file "actions/stripe-actions.ts" "encanta/apps/web/src/actions/stripe-actions.ts"

# Migrate db schemas
copy_file "db/schema/profiles-schema.ts" "encanta/apps/web/src/db/schema/profiles-schema.ts"
copy_file "db/schema/todos-schema.ts" "encanta/apps/web/src/db/schema/todos-schema.ts"

# Merge schema index file
merge_schema_index

# Copy environment files
copy_file ".env.local" "encanta/apps/web/.env.local"
copy_file ".env.example" "encanta/apps/web/.env.example"

# Copy any missing components, app files, lib files, and types
# This would require more detailed analysis to determine exactly what needs to be copied
# For now, we'll focus on the core files identified in our analysis

echo "Migration completed at $(date)" >> "$LOG_FILE"
echo "Check $LOG_FILE for details of the migration." 