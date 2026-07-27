import { workspaceRoot } from '@nx/devkit';
import { sync as fastGlobSync } from 'fast-glob';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { format, resolveConfig } from 'prettier';
import { mergeTranslations, parseProperties } from '../../shared/properties-utils';
import { extractKeysFromFdLanguageInterface, updateFdLanguageKeyIdentifier } from '../../shared/update-typings';

export interface SyncOptions {
    propertiesPath: string;
}

export interface SyncResult {
    success: boolean;
    filesModified: string[];
    error?: string;
}

/**
 * Sync/regenerate all TypeScript translation files from .properties files
 * Fills in missing keys from base translations.properties
 */
export async function sync(options: SyncOptions): Promise<SyncResult> {
    const { propertiesPath } = options;

    const basePropertiesFile = `${workspaceRoot}/${propertiesPath}/translations.properties`;

    // Step 1: Validate that translations.properties exists
    if (!existsSync(basePropertiesFile)) {
        return {
            success: false,
            filesModified: [],
            error: `Base translations.properties not found at: ${basePropertiesFile}`
        };
    }

    // Step 2: Parse the base properties file to get all keys
    let basePropertiesContent: string;
    let basePropertiesMap: Record<string, string>;

    try {
        basePropertiesContent = readFileSync(basePropertiesFile, 'utf-8');
        basePropertiesMap = parseProperties(basePropertiesContent);
    } catch (error) {
        return {
            success: false,
            filesModified: [],
            error: `Failed to read base translations.properties: ${error instanceof Error ? error.message : String(error)}`
        };
    }

    // Step 3: Find all .properties files to determine which .ts files need to be created/updated
    const propertiesPattern = `${propertiesPath}/translations*.properties`;
    const propertiesFiles = fastGlobSync(propertiesPattern, { cwd: workspaceRoot });

    if (propertiesFiles.length === 0) {
        return {
            success: false,
            filesModified: [],
            error: `No .properties files found at: ${propertiesPattern}`
        };
    }

    // Step 4: Generate list of .ts files to create (one for each .properties file)
    const tsFilesToGenerate = propertiesFiles.map((propertiesFile) => {
        const fileName = propertiesFile.split('/').pop()?.replace('.properties', '.ts') || 'translations.ts';
        return `${propertiesPath}/${fileName}`;
    });

    // Step 5: Regenerate all TypeScript files from .properties files
    const filesModified: string[] = [];

    for (const tsFile of tsFilesToGenerate) {
        const filePath = `${workspaceRoot}/${tsFile}`;

        try {
            // Determine the corresponding .properties file name
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

            // Generate .spec.ts file
            const specFilePath = filePath.replace('.ts', '.spec.ts');
            const specFileName = fileName.replace('.properties', '');
            const specContent = `
import translations from './${specFileName}';
import { translationTester } from "../utils/translation-tester";
import { FdLanguage } from "../models";

describe("${tsFile.replace('.ts', '.spec.ts')}", () => translationTester(translations as unknown as FdLanguage));
`;
            const formattedSpecContent = await format(specContent, { ...prettierConfig, parser: 'typescript' });
            writeFileSync(specFilePath, formattedSpecContent, 'utf-8');
            filesModified.push(tsFile.replace('.ts', '.spec.ts'));
        } catch (error) {
            return {
                success: false,
                filesModified,
                error: `Failed to process ${tsFile}: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }

    // Step 5: Rebuild fd-language-key-identifier.ts from fd-language.ts
    try {
        const languageKeys = extractKeysFromFdLanguageInterface();
        updateFdLanguageKeyIdentifier(languageKeys);
        filesModified.push('libs/i18n/src/lib/models/fd-language-key-identifier.ts');
    } catch (error) {
        console.error('⚠️  Warning: Failed to rebuild fd-language-key-identifier.ts:', error);
    }

    return {
        success: true,
        filesModified
    };
}
