"use client"

import * as React from "react"
import { useDropzone } from "react-dropzone"
import { Upload, X, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

interface FileUploadProps {
    onFilesSelected: (files: File[]) => void
    maxFiles?: number
    maxSize?: number // in bytes
    accept?: Record<string, string[]>
    className?: string
    disabled?: boolean
    multiple?: boolean
    value?: File[]
    onChange?: (files: File[]) => void
}

export function FileUpload({
    onFilesSelected,
    maxFiles = 1,
    maxSize = 10 * 1024 * 1024, // 10MB default
    accept,
    className,
    disabled = false,
    multiple = false,
    value = [],
    onChange,
}: FileUploadProps) {
    const [files, setFiles] = React.useState<File[]>(value)

    React.useEffect(() => {
        if (value !== files) {
            setFiles(value)
        }
    }, [value])

    const onDrop = React.useCallback(
        (acceptedFiles: File[]) => {
            const newFiles = multiple
                ? [...files, ...acceptedFiles].slice(0, maxFiles)
                : acceptedFiles.slice(0, maxFiles)

            setFiles(newFiles)
            onFilesSelected(newFiles)

            if (onChange) {
                onChange(newFiles)
            }
        },
        [files, maxFiles, multiple, onChange, onFilesSelected]
    )

    const removeFile = (index: number) => {
        const newFiles = [...files]
        newFiles.splice(index, 1)
        setFiles(newFiles)
        onFilesSelected(newFiles)

        if (onChange) {
            onChange(newFiles)
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles,
        maxSize,
        accept,
        disabled,
        multiple,
    })

    return (
        <div className={cn("space-y-4", className)}>
            <div
                {...getRootProps()}
                className={cn(
                    "border-2 border-dashed rounded-lg p-6 transition-colors",
                    isDragActive
                        ? "border-primary bg-primary/5"
                        : "border-muted-foreground/25 hover:border-primary/50",
                    disabled && "opacity-50 cursor-not-allowed"
                )}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center gap-2 text-center">
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <div className="space-y-1">
                        <p className="text-sm font-medium">
                            {isDragActive ? "Drop the files here" : "Drag & drop files here"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            or click to browse files
                        </p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                        {multiple
                            ? `Upload up to ${maxFiles} files (max ${maxSize / (1024 * 1024)}MB each)`
                            : `Max file size: ${maxSize / (1024 * 1024)}MB`}
                    </div>
                </div>
            </div>

            {files.length > 0 && (
                <div className="space-y-2">
                    <p className="text-sm font-medium">Selected files:</p>
                    <ul className="space-y-2">
                        {files.map((file, index) => (
                            <li
                                key={`${file.name}-${index}`}
                                className="flex items-center justify-between rounded-md border p-2"
                            >
                                <div className="flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium truncate max-w-[200px]">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {(file.size / 1024).toFixed(1)} KB
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeFile(index)}
                                    disabled={disabled}
                                >
                                    <X className="h-4 w-4" />
                                    <span className="sr-only">Remove file</span>
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
} 