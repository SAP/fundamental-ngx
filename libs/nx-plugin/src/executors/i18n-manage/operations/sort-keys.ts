import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import transformTranslationsExecutor from '../../transform-translations/executor';

export interface SortKeysOptions {
    propertiesPath: string;
}

export interface SortKeysResult {
    success: boolean;
    filesModified: string[];
    error?: string;
}

interface PropertyEntry {
    comment: string;
    key: string;
    value: string;
    rawLine: string;
}

export async function sortKeys(options: SortKeysOptions): Promise<SortKeysResult> {
    const { propertiesPath } = options;

    try {
        // Get all .properties files
        const files = readdirSync(propertiesPath).filter((f) => f.endsWith('.properties'));

        if (files.length === 0) {
            return {
                success: false,
                filesModified: [],
                error: 'No .properties files found'
            };
        }

        const filesModified: string[] = [];

        // Process each file
        for (const file of files) {
            const filePath = join(propertiesPath, file);
            const content = readFileSync(filePath, 'utf-8');
            const lines = content.split('\n');

            const entries: PropertyEntry[] = [];
            let currentComment = '';

            // Parse the file
            for (const line of lines) {
                if (line.startsWith('#')) {
                    // Comment line
                    currentComment = line;
                } else if (line.trim() === '') {
                    // Empty line - skip
                    continue;
                } else if (line.includes('=')) {
                    // Key-value line
                    const match = line.match(/^([^=]+?)\s*=\s*(.*)$/);
                    if (match) {
                        entries.push({
                            comment: currentComment,
                            key: match[1].trim(),
                            value: match[2],
                            rawLine: line
                        });
                        currentComment = '';
                    }
                }
            }

            // Sort entries by component then by key
            entries.sort((a, b) => {
                const [componentA, keyA] = a.key.split('.');
                const [componentB, keyB] = b.key.split('.');

                // First sort by component
                if (componentA !== componentB) {
                    return componentA.localeCompare(componentB);
                }

                // Then sort by key within component
                return keyA.localeCompare(keyB);
            });

            // Rebuild the file content
            const sortedLines: string[] = [];
            for (const entry of entries) {
                if (entry.comment) {
                    sortedLines.push(entry.comment);
                }
                sortedLines.push(entry.rawLine);
            }

            // Write back
            const newContent = sortedLines.join('\n') + '\n';

            // Only write if content changed
            if (newContent !== content) {
                writeFileSync(filePath, newContent, 'utf-8');
                filesModified.push(file);
            }
        }

        // Run transform-translations to regenerate TypeScript files
        await transformTranslationsExecutor({
            properties: [`${propertiesPath}/*.properties`]
        });

        return {
            success: true,
            filesModified
        };
    } catch (error) {
        return {
            success: false,
            filesModified: [],
            error: error.message
        };
    }
}
