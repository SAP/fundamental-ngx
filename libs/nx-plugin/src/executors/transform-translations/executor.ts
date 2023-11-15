import { sync as fastGlobSync } from 'fast-glob';
import { readFileSync, writeFileSync } from 'fs';
import { parse } from 'path';
import { format, resolveConfig } from 'prettier';
import { loadProperties } from './duplicates';
import { TransformPropertiesExecutorSchema } from './schema';

/**
 * Runs the transform-translations executor
 * @param options
 */
export default async function runExecutor(options: TransformPropertiesExecutorSchema): Promise<{ success: boolean }> {
    const { properties } = options;
    const propertiesFiles = fastGlobSync(properties);
    for (const propertiesFilePath of propertiesFiles) {
        const parsedPropertiesFilePath = parse(propertiesFilePath);
        const newFilePath = `${parsedPropertiesFilePath.dir}/${parsedPropertiesFilePath.name}.ts`;
        const fileContents = readFileSync(propertiesFilePath, 'utf-8');
        const prettierConfig = await resolveConfig(newFilePath, {
            editorconfig: true
        });
        writeFileSync(
            newFilePath,
            await format(
                `
            /* eslint-disable */
            // Do not modify, it's automatically created. Modify ${
                parsedPropertiesFilePath.name + parsedPropertiesFilePath.ext
            } instead
            export default ${JSON.stringify(loadProperties(fileContents), null, 4)};
        `,
                { ...prettierConfig, parser: 'typescript' }
            )
        );
    }

    return {
        success: true
    };
}
