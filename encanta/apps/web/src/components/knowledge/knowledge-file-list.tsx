'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { toast } from 'react-hot-toast';
import { formatDate } from '@/lib/utils';
import {
    FileIcon,
    TrashIcon,
    EyeIcon,
    CheckCircleIcon,
    AlertCircleIcon
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { KnowledgeFilePreview } from './knowledge-file-preview';

interface KnowledgeFile {
    id: string;
    name: string;
    description?: string;
    file_type: string;
    created_at: string;
    is_processed: boolean;
    processing_error?: string;
    chunk_count?: number;
    processed_at?: string;
}

interface KnowledgeFileListProps {
    files: KnowledgeFile[];
    onDelete: (fileId: string) => Promise<void>;
    isLoading: boolean;
}

export function KnowledgeFileList({ files, onDelete, isLoading }: KnowledgeFileListProps) {
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // Handle file deletion
    async function handleDelete(fileId: string) {
        try {
            setDeletingId(fileId);
            await onDelete(fileId);
            toast.success('File deleted successfully');
        } catch (error) {
            console.error('Error deleting file:', error);
            toast.error('Failed to delete file');
        } finally {
            setDeletingId(null);
        }
    }

    // Get appropriate icon for file type
    function getFileIcon(fileType: string) {
        // You could add more specific icons based on file type
        return <FileIcon className="h-6 w-6 text-gray-500" />;
    }

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center p-4 border rounded-lg animate-pulse">
                        <div className="flex-shrink-0 mr-4">
                            <div className="h-6 w-6 bg-gray-200 rounded"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                        </div>
                        <div className="flex">
                            <div className="h-8 w-8 bg-gray-200 rounded-full mr-2"></div>
                            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (files.length === 0) {
        return (
            <div className="text-center py-8 border rounded-lg">
                <p className="text-gray-500 mb-2">No knowledge files found</p>
                <p className="text-sm text-gray-400">Upload files to enhance your content generation</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {files.map((file) => (
                <div key={file.id} className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex-shrink-0 mr-4">
                        {getFileIcon(file.file_type)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            {file.name}
                        </p>
                        <div className="flex items-center mt-1">
                            <p className="text-xs text-gray-500 mr-2">
                                Uploaded {formatDate(file.created_at)}
                            </p>
                            {file.is_processed ? (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <span className="inline-flex items-center text-xs text-green-700">
                                                <CheckCircleIcon className="h-3 w-3 mr-1" />
                                                {file.chunk_count ? `Processed (${file.chunk_count} chunks)` : 'Processed'}
                                            </span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>This file has been processed and is ready to use</p>
                                            {file.processed_at && <p className="text-xs">{formatDate(file.processed_at)}</p>}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ) : file.processing_error ? (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <span className="inline-flex items-center text-xs text-red-700">
                                                <AlertCircleIcon className="h-3 w-3 mr-1" />
                                                Error
                                            </span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Error processing file: {file.processing_error}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ) : (
                                <span className="inline-flex items-center text-xs text-yellow-700">
                                    <AlertCircleIcon className="h-3 w-3 mr-1" />
                                    Processing
                                </span>
                            )}
                        </div>
                        {file.description && (
                            <p className="mt-1 text-sm text-gray-600 truncate">
                                {file.description}
                            </p>
                        )}
                    </div>

                    <div className="flex">
                        {file.is_processed && (
                            <KnowledgeFilePreview fileId={file.id} fileName={file.name} />
                        )}

                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(file.id);
                            }}
                            disabled={deletingId === file.id}
                        >
                            <TrashIcon className="h-5 w-5" />
                            <span className="sr-only">Delete</span>
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
} 