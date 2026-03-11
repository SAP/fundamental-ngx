import { workspaceRoot } from '@nx/devkit';
import { sync as fastGlobSync } from 'fast-glob';
import { readFileSync, writeFileSync } from 'fs';
import transformTranslationsExecutor from '../../transform-translations/executor';
import { keyExists, renameKeyInProperties } from '../utils/properties-parser';

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
 * Rename an existing translation key in all .properties files
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

    // Step 3: Check if old key exists and new key doesn't exist
    const firstFile = `${workspaceRoot}/${propertiesFiles[0]}`;
    const firstFileContent = readFileSync(firstFile, 'utf-8');

    if (!keyExists(firstFileContent, oldKey)) {
        return {
            success: false,
            filesModified: [],
            error: `Key "${oldKey}" does not exist. Cannot rename a non-existent key.`
        };
    }

    if (keyExists(firstFileContent, newKey)) {
        return {
            success: false,
            filesModified: [],
            error: `Key "${newKey}" already exists. Cannot rename to an existing key.`
        };
    }

    // Step 4: Rename key in all .properties files
    const filesModified: string[] = [];

    for (const propertiesFile of propertiesFiles) {
        const filePath = `${workspaceRoot}/${propertiesFile}`;
        const fileContent = readFileSync(filePath, 'utf-8');

        const updatedContent = renameKeyInProperties(fileContent, oldKey, newKey);

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
