import { CommentType } from '../schema';

export interface PropertiesEntry {
    key: string;
    value: string;
    comment?: string;
}

/**
 * Parse .properties file content into key-value map
 */
export function parsePropertiesFile(content: string): Map<string, string> {
    const result = new Map<string, string>();
    const items = content.match(/(.*)=(.*)/g);

    (items || []).forEach((item: string) => {
        const firstEqualSignIndex = item.indexOf('=');
        const key = item.slice(0, firstEqualSignIndex).trim();
        const value = item
            .slice(firstEqualSignIndex + 1)
            .trim()
            .replace(/\\#/g, '#');

        if (key && !key.startsWith('#')) {
            result.set(key, value);
        }
    });

    return result;
}

/**
 * Check if a key exists in properties content
 */
export function keyExists(content: string, key: string): boolean {
    const keys = parsePropertiesFile(content);
    return keys.has(key);
}

/**
 * Add a key to properties file content
 */
export function addKeyToProperties(
    content: string,
    entry: { key: string; value: string; commentType: CommentType; commentDescription: string }
): string {
    const lines = content.split('\n');
    const componentPrefix = entry.key.split('.')[0];

    // Find insertion point (alphabetically within component group)
    const insertionIndex = findInsertionPoint(lines, componentPrefix, entry.key);

    // Build new entry
    const newEntry = formatPropertiesEntry(entry);

    // Insert at the correct position
    lines.splice(insertionIndex, 0, ...newEntry);

    return lines.join('\n');
}

/**
 * Find the best insertion point for a new key based on component prefix and alphabetical order
 */
export function findInsertionPoint(lines: string[], componentPrefix: string, fullKey: string): number {
    let firstMatchIndex = -1;
    const insertionIndex = -1;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        // Check if this is a key line (not comment, not empty)
        if (line && !line.startsWith('#') && line.includes('=')) {
            const lineKey = line.split('=')[0].trim();

            if (lineKey.startsWith(componentPrefix + '.')) {
                // Found a key in our component group
                if (firstMatchIndex === -1) {
                    firstMatchIndex = i;
                }

                // Check if we should insert before this key (alphabetical order)
                if (insertionIndex === -1 && lineKey > fullKey) {
                    // Find the comment line before this key
                    let commentIndex = i - 1;
                    while (commentIndex >= 0 && lines[commentIndex].trim() === '') {
                        commentIndex--;
                    }
                    // Insert before the comment
                    return commentIndex >= 0 && lines[commentIndex].trim().startsWith('#') ? commentIndex : i;
                }
            } else if (firstMatchIndex !== -1) {
                // We've passed the component group
                // Insert before the current line (which is the start of a new component)
                // But first check if there's a comment before it
                let insertIndex = i;
                while (insertIndex > 0 && lines[insertIndex - 1].trim() === '') {
                    insertIndex--;
                }
                if (insertIndex > 0 && lines[insertIndex - 1].trim().startsWith('#')) {
                    insertIndex--;
                }
                return insertIndex;
            }
        }
    }

    // If we found matches but no insertion point, insert at the end of the group
    if (firstMatchIndex !== -1) {
        // Find the end of the component group
        for (let i = lines.length - 1; i >= 0; i--) {
            const line = lines[i].trim();
            if (line && !line.startsWith('#') && line.includes('=')) {
                const lineKey = line.split('=')[0].trim();
                if (lineKey.startsWith(componentPrefix + '.')) {
                    // Skip forward past any trailing empty lines
                    let nextIndex = i + 1;
                    while (nextIndex < lines.length && lines[nextIndex].trim() === '') {
                        nextIndex++;
                    }
                    return nextIndex;
                }
            }
        }
    }

    // No match found, insert at end
    return lines.length;
}

/**
 * Format a properties entry with comment
 */
export function formatPropertiesEntry(entry: {
    key: string;
    value: string;
    commentType: CommentType;
    commentDescription: string;
}): string[] {
    return [`#${entry.commentType}: ${entry.commentDescription}`, `${entry.key}=${entry.value}`];
}

/**
 * Remove a key from properties content
 */
export function removeKeyFromProperties(content: string, key: string): string {
    const lines = content.split('\n');
    const result: string[] = [];
    let i = 0;

    // Create a regex pattern that matches the key with optional spaces around '='
    // Escape special regex characters in the key
    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const keyPattern = new RegExp(`^${escapedKey}\\s*=`);

    while (i < lines.length) {
        const line = lines[i].trim();

        // Check if this is the key we want to remove
        if (keyPattern.test(line)) {
            // Skip this line and the comment before it (if exists)
            if (i > 0 && result[result.length - 1]?.trim().startsWith('#')) {
                result.pop(); // Remove comment
            }
            // Skip the key line itself
            i++;
            // Skip empty line after (if exists)
            if (i < lines.length && lines[i].trim() === '') {
                i++;
            }
            continue;
        }

        result.push(lines[i]);
        i++;
    }

    return result.join('\n');
}

/**
 * Rename a key in properties content
 */
export function renameKeyInProperties(content: string, oldKey: string, newKey: string): string {
    const lines = content.split('\n');

    // Create a regex pattern that matches the old key with optional spaces around '='
    // Escape special regex characters in the key
    const escapedKey = oldKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const keyPattern = new RegExp(`^${escapedKey}\\s*=`);

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (keyPattern.test(line)) {
            // Find the position of '=' and preserve spacing
            const equalsIndex = line.indexOf('=');
            const spacing = line.substring(oldKey.length, equalsIndex); // Preserve any spaces before '='
            const value = line.substring(equalsIndex + 1);

            // Replace the line, preserving original indentation
            const originalIndent = lines[i].match(/^\s*/)?.[0] || '';
            lines[i] = `${originalIndent}${newKey}${spacing}=${value}`;
            break;
        }
    }

    return lines.join('\n');
}
