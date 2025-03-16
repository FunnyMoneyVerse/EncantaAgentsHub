/**
 * Storage bucket names
 * Note: Bucket names use hyphens due to Supabase constraints
 * while database fields use underscores
 */
export const STORAGE_BUCKETS = {
    BRAND_ASSETS: 'brand-assets',
    CONTENT_MEDIA: 'content-media',
    KNOWLEDGE_FILES: 'knowledge-files'
} as const;

export type StorageBucket = typeof STORAGE_BUCKETS[keyof typeof STORAGE_BUCKETS];

/**
 * Constructs a storage path for a file in a specific workspace
 * Format: {workspaceId}/{optional_subfolder}/{filename}
 */
export function getStoragePath(
    bucket: StorageBucket,
    workspaceId: string,
    filename: string,
    subfolder?: string
): string {
    const path = subfolder
        ? `${workspaceId}/${subfolder}/${filename}`
        : `${workspaceId}/${filename}`;

    return path;
}

/**
 * Gets the public URL for a file in storage
 */
export function getPublicUrl(
    supabaseUrl: string,
    bucket: StorageBucket,
    path: string
): string {
    return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
}

/**
 * Extracts the filename from a storage path
 */
export function getFilenameFromPath(path: string): string {
    const parts = path.split('/');
    return parts[parts.length - 1];
}

/**
 * Extracts the workspace ID from a storage path
 */
export function getWorkspaceIdFromPath(path: string): string {
    const parts = path.split('/');
    return parts[0];
}

/**
 * Generate a unique filename by adding a UUID to prevent collisions
 * @param originalFilename The original filename
 * @returns A unique filename with UUID
 */
export function generateUniqueFilename(originalFilename: string): string {
    const fileExtension = originalFilename.split('.').pop() || '';
    const uuid = crypto.randomUUID();
    return `${uuid}.${fileExtension}`;
}

/**
 * Validate if the file type is allowed
 * @param fileType The MIME type of the file
 * @param allowedTypes List of allowed MIME types
 * @returns True if the file type is allowed, False otherwise
 */
export function validateFileType(fileType: string, allowedTypes: string[]): boolean {
    return allowedTypes.includes(fileType);
}

/**
 * Validate if the file size is within the allowed limit
 * @param fileSize The size of the file in bytes
 * @param maxSize The maximum allowed size in bytes
 * @returns True if the file size is within the limit, False otherwise
 */
export function validateFileSize(fileSize: number, maxSize: number): boolean {
    return fileSize <= maxSize;
}

/**
 * Common file type groups for validation
 */
export const FILE_TYPES = {
    IMAGES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    DOCUMENTS: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    SPREADSHEETS: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    PRESENTATIONS: ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
    TEXT: ['text/plain', 'text/csv', 'text/markdown'],
    ALL_DOCUMENTS: [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'text/plain',
        'text/csv',
        'text/markdown'
    ]
};

/**
 * Common file size limits
 */
export const FILE_SIZE_LIMITS = {
    SMALL: 1 * 1024 * 1024, // 1MB
    MEDIUM: 5 * 1024 * 1024, // 5MB
    LARGE: 10 * 1024 * 1024, // 10MB
    XLARGE: 50 * 1024 * 1024, // 50MB
}; 