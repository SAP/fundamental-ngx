import { workspaceRoot } from '@nx/devkit';
import { readFileSync } from 'fs';
import { CommentType } from '../schema';

/**
 * Extract JSDoc comment for a key from fd-language.ts
 */
export function extractJSDocComment(key: string): string | null {
    const fdLanguagePath = `${workspaceRoot}/libs/i18n/src/lib/models/fd-language.ts`;

    try {
        const content = readFileSync(fdLanguagePath, 'utf-8');
        const lines = content.split('\n');

        // Get the property name (last part after the last dot)
        const propertyName = key.split('.').pop();
        if (!propertyName) {
            return null;
        }

        // Find the line with this property
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            // Check if this line defines our property
            if (line.startsWith(`${propertyName}:`) || line.startsWith(`${propertyName}?:`)) {
                // Look backwards for JSDoc comment
                let commentLine = i - 1;
                while (commentLine >= 0 && lines[commentLine].trim() === '') {
                    commentLine--;
                }

                // Check if we found a JSDoc comment
                if (commentLine >= 0) {
                    const potentialComment = lines[commentLine].trim();
                    // Match /** comment */ or // comment
                    const jsdocMatch = potentialComment.match(/^\/\*\*\s*(.+?)\s*\*\/$/);
                    const inlineMatch = potentialComment.match(/^\/\/\s*(.+)$/);

                    if (jsdocMatch) {
                        return jsdocMatch[1];
                    } else if (inlineMatch) {
                        return inlineMatch[1];
                    }
                }
                break;
            }
        }
    } catch {
        // If we can't read the file, return null and fall back to auto-generation
        return null;
    }

    return null;
}

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

    // Priority: CLI parameter > JSDoc from fd-language.ts > auto-generated
    let description: string;
    if (customDescription) {
        description = customDescription;
    } else {
        const jsdocComment = extractJSDocComment(key);
        description = jsdocComment || generateCommentDescription(key);
    }

    const fullComment = `#${type}: ${description}`;

    return { type, description, fullComment };
}
