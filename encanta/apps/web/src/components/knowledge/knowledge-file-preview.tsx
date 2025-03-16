'use client';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { EyeIcon, XCircle } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface KnowledgeFilePreviewProps {
    fileId: string;
    fileName: string;
}

interface FileChunk {
    id: string;
    text: string;
    section?: string;
    metadata: {
        file_id: string;
        chunk_index: number;
        total_chunks: number;
        processed_at: string;
    };
}

export function KnowledgeFilePreview({
    fileId,
    fileName
}: KnowledgeFilePreviewProps) {
    const [open, setOpen] = useState(false);
    const [chunks, setChunks] = useState<FileChunk[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedChunk, setSelectedChunk] = useState(0);

    // Fetch file chunks when dialog is opened
    useEffect(() => {
        if (!open) return;

        async function fetchChunks() {
            try {
                setIsLoading(true);
                // In a real implementation, you would add this API endpoint
                const data = await api.knowledge.getFileChunks(fileId);
                setChunks(data);
            } catch (error) {
                console.error('Error fetching file chunks:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchChunks();
    }, [fileId, open]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-gray-700"
                >
                    <EyeIcon className="h-5 w-5" />
                    <span className="sr-only">Preview</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        <span className="truncate">Preview: {fileName}</span>
                        <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
                            <XCircle className="h-5 w-5" />
                        </Button>
                    </DialogTitle>
                </DialogHeader>

                {isLoading ? (
                    <div className="h-80 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
                    </div>
                ) : chunks.length === 0 ? (
                    <div className="h-80 flex items-center justify-center text-center">
                        <div>
                            <p className="text-gray-500 mb-2">No preview available for this file.</p>
                            <p className="text-sm text-gray-400">The file may still be processing or there was an error.</p>
                        </div>
                    </div>
                ) : (
                    <div>
                        {/* Chunk navigation */}
                        {chunks.length > 1 && (
                            <div className="flex items-center justify-between mb-4 bg-gray-50 px-4 py-2 rounded-md">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSelectedChunk(prev => Math.max(0, prev - 1))}
                                    disabled={selectedChunk === 0}
                                >
                                    <ChevronLeft className="h-4 w-4 mr-1" />
                                    Previous
                                </Button>
                                <span className="text-sm text-gray-500">
                                    Chunk {selectedChunk + 1} of {chunks.length}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSelectedChunk(prev => Math.min(chunks.length - 1, prev + 1))}
                                    disabled={selectedChunk === chunks.length - 1}
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                            </div>
                        )}

                        {/* Chunk content */}
                        <div className="border rounded-md p-4 max-h-96 overflow-y-auto bg-gray-50">
                            <div className="prose max-w-none">
                                {chunks[selectedChunk]?.section && (
                                    <h3 className="text-lg font-medium mb-2">{chunks[selectedChunk].section}</h3>
                                )}
                                <div className="whitespace-pre-wrap">
                                    {chunks[selectedChunk]?.text}
                                </div>
                            </div>
                        </div>

                        {/* Metadata */}
                        <div className="mt-4 text-sm text-gray-500">
                            <p>Chunk {selectedChunk + 1} | Vector ID: {chunks[selectedChunk]?.id}</p>
                            {chunks[selectedChunk]?.metadata?.processed_at && (
                                <p>Processed: {new Date(chunks[selectedChunk].metadata.processed_at).toLocaleString()}</p>
                            )}
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
} 