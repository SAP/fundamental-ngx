import { workspaceRoot } from '@nx/devkit';
import { readFileSync, writeFileSync } from 'fs';
import { keyExists, renameKeyInProperties } from '../utils/properties-parser';
import { regenerateTypeScriptFiles } from './sync';

export interface RenameKeyOptions {
    oldKey: string;
    newKey: string;
    propertiesPath: string;
}

export interface RenameKeyResult {
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
 * Rename an existing translation key in all TypeScript translation files
 */
export async function renameKey(options: RenameKeyOptions): Promise<RenameKeyResult> {
    const { oldKey, newKey, propertiesPath } = options;

    // Step 1: Validate both key formats
    const oldKeyValidation = validateKeyFormat(oldKey);
    if (!oldKeyValidation.valid) {
        return {
            success: false,
            filesModified: [],
            error: `Old key: ${oldKeyValidation.error}`
        };
    }

    const newKeyValidation = validateKeyFormat(newKey);
    if (!newKeyValidation.valid) {
        return {
            success: false,
            filesModified: [],
            error: `New key: ${newKeyValidation.error}`
        };
    }

    // Step 2: Read the base translations.properties file to validate
    const basePropertiesFile = `${workspaceRoot}/${propertiesPath}/translations.properties`;
    try {
        const baseContent = readFileSync(basePropertiesFile, 'utf-8');

        if (!keyExists(baseContent, oldKey)) {
            return {
                success: false,
                filesModified: [],
                error: `Key "${oldKey}" does not exist in translations.properties. Cannot rename a non-existent key.`
            };
        }

        if (keyExists(baseContent, newKey)) {
            return {
                success: false,
                filesModified: [],
                error: `Key "${newKey}" already exists in translations.properties. Cannot rename to an existing key.`
            };
        }
    } catch (error) {
        return {
            success: false,
            filesModified: [],
            error: `Failed to read translations.properties: ${error instanceof Error ? error.message : String(error)}`
        };
    }

    // Step 3: Rename the key in base translations.properties file
    try {
        const baseContent = readFileSync(basePropertiesFile, 'utf-8');
        const updatedContent = renameKeyInProperties(baseContent, oldKey, newKey);
        writeFileSync(basePropertiesFile, updatedContent, 'utf-8');
    } catch (error) {
        return {
            success: false,
            filesModified: [],
            error: `Failed to rename key in translations.properties: ${error instanceof Error ? error.message : String(error)}`
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
