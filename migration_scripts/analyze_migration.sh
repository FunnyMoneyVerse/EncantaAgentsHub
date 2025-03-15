#!/bin/bash

# Create a directory to store the analysis results
mkdir -p migration_analysis

# Function to compare directories and identify files to migrate
compare_directories() {
  local source_dir="$1"
  local target_dir="$2"
  local output_file="$3"
  
  echo "Comparing $source_dir with $target_dir" > "$output_file"
  echo "----------------------------------------" >> "$output_file"
  
  # Find files in source that don't exist in target
  echo "Files that exist only in $source_dir:" >> "$output_file"
  for file in $(find "$source_dir" -type f -not -path "*/\.*" | sort); do
    rel_path=${file#"$source_dir/"}
    if [ ! -f "$target_dir/$rel_path" ]; then
      echo "  $rel_path" >> "$output_file"
    fi
  done
  
  echo "" >> "$output_file"
  echo "Files that exist in both locations but might need merging:" >> "$output_file"
  for file in $(find "$source_dir" -type f -not -path "*/\.*" | sort); do
    rel_path=${file#"$source_dir/"}
    if [ -f "$target_dir/$rel_path" ]; then
      # Check if files are different
      if ! cmp -s "$file" "$target_dir/$rel_path"; then
        echo "  $rel_path" >> "$output_file"
      fi
    fi
  done
}

# Analyze key directories
compare_directories "actions" "encanta/apps/web/src/actions" "migration_analysis/actions_comparison.txt"
compare_directories "db" "encanta/apps/web/src/db" "migration_analysis/db_comparison.txt"
compare_directories "components" "encanta/apps/web/src/components" "migration_analysis/components_comparison.txt"
compare_directories "app" "encanta/apps/web/src/app" "migration_analysis/app_comparison.txt"
compare_directories "lib" "encanta/apps/web/src/lib" "migration_analysis/lib_comparison.txt"
compare_directories "types" "encanta/apps/web/src/types" "migration_analysis/types_comparison.txt"

# Check for config files that need to be migrated
echo "Configuration files that might need migration:" > "migration_analysis/config_files.txt"
for file in .env.local .env.example next.config.mjs tailwind.config.ts postcss.config.mjs; do
  if [ -f "$file" ]; then
    echo "  $file" >> "migration_analysis/config_files.txt"
  fi
done

echo "Analysis complete. Check the migration_analysis directory for results." 