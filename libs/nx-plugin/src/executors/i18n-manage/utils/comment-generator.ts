import { CommentType } from '../schema';

/**
 * Infer comment type based on key name and value
 */
export function inferCommentType(key: string, value: string): CommentType {
    const keyLower = key.toLowerCase();

    // XACT - ARIA labels (accessibility) - Check first as it's most specific
    if (
        keyLower.includes('aria') ||
        keyLower.includes('accessible') ||
        keyLower.includes('screenreader') ||
        keyLower.includes('a11y')
    ) {
        return 'XACT';
    }

    // XTIT - Titles and headings
    if (keyLower.includes('title') || keyLower.includes('heading') || keyLower.includes('header')) {
        return 'XTIT';
    }

    // XMSG - Messages and notifications
    if (
        keyLower.includes('message') ||
        keyLower.includes('msg') ||
        keyLower.includes('error') ||
        keyLower.includes('warning') ||
        keyLower.includes('notification') ||
        keyLower.includes('alert')
    ) {
        return 'XMSG';
    }

    // XBUT - Button labels
    if (keyLower.includes('button') || keyLower.includes('btn')) {
        return 'XBUT';
    }

    // XFLD - Default (field labels, general text)
    return 'XFLD';
}

/**
 * Generate a human-readable description from a key name
 */
export function generateCommentDescription(key: string): string {
    // Extract the last part of the key (after last dot)
    const parts = key.split('.');
    const lastPart = parts[parts.length - 1];

    // Convert camelCase to space-separated words
    // Example: submitButtonLabel -> submit button label
    const words = lastPart
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .toLowerCase()
        .trim();

    // Capitalize first letter
    return words.charAt(0).toUpperCase() + words.slice(1);
}

/**
 * Generate full comment line for a translation key
 */
export function generateComment(
    key: string,
    value: string,
    customDescription?: string,
    customType?: CommentType
): { type: CommentType; description: string; fullComment: string } {
    const type = customType || inferCommentType(key, value);
    const description = customDescription || generateCommentDescription(key);
    const fullComment = `#${type}: ${description}`;

    return { type, description, fullComment };
}
