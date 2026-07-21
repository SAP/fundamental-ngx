import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { format, resolveConfig } from 'prettier';
import { loadProperties } from '../../shared/properties-utils';

export interface SortKeysOptions {
    propertiesPath: string;
}

export interface SortKeysResult {
    success: boolean;
    filesModified: string[];
    error?: string;
}

export async function sortKeys(options: SortKeysOptions): Promise<SortKeysResult> {
    const { propertiesPath } = options;

    try {
        // Get all .ts files (excluding .spec.ts)
        const files = readdirSync(propertiesPath).filter((f) => f.endsWith('.ts') && !f.endsWith('.spec.ts'));

        if (files.length === 0) {
            return {
                success: false,
                filesModified: [],
                error: 'No TypeScript translation files found'
            };
        }

        const filesModified: string[] = [];

        // Process each TypeScript file by reading its corresponding .properties file
        for (const file of files) {
            const tsFilePath = join(propertiesPath, file);
            const propertiesFileName = file.replace('.ts', '.properties');
            const propertiesFilePath = join(propertiesPath, propertiesFileName);

            try {
                // Read the .properties file
                let propertiesContent: string;
                try {
                    propertiesContent = readFileSync(propertiesFilePath, 'utf-8');
                } catch {
                    // If language-specific file doesn't exist, skip it
                    continue;
                }

                // Parse properties file to object (already sorted by loadProperties)
                const translationObj = loadProperties(propertiesContent);

                // Generate TypeScript content
                const prettierConfig = await resolveConfig(tsFilePath, { editorconfig: true });
                const content = `
// Do not modify, it's automatically created. Modify ${propertiesFileName} instead
export default ${JSON.stringify(translationObj, null, 4)};
`;
                const formattedContent = await format(content, { ...prettierConfig, parser: 'typescript' });

                // Read current content to check if it changed
                const currentContent = readFileSync(tsFilePath, 'utf-8');

                // Only write if content changed
                if (formattedContent !== currentContent) {
                    writeFileSync(tsFilePath, formattedContent, 'utf-8');
                    filesModified.push(file);
                }
            } catch (error) {
                return {
                    success: false,
                    filesModified,
                    error: `Failed to process ${file}: ${error instanceof Error ? error.message : String(error)}`
                };
            }
        }

        return {
            success: true,
            filesModified
        };
    } catch (error) {
        return {
            success: false,
            filesModified: [],
            error: error instanceof Error ? error.message : String(error)
        };
    }
}
