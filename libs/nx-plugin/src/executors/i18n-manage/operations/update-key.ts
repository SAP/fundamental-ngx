import { workspaceRoot } from '@nx/devkit';
import { readFileSync, writeFileSync } from 'fs';
import { keyExists, updateKeyInProperties } from '../utils/properties-parser';
import { regenerateTypeScriptFiles } from './sync';

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
 * Update the value of an existing translation key in all TypeScript translation files
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

    // Step 2: Read the base translations.properties file to check if key exists
    const basePropertiesFile = `${workspaceRoot}/${propertiesPath}/translations.properties`;
    try {
        const baseContent = readFileSync(basePropertiesFile, 'utf-8');
        if (!keyExists(baseContent, key)) {
            return {
                success: false,
                filesModified: [],
                error: `Key "${key}" does not exist in translations.properties. Use add command to create new keys.`
            };
        }
    } catch (error) {
        return {
            success: false,
            filesModified: [],
            error: `Failed to read translations.properties: ${error instanceof Error ? error.message : String(error)}`
        };
    }

    // Step 3: Update the key value in base translations.properties file
    try {
        const baseContent = readFileSync(basePropertiesFile, 'utf-8');
        const updatedContent = updateKeyInProperties(baseContent, key, value);
        writeFileSync(basePropertiesFile, updatedContent, 'utf-8');
    } catch (error) {
        return {
            success: false,
            filesModified: [],
            error: `Failed to update key in translations.properties: ${error instanceof Error ? error.message : String(error)}`
        };
    }

    // Step 4: Regenerate all TypeScript files from .properties files
    const result = await regenerateTypeScriptFiles(propertiesPath);
    if (!result.success) {
        return result;
    }

    // Include the base properties file in the modified files list
    return {
        success: true,
        filesModified: [`${propertiesPath}/translations.properties`, ...result.filesModified]
    };
}
