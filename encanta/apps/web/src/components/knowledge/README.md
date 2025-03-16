# Knowledge Management System

This directory contains components for managing knowledge files in the Encanta platform.

## Overview

The Knowledge Management system allows users to upload and manage documents that can be used as reference material during content generation. The system processes documents into chunks, extracts metadata, and stores them in a vector database for semantic search.

## Components

### KnowledgeFileList

Displays a list of knowledge files for a workspace with status indicators showing whether files have been processed successfully, are still processing, or encountered errors.

### KnowledgeFileUpload

Provides a drag-and-drop interface for uploading new knowledge files to a workspace.

### KnowledgeFilePreview

Allows users to preview the processed chunks of a knowledge file, including the extracted text and metadata.

## Document Processing

Documents are processed in the following steps:

1. **Upload**: Files are uploaded to Supabase Storage
2. **Metadata Extraction**: Basic metadata is extracted from the file
3. **Chunking**: Documents are split into smaller chunks based on content structure
4. **Vectorization**: Each chunk is converted to a vector embedding
5. **Storage**: Chunks and their embeddings are stored in a vector database (Pinecone)

### Supported File Types

- PDF (`.pdf`)
- CSV (`.csv`)
- Word Documents (`.docx`, `.doc`)
- Text Files (`.txt`)
- Markdown (`.md`, `.markdown`)

## Integration with Content Creation

Knowledge files are integrated with the content creation process in the following ways:

1. When creating content, users can enable the "Use Knowledge Base" option
2. During content generation, the system searches the vector database for relevant information
3. Retrieved information is included in the prompt to the AI model
4. The AI model uses this information to generate more accurate and informed content

## API Integration

The knowledge management system interacts with the following API endpoints:

- `api.knowledge.getForWorkspace(workspaceId)`: Get all knowledge files for a workspace
- `api.knowledge.upload(file, workspaceId, metadata)`: Upload a new knowledge file
- `api.knowledge.delete(fileId)`: Delete a knowledge file
- `api.knowledge.getFileChunks(fileId)`: Get all chunks for a specific file

## Vector Search

The system uses semantic search to find relevant information in the knowledge base:

1. The query is converted to a vector embedding
2. The vector database is searched for similar vectors
3. Results are filtered based on metadata (e.g., workspace ID)
4. Retrieved chunks are ranked by relevance
5. The most relevant chunks are used to enhance content generation

## Best Practices

1. **File Size**: Keep individual files under 10MB for optimal processing
2. **File Structure**: Use clear headings and structure in documents for better chunking
3. **Descriptive Names**: Use descriptive file names and add descriptions to help identify files
4. **Regular Cleanup**: Remove outdated or irrelevant files to maintain a focused knowledge base
5. **Check Processing Status**: Verify that files have been processed successfully before using them in content generation 