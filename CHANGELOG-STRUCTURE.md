# CHANGELOG Structure Explanation

This project maintains two CHANGELOG.md files:

1. `/CHANGELOG.md` (Root CHANGELOG): 
   - Located at the root of the repository
   - Contains a comprehensive history of all changes to the project
   - Includes version numbers and dates for major releases
   - Organized by version with Added, Changed, and Fixed sections
   - Serves as the main historical record for the entire project

2. `/encanta/CHANGELOG.md` (Monorepo CHANGELOG):
   - Located inside the monorepo directory
   - Contains changes specific to the monorepo
   - May include more detailed information about changes to specific packages or applications
   - Serves as a quick reference for developers working within the monorepo

## Why Two CHANGELOG Files?

The dual CHANGELOG structure serves different purposes:

1. **Repository-Level History**: The root CHANGELOG provides a comprehensive overview of the entire project's history, making it easier for new developers to understand the project's evolution.

2. **Monorepo-Specific History**: The monorepo CHANGELOG focuses on details specific to the monorepo structure, making it easier for developers working within the monorepo to find relevant information.

## Best Practices

When updating CHANGELOGs:

1. **Keep Both CHANGELOGs in Sync**: Ensure that important changes are reflected in both CHANGELOG files as appropriate.

2. **Update with Each Release**: Add entries to both CHANGELOG files when making significant changes.

3. **Include Timestamps**: Add dates to CHANGELOG entries to provide a clear timeline of changes.

4. **Use Version Numbers**: Follow semantic versioning (MAJOR.MINOR.PATCH) for releases and reflect these in the CHANGELOG files.

5. **Organize by Type**: Group changes into categories such as "Added", "Changed", "Fixed", etc.

6. **Be Specific**: Provide enough detail for each change to understand what was modified and why.

7. **Link to Issues/PRs**: When applicable, include references to related issues or pull requests.

## Format

Each CHANGELOG follows the [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format: 