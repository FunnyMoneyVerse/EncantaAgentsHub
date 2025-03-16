import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names with Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Format a date string to a human-readable format
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., "Jan 1, 2023")
 */
export function formatDate(dateString: string): string {
    if (!dateString) return '';

    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) return '';

    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }).format(date);
}

/**
 * Truncate a string to a specified length
 * @param str - String to truncate
 * @param length - Maximum length
 * @returns Truncated string with ellipsis if needed
 */
export function truncateString(str: string, length: number): string {
    if (!str) return '';
    if (str.length <= length) return str;

    return str.slice(0, length) + '...';
}

/**
 * Convert a string to title case
 * @param str - String to convert
 * @returns Title cased string
 */
export function toTitleCase(str: string): string {
    if (!str) return '';

    return str
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

/**
 * Safely accesses nested object properties
 */
export function getNestedValue(obj: any, path: string, defaultValue: any = undefined) {
    const keys = path.split('.')
    let result = obj

    for (const key of keys) {
        if (result === undefined || result === null) return defaultValue
        result = result[key]
    }

    return result === undefined ? defaultValue : result
} 