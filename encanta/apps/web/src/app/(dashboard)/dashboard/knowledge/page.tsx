"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { useWorkspaceStore } from '@/lib/stores/workspace-store';
import { toast } from 'react-hot-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { KnowledgeFileList } from '@/components/knowledge/knowledge-file-list';
import { KnowledgeFileUpload } from '@/components/knowledge/knowledge-file-upload';
import { api } from '@/lib/api';

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

export default function KnowledgeManagementPage() {
    const { selectedWorkspace } = useWorkspaceStore();
    const [files, setFiles] = useState<KnowledgeFile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

    useEffect(() => {
        if (selectedWorkspace) {
            fetchKnowledgeFiles();
        } else {
            setIsLoading(false);
        }
    }, [selectedWorkspace]);

    async function fetchKnowledgeFiles() {
        if (!selectedWorkspace) return;

        try {
            setIsLoading(true);
            const data = await api.knowledge.getForWorkspace(selectedWorkspace.id);
            setFiles(data);
        } catch (error) {
            console.error('Error fetching knowledge files:', error);
            toast.error('Failed to load knowledge files');
        } finally {
            setIsLoading(false);
        }
    }

    async function handleDeleteFile(fileId: string) {
        try {
            await api.knowledge.delete(fileId);
            setFiles(files.filter(file => file.id !== fileId));
        } catch (error) {
            console.error('Error deleting file:', error);
            throw error; // Re-throw to be handled by the component
        }
    }

    function handleUploadSuccess() {
        setUploadDialogOpen(false);
        fetchKnowledgeFiles();
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Knowledge Management</h1>
                    <p className="text-gray-600 mt-1">
                        Upload and manage documents to enhance content generation
                    </p>
                </div>

                <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                    <DialogTrigger asChild>
                        <Button disabled={!selectedWorkspace}>
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Upload File
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Upload Knowledge File</DialogTitle>
                        </DialogHeader>
                        {selectedWorkspace && (
                            <KnowledgeFileUpload
                                workspaceId={selectedWorkspace.id}
                                onUploadSuccess={handleUploadSuccess}
                                onCancel={() => setUploadDialogOpen(false)}
                                isUploading={isUploading}
                            />
                        )}
                    </DialogContent>
                </Dialog>
            </div>

            {!selectedWorkspace ? (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <div className="flex">
                        <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                                Please select a workspace to manage knowledge files.
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Files in {selectedWorkspace.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <KnowledgeFileList
                            files={files}
                            onDelete={handleDeleteFile}
                            isLoading={isLoading}
                        />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <p className="text-sm text-gray-500">
                            {files.length} file{files.length !== 1 ? 's' : ''} in total
                        </p>
                        <Button variant="outline" size="sm" onClick={fetchKnowledgeFiles}>
                            Refresh
                        </Button>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
} 