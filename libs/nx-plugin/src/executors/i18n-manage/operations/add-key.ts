import { workspaceRoot } from '@nx/devkit';
import { readFileSync, writeFileSync } from 'fs';
import { CommentType } from '../schema';
import { generateComment } from '../utils/comment-generator';
import { addKeyToProperties, keyExists } from '../utils/properties-parser';
import { regenerateTypeScriptFiles } from './sync';

export interface AddKeyOptions {
    key: string;
    value: string;
    comment?: string;
    commentType?: CommentType;
    propertiesPath: string;
}

export interface AddKeyResult {
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

    // Check for valid characters (alphanumeric, underscore, dot)
    if (!/^[a-zA-Z0-9_.]+$/.test(key)) {
        return {
            valid: false,
            error: `Invalid characters in key: "${key}". Only alphanumeric, underscore, and dots are allowed`
        };
    }

    return { valid: true };
}

/**
 * Add a new translation key to all TypeScript translation files
 */
export async function addKey(options: AddKeyOptions): Promise<AddKeyResult> {
    const { key, value, comment, commentType, propertiesPath } = options;

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
        if (keyExists(baseContent, key)) {
            return {
                success: false,
                filesModified: [],
                error: `Key "${key}" already exists in translations.properties. Use update command to modify existing keys.`
            };
        }
    } catch (error) {
        return {
            success: false,
            filesModified: [],
            error: `Failed to read translations.properties: ${error instanceof Error ? error.message : String(error)}`
        };
    }

    // Step 3: Add key to base translations.properties file
    try {
        const baseContent = readFileSync(basePropertiesFile, 'utf-8');
        const commentInfo = generateComment(key, value, comment, commentType);
        const updatedContent = addKeyToProperties(baseContent, {
            key,
            value,
            commentType: commentInfo.type,
            commentDescription: commentInfo.description
        });
        writeFileSync(basePropertiesFile, updatedContent, 'utf-8');
    } catch (error) {
        return {
            success: false,
            filesModified: [],
            error: `Failed to add key to translations.properties: ${error instanceof Error ? error.message : String(error)}`
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
