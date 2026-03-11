import { workspaceRoot } from '@nx/devkit';
import { sync as fastGlobSync } from 'fast-glob';
import { readFileSync } from 'fs';
import { parsePropertiesFile } from '../utils/properties-parser';

export interface SearchKeysOptions {
    searchTerm: string;
    propertiesPath: string;
}

export interface SearchResult {
    key: string;
    value: string;
    comment?: string;
}

export interface SearchKeysResult {
    success: boolean;
    results: SearchResult[];
    error?: string;
}

/**
 * Extract comment for a key from the properties content
 */
function extractComment(content: string, key: string): string | undefined {
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Match both "key=" and "key = " formats
        const keyPattern = new RegExp(`^${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*=`);
        if (keyPattern.test(line)) {
            // Check if previous line is a comment
            if (i > 0) {
                const prevLine = lines[i - 1].trim();
                if (prevLine.startsWith('#')) {
                    return prevLine;
                }
            }
            break;
        }
    }

    return undefined;
}

/**
 * Search for translation keys by term (searches both key names and values)
 */
export async function searchKeys(options: SearchKeysOptions): Promise<SearchKeysResult> {
    const { searchTerm, propertiesPath } = options;

    if (!searchTerm || searchTerm.trim() === '') {
        return {
            success: false,
            results: [],
            error: 'Search term cannot be empty'
        };
    }

    // Use English properties file as reference
    const englishPropertiesPattern = `${propertiesPath}/translations.properties`;
    const propertiesFiles = fastGlobSync(englishPropertiesPattern, { cwd: workspaceRoot });

    if (propertiesFiles.length === 0) {
        return {
            success: false,
            results: [],
            error: `No properties file found at: ${englishPropertiesPattern}`
        };
    }

    const filePath = `${workspaceRoot}/${propertiesFiles[0]}`;
    const fileContent = readFileSync(filePath, 'utf-8');
    const entries = parsePropertiesFile(fileContent);

    // Search in both keys and values (case-insensitive)
    const searchTermLower = searchTerm.toLowerCase();
    const results: SearchResult[] = [];

    for (const [key, value] of entries) {
        const keyMatches = key.toLowerCase().includes(searchTermLower);
        const valueMatches = value.toLowerCase().includes(searchTermLower);

        if (keyMatches || valueMatches) {
            const comment = extractComment(fileContent, key);
            results.push({ key, value, comment });
        }
    }

    return {
        success: true,
        results
    };
}
