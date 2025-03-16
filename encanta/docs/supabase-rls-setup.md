# Supabase Row Level Security (RLS) Setup

This document provides instructions for setting up Row Level Security (RLS) policies in Supabase for the Encanta application.

## Overview

Row Level Security (RLS) is a feature that allows you to control access to rows in a database table based on the user making the request. This is essential for multi-tenant applications like Encanta, where users should only have access to their own data or data that has been explicitly shared with them.

## Prerequisites

- A Supabase project set up for Encanta
- Admin access to the Supabase dashboard
- Clerk authentication integrated with Supabase

## RLS Policies for Encanta

### 1. Workspaces Table

```sql
-- Enable RLS
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;

-- Create policy for workspace members
CREATE POLICY "Workspace members can view their workspaces"
ON workspaces
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM workspace_members
    WHERE workspace_members.workspace_id = workspaces.id
    AND workspace_members.user_id = auth.uid()
  )
);

-- Create policy for workspace admins to update
CREATE POLICY "Workspace admins can update workspaces"
ON workspaces
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM workspace_members
    WHERE workspace_members.workspace_id = workspaces.id
    AND workspace_members.user_id = auth.uid()
    AND workspace_members.role = 'admin'
  )
);

-- Create policy for workspace admins to delete
CREATE POLICY "Workspace admins can delete workspaces"
ON workspaces
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM workspace_members
    WHERE workspace_members.workspace_id = workspaces.id
    AND workspace_members.user_id = auth.uid()
    AND workspace_members.role = 'admin'
  )
);

-- Create policy for users to create workspaces
CREATE POLICY "Users can create workspaces"
ON workspaces
FOR INSERT
WITH CHECK (true);
```

### 2. Workspace Members Table

```sql
-- Enable RLS
ALTER TABLE workspace_members ENABLE ROW LEVEL SECURITY;

-- Create policy for workspace members to view
CREATE POLICY "Workspace members can view other members"
ON workspace_members
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM workspace_members AS wm
    WHERE wm.workspace_id = workspace_members.workspace_id
    AND wm.user_id = auth.uid()
  )
);

-- Create policy for workspace admins to manage members
CREATE POLICY "Workspace admins can manage members"
ON workspace_members
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM workspace_members AS wm
    WHERE wm.workspace_id = workspace_members.workspace_id
    AND wm.user_id = auth.uid()
    AND wm.role = 'admin'
  )
);

-- Create policy for users to join workspaces
CREATE POLICY "Users can join workspaces"
ON workspace_members
FOR INSERT
WITH CHECK (user_id = auth.uid());
```

### 3. Content Table

```sql
-- Enable RLS
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Create policy for workspace members to view content
CREATE POLICY "Workspace members can view content"
ON content
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM workspace_members
    WHERE workspace_members.workspace_id = content.workspace_id
    AND workspace_members.user_id = auth.uid()
  )
);

-- Create policy for content creators and managers
CREATE POLICY "Content creators and managers can manage content"
ON content
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM workspace_members
    WHERE workspace_members.workspace_id = content.workspace_id
    AND workspace_members.user_id = auth.uid()
    AND workspace_members.role IN ('admin', 'content_manager', 'content_creator')
  )
);
```

### 4. Brand Profiles Table

```sql
-- Enable RLS
ALTER TABLE brand_profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for workspace members to view brand profiles
CREATE POLICY "Workspace members can view brand profiles"
ON brand_profiles
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM workspace_members
    WHERE workspace_members.workspace_id = brand_profiles.workspace_id
    AND workspace_members.user_id = auth.uid()
  )
);

-- Create policy for brand managers
CREATE POLICY "Brand managers can manage brand profiles"
ON brand_profiles
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM workspace_members
    WHERE workspace_members.workspace_id = brand_profiles.workspace_id
    AND workspace_members.user_id = auth.uid()
    AND workspace_members.role IN ('admin', 'brand_manager')
  )
);
```

### 5. Knowledge Files Table

```sql
-- Enable RLS
ALTER TABLE knowledge_files ENABLE ROW LEVEL SECURITY;

-- Create policy for workspace members to view knowledge files
CREATE POLICY "Workspace members can view knowledge files"
ON knowledge_files
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM workspace_members
    WHERE workspace_members.workspace_id = knowledge_files.workspace_id
    AND workspace_members.user_id = auth.uid()
  )
);

-- Create policy for knowledge managers
CREATE POLICY "Knowledge managers can manage knowledge files"
ON knowledge_files
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM workspace_members
    WHERE workspace_members.workspace_id = knowledge_files.workspace_id
    AND workspace_members.user_id = auth.uid()
    AND workspace_members.role IN ('admin', 'knowledge_manager')
  )
);
```

### 6. Agent Configurations Table

```sql
-- Enable RLS
ALTER TABLE agent_configs ENABLE ROW LEVEL SECURITY;

-- Create policy for workspace members to view agent configurations
CREATE POLICY "Workspace members can view agent configurations"
ON agent_configs
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM workspace_members
    WHERE workspace_members.workspace_id = agent_configs.workspace_id
    AND workspace_members.user_id = auth.uid()
  )
);

-- Create policy for agent managers
CREATE POLICY "Agent managers can manage agent configurations"
ON agent_configs
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM workspace_members
    WHERE workspace_members.workspace_id = agent_configs.workspace_id
    AND workspace_members.user_id = auth.uid()
    AND workspace_members.role IN ('admin', 'agent_manager')
  )
);
```

### 7. Storage Buckets

For storage buckets, you need to set up RLS policies in the Supabase dashboard:

1. Go to Storage in the Supabase dashboard
2. Create buckets for:
   - `profile-images`: For user profile images
   - `workspace-files`: For workspace-related files
   - `knowledge-files`: For knowledge base documents
   - `content-assets`: For content-related assets

For each bucket, set up the following RLS policies:

#### Profile Images Bucket

```sql
-- Users can view their own profile images
CREATE POLICY "Users can view their own profile images"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'profile-images' AND
  (storage.foldername(name))[1] = auth.uid()
);

-- Users can upload their own profile images
CREATE POLICY "Users can upload their own profile images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'profile-images' AND
  (storage.foldername(name))[1] = auth.uid()
);

-- Users can update their own profile images
CREATE POLICY "Users can update their own profile images"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'profile-images' AND
  (storage.foldername(name))[1] = auth.uid()
);

-- Users can delete their own profile images
CREATE POLICY "Users can delete their own profile images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'profile-images' AND
  (storage.foldername(name))[1] = auth.uid()
);
```

#### Workspace Files Bucket

```sql
-- Workspace members can view workspace files
CREATE POLICY "Workspace members can view workspace files"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'workspace-files' AND
  EXISTS (
    SELECT 1 FROM workspace_members
    WHERE workspace_members.workspace_id = (storage.foldername(name))[1]
    AND workspace_members.user_id = auth.uid()
  )
);

-- Workspace admins can manage workspace files
CREATE POLICY "Workspace admins can manage workspace files"
ON storage.objects
FOR ALL
USING (
  bucket_id = 'workspace-files' AND
  EXISTS (
    SELECT 1 FROM workspace_members
    WHERE workspace_members.workspace_id = (storage.foldername(name))[1]
    AND workspace_members.user_id = auth.uid()
    AND workspace_members.role = 'admin'
  )
);
```

Apply similar policies for the `knowledge-files` and `content-assets` buckets, adjusting the roles as needed.

## Implementing RLS in Supabase

To implement these policies:

1. Go to the Supabase dashboard
2. Navigate to the SQL Editor
3. Create a new query
4. Paste the SQL statements for each table
5. Run the query

## Testing RLS Policies

After setting up RLS policies, it's important to test them to ensure they're working as expected:

1. Create test users with different roles
2. Attempt to access, create, update, and delete records as different users
3. Verify that users can only access the data they're supposed to

## Troubleshooting

If you encounter issues with RLS policies:

- Check the Supabase logs for error messages
- Verify that the policies are correctly defined
- Ensure that the user ID is being properly passed to Supabase
- Test with simplified policies to isolate the issue

## Conclusion

Properly configured RLS policies are essential for securing your Encanta application. They ensure that users can only access the data they're authorized to see, protecting sensitive information and maintaining data integrity. 