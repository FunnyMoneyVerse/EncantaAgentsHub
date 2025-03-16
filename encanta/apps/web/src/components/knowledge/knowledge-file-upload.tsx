'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { UploadIcon, XIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface KnowledgeFileUploadProps {
    workspaceId: string;
    onUploadSuccess: () => void;
    onCancel: () => void;
    isUploading: boolean;
}

export function KnowledgeFileUpload({
    workspaceId,
    onUploadSuccess,
    onCancel,
    isUploading
}: KnowledgeFileUploadProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [description, setDescription] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Allowed file types
    const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'text/csv',
        'text/markdown'
    ];

    // Max file size (10MB)
    const maxFileSize = 10 * 1024 * 1024;

    // Handle file selection
    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0]);
        }
    }

    // Validate file type and size
    function validateAndSetFile(file: File) {
        // Check file type
        if (!allowedTypes.includes(file.type)) {
            toast.error('File type not allowed. Please upload PDF, Word, TXT, CSV, or Markdown files.');
            return;
        }

        // Check file size
        if (file.size > maxFileSize) {
            toast.error('File size exceeds the limit of 10MB.');
            return;
        }

        setSelectedFile(file);
    }

    // Handle drag events
    function handleDrag(e: React.DragEvent) {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }

    // Handle drop event
    function handleDrop(e: React.DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSetFile(e.dataTransfer.files[0]);
        }
    }

    // Handle upload button click
    function handleUploadClick() {
        fileInputRef.current?.click();
    }

    // Handle form submission
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!selectedFile) {
            toast.error('Please select a file to upload');
            return;
        }

        try {
            // Create form data
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('workspace_id', workspaceId);
            formData.append('name', selectedFile.name);

            if (description) {
                formData.append('description', description);
            }

            // In a real implementation, you would call your API here
            // const response = await api.knowledge.upload(formData);

            // For now, simulate a successful upload
            setTimeout(() => {
                onUploadSuccess();
                toast.success('File uploaded successfully');
            }, 1500);

        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error('Failed to upload file');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div
                className={`border-2 border-dashed rounded-lg p-6 text-center ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.txt,.csv,.md,.markdown"
                />

                {selectedFile ? (
                    <div className="py-4">
                        <div className="flex items-center justify-center mb-2">
                            <span className="text-sm font-medium truncate max-w-xs">
                                {selectedFile.name}
                            </span>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedFile(null)}
                                className="ml-2 text-gray-500"
                            >
                                <XIcon className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="text-sm text-gray-500">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                    </div>
                ) : (
                    <div className="py-8">
                        <UploadIcon className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-900 mb-1">
                            Drag and drop your file here
                        </p>
                        <p className="text-xs text-gray-500 mb-3">
                            PDF, Word, TXT, CSV, or Markdown files (max 10MB)
                        </p>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleUploadClick}
                        >
                            Select File
                        </Button>
                    </div>
                )}
            </div>

            <div>
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                    id="description"
                    placeholder="Add a description for this file"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1"
                />
            </div>

            <div className="flex justify-end space-x-2">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isUploading}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={!selectedFile || isUploading}
                >
                    {isUploading ? 'Uploading...' : 'Upload'}
                </Button>
            </div>
        </form>
    );
} 