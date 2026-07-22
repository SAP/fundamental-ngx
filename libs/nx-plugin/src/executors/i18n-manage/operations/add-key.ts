import { workspaceRoot } from '@nx/devkit';
import { sync as fastGlobSync } from 'fast-glob';
import { readFileSync, writeFileSync } from 'fs';
import { format, resolveConfig } from 'prettier';
import { mergeTranslations, parseProperties } from '../../shared/properties-utils';
import { extractKeysFromFdLanguageInterface, updateFdLanguageKeyIdentifier } from '../../shared/update-typings';
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

    // Step 4: Find all TypeScript translation files (excluding .spec.ts)
    const tsPattern = `${propertiesPath}/translations*.ts`;
    const tsFiles = fastGlobSync(tsPattern, { cwd: workspaceRoot, ignore: ['**/*.spec.ts'] });

    if (tsFiles.length === 0) {
        return {
            success: false,
            filesModified: [],
            error: `No TypeScript translation files found at: ${tsPattern}`
        };
    }

    // Step 5: Regenerate all TypeScript files from .properties files
    const filesModified: string[] = [`${propertiesPath}/translations.properties`];

    // Parse the base properties file to get all keys (including the new one)
    const basePropertiesContent = readFileSync(basePropertiesFile, 'utf-8');
    const basePropertiesMap = parseProperties(basePropertiesContent);

    for (const tsFile of tsFiles) {
        const filePath = `${workspaceRoot}/${tsFile}`;

        try {
            const fileName = tsFile.split('/').pop()?.replace('.ts', '.properties') || 'translations.properties';
            const propertiesFile = `${workspaceRoot}/${propertiesPath}/${fileName}`;

            // Merge base and language-specific translations
            let langPropertiesContent: string | undefined;
            try {
                langPropertiesContent = readFileSync(propertiesFile, 'utf-8');
            } catch {
                // Language-specific file doesn't exist, use base only
            }

            const translationObj = mergeTranslations(basePropertiesContent, basePropertiesMap, langPropertiesContent);

            // Generate TypeScript content
            const prettierConfig = await resolveConfig(filePath, { editorconfig: true });
            const content = `
// Do not modify, it's automatically created. Modify ${fileName} instead
export default ${JSON.stringify(translationObj, null, 4)};
`;
            const formattedContent = await format(content, { ...prettierConfig, parser: 'typescript' });

            // Write updated content
            writeFileSync(filePath, formattedContent, 'utf-8');
            filesModified.push(tsFile);
        } catch (error) {
            return {
                success: false,
                filesModified,
                error: `Failed to process ${tsFile}: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }

    // Step 6: Rebuild fd-language-key-identifier.ts from fd-language.ts
    try {
        const languageKeys = extractKeysFromFdLanguageInterface();
        updateFdLanguageKeyIdentifier(languageKeys);
    } catch (error) {
        console.error('⚠️  Warning: Failed to rebuild fd-language-key-identifier.ts:', error);
    }

    return {
        success: true,
        filesModified
    };
}
