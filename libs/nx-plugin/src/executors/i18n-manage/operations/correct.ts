import { workspaceRoot } from '@nx/devkit';
import { sync as fastGlobSync } from 'fast-glob';
import { readFileSync, writeFileSync } from 'fs';

export interface CorrectOptions {
    propertiesPath: string;
    baseLangOnly?: boolean;
}

export interface CorrectResult {
    success: boolean;
    filesModified: string[];
    corrections: Record<string, string[]>;
    error?: string;
}

/**
 * Auto-correct common i18n issues in .properties files
 * Fixes:
 * - Missing or malformed comments (adds #XMSG: template)
 * - Trailing/leading whitespace around values
 * - Sorts keys alphabetically
 */
export async function correct(options: CorrectOptions): Promise<CorrectResult> {
    const { propertiesPath, baseLangOnly = false } = options;

    try {
        const resolvedPath = `${workspaceRoot}/${propertiesPath}`;

        // Get .properties files
        let propertiesPattern = `${resolvedPath}/*.properties`;
        if (baseLangOnly) {
            // Only correct the base English file
            propertiesPattern = `${resolvedPath}/translations.properties`;
        }

        const propertiesFiles = fastGlobSync(propertiesPattern).sort();

        if (propertiesFiles.length === 0) {
            return {
                success: true,
                filesModified: [],
                corrections: {}
            };
        }

        const filesModified: string[] = [];
        const allCorrections: Record<string, string[]> = {};

        for (const filePath of propertiesFiles) {
            const corrections = await correctFile(filePath);
            if (corrections.applied.length > 0) {
                filesModified.push(filePath.replace(`${workspaceRoot}/`, ''));
                allCorrections[filePath] = corrections.applied;
            }
        }

        return {
            success: true,
            filesModified,
            corrections: allCorrections
        };
    } catch (error) {
        return {
            success: false,
            filesModified: [],
            corrections: {},
            error: error instanceof Error ? error.message : String(error)
        };
    }
}

interface FileCorrections {
    applied: string[];
    changed: boolean;
}

interface Section {
    comment: string;
    key: string;
    value: string;
}

/**
 * Correct a single .properties file
 */
async function correctFile(filePath: string): Promise<FileCorrections> {
    const applied: string[] = [];
    const originalContent = readFileSync(filePath, 'utf-8');

    // Parse file into sections
    const sections = parseFile(originalContent);

    // Apply corrections to each section
    for (const section of sections) {
        // Check if comment needs to be added or fixed
        if (!section.comment) {
            section.comment = generateCommentForKey(section.key);
            applied.push(`Added missing comment for key "${section.key}"`);
        } else {
            // Validate comment format
            const commentMatch = section.comment.match(/^#([A-Z]{4}):/);
            if (!commentMatch) {
                section.comment = generateCommentForKey(section.key);
                applied.push(`Fixed malformed comment for key "${section.key}"`);
            }
        }

        // Trim whitespace in value (leading and trailing)
        const trimmedValue = section.value.trim();
        if (trimmedValue !== section.value) {
            section.value = trimmedValue;
            applied.push(`Trimmed whitespace in key "${section.key}"`);
        }
    }

    // Sort sections by key
    sections.sort((a, b) => a.key.localeCompare(b.key));

    // Reconstruct content
    const correctedContent = reconstructFile(sections);

    // Write back if changed
    let changed = false;
    if (correctedContent !== originalContent) {
        writeFileSync(filePath, correctedContent, 'utf-8');
        changed = true;
    }

    return {
        applied,
        changed
    };
}

/**
 * Generate a meaningful comment based on the key name
 * Uses SAP UI5 comment type and extracts description from key pattern
 */
function generateCommentForKey(key: string): string {
    const commentType = detectCommentType(key);
    const description = generateDescription(key);
    return `#${commentType}: ${description}`;
}

/**
 * Detect SAP UI5 comment type based on key name patterns
 */
function detectCommentType(key: string): string {
    const lowerKey = key.toLowerCase();

    // Button patterns
    if (
        lowerKey.includes('button') ||
        lowerKey.includes('submit') ||
        lowerKey.includes('cancel') ||
        lowerKey.includes('ok')
    ) {
        return 'XBUT';
    }

    // Title/heading patterns
    if (lowerKey.includes('title') || lowerKey.includes('heading') || lowerKey.includes('header')) {
        return 'XTIT';
    }

    // Label patterns
    if (lowerKey.includes('label') || lowerKey.includes('placeholder')) {
        return 'XFLD';
    }

    // Tooltip patterns
    if (lowerKey.includes('tooltip')) {
        return 'XTOL';
    }

    // Link patterns
    if (lowerKey.includes('link')) {
        return 'XLNK';
    }

    // Accessibility patterns
    if (lowerKey.includes('aria') || lowerKey.includes('screenreader') || lowerKey.includes('a11y')) {
        return 'XACT';
    }

    // Message/description patterns
    if (
        lowerKey.includes('message') ||
        lowerKey.includes('description') ||
        lowerKey.includes('text') ||
        lowerKey.includes('error')
    ) {
        return 'XMSG';
    }

    // Default to XMSG for generic text
    return 'XMSG';
}

/**
 * Generate a human-readable description from the key name
 */
function generateDescription(key: string): string {
    // Extract the last part of the key (after the last dot)
    const parts = key.split('.');
    const lastPart = parts[parts.length - 1];

    // Convert camelCase to Title Case with spaces
    const titleCased = lastPart
        .replace(/([A-Z])/g, ' $1') // Add space before uppercase
        .replace(/^./, (c) => c.toUpperCase()) // Capitalize first letter
        .trim();

    return titleCased;
}

/**
 * Parse .properties file into sections (comment + key=value)
 */
function parseFile(content: string): Section[] {
    const sections: Section[] = [];
    const lines = content.split('\n');
    let currentComment = '';

    for (const line of lines) {
        const trimmed = line.trim();

        if (!trimmed) {
            // Skip empty lines
            continue;
        }

        if (trimmed.startsWith('#')) {
            currentComment = trimmed;
            continue;
        }

        if (trimmed.includes('=')) {
            const equalIndex = trimmed.indexOf('=');
            const key = trimmed.substring(0, equalIndex).trim();
            const value = trimmed.substring(equalIndex + 1);

            if (key) {
                sections.push({
                    comment: currentComment,
                    key,
                    value
                });
                currentComment = '';
            }
        }
    }

    return sections;
}

/**
 * Reconstruct .properties file from sections
 */
function reconstructFile(sections: Section[]): string {
    const lines: string[] = [];

    for (const section of sections) {
        if (section.comment) {
            lines.push(section.comment);
        }
        lines.push(`${section.key}=${section.value}`);
    }

    return lines.join('\n');
}
