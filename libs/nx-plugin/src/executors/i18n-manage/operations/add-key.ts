import { workspaceRoot } from '@nx/devkit';
import { sync as fastGlobSync } from 'fast-glob';
import { readFileSync, writeFileSync } from 'fs';
import transformTranslationsExecutor from '../../transform-translations/executor';
import { CommentType } from '../schema';
import { generateComment } from '../utils/comment-generator';
import { addKeyToProperties, keyExists } from '../utils/properties-parser';

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
 * Add a new translation key to all .properties files
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

    // Step 3: Check if key already exists (check first file as reference)
    const firstFile = `${workspaceRoot}/${propertiesFiles[0]}`;
    const firstFileContent = readFileSync(firstFile, 'utf-8');

    if (keyExists(firstFileContent, key)) {
        return {
            success: false,
            filesModified: [],
            error: `Key "${key}" already exists. Use rename command to modify existing keys.`
        };
    }

    // Step 4: Generate comment
    const commentInfo = generateComment(key, value, comment, commentType);

    // Step 5: Add key to all .properties files
    const filesModified: string[] = [];

    for (const propertiesFile of propertiesFiles) {
        const filePath = `${workspaceRoot}/${propertiesFile}`;
        const fileContent = readFileSync(filePath, 'utf-8');

        const updatedContent = addKeyToProperties(fileContent, {
            key,
            value,
            commentType: commentInfo.type,
            commentDescription: commentInfo.description
        });

        writeFileSync(filePath, updatedContent, 'utf-8');
        filesModified.push(propertiesFile);
    }

    // Step 6: Run transform-translations to generate .ts files
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
