import { workspaceRoot } from '@nx/devkit';
import { sync as fastGlobSync } from 'fast-glob';
import { readFileSync, writeFileSync } from 'fs';
import transformTranslationsExecutor from '../../transform-translations/executor';
import { keyExists } from '../utils/properties-parser';

export interface UpdateKeyOptions {
    key: string;
    value: string;
    propertiesPath: string;
}

export interface UpdateKeyResult {
    success: boolean;
    filesModified: string[];
    error?: string;
}

/**
 * Validate key format (must be component.keyName)
 */
function validateKeyFormat(key: string): { valid: boolean; error?: string } {
    if (!key || key.trim() === '') {
        return { valid: false, error: 'Key cannot be empty' };
    }

    const parts = key.split('.');
    if (parts.length < 2) {
        return {
            valid: false,
            error: `Invalid key format: "${key}". Expected format: "component.keyName" (e.g., "coreButton.save")`
        };
    }

    if (!/^[a-zA-Z0-9_.]+$/.test(key)) {
        return {
            valid: false,
            error: `Invalid characters in key: "${key}". Only alphanumeric, underscore, and dots are allowed`
        };
    }

    return { valid: true };
}

/**
 * Update the value of an existing translation key in all .properties files
 * Preserves the comment
 */
export async function updateKey(options: UpdateKeyOptions): Promise<UpdateKeyResult> {
    const { key, value, propertiesPath } = options;

    // Step 1: Validate key format
    const validation = validateKeyFormat(key);
    if (!validation.valid) {
        return {
            success: false,
            filesModified: [],
            error: validation.error
        };
    }

    // Step 2: Find all .properties files
    const propertiesPattern = `${propertiesPath}/*.properties`;
    const propertiesFiles = fastGlobSync(propertiesPattern, { cwd: workspaceRoot });

    if (propertiesFiles.length === 0) {
        return {
            success: false,
            filesModified: [],
            error: `No .properties files found at: ${propertiesPattern}`
        };
    }

    // Step 3: Check if key exists
    const firstFile = `${workspaceRoot}/${propertiesFiles[0]}`;
    const firstFileContent = readFileSync(firstFile, 'utf-8');

    if (!keyExists(firstFileContent, key)) {
        return {
            success: false,
            filesModified: [],
            error: `Key "${key}" does not exist. Use add command to create new keys.`
        };
    }

    // Step 4: Update key value in all .properties files
    const filesModified: string[] = [];

    for (const propertiesFile of propertiesFiles) {
        const filePath = `${workspaceRoot}/${propertiesFile}`;
        const fileContent = readFileSync(filePath, 'utf-8');
        const lines = fileContent.split('\n');
        const updatedLines: string[] = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const trimmedLine = line.trim();

            // Check if this line contains the key
            const keyPattern = new RegExp(`^${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*=`);
            if (keyPattern.test(trimmedLine)) {
                // Preserve spacing around equals sign from original
                const hasSpaces = /\s+=\s+/.test(line);
                const updatedLine = hasSpaces ? `${key} = ${value}` : `${key}=${value}`;
                updatedLines.push(updatedLine);
            } else {
                updatedLines.push(line);
            }
        }

        const updatedContent = updatedLines.join('\n');
        writeFileSync(filePath, updatedContent, 'utf-8');
        filesModified.push(propertiesFile);
    }

    // Step 5: Run transform-translations to generate .ts files
    try {
        const transformResult = await transformTranslationsExecutor({
            properties: [`${propertiesPath}/*.properties`]
        });

        if (!transformResult.success) {
            return {
                success: false,
                filesModified,
                error: 'Failed to generate TypeScript files from .properties'
            };
        }
    } catch (error) {
        return {
            success: false,
            filesModified,
            error: `Transform translations failed: ${error.message}`
        };
    }

    return {
        success: true,
        filesModified
    };
}
