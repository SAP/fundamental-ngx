import { execSync } from 'child_process';
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
            format(
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
        writeFileSync(
            newFilePath.replace('.ts', '.spec.ts'),
            format(
                `
                import translations from './${parsedPropertiesFilePath.name}';
                import { translationTester } from "../utils/translation-tester";
                import { FdLanguage } from "../models/lang";

                describe("${newFilePath.replace(
                    '.ts',
                    '.spec.ts'
                )}", () => translationTester(translations as unknown as FdLanguage));
                `,
                { ...prettierConfig, parser: 'typescript' }
            )
        );
        execSync(`git add ${newFilePath}`);
        execSync(`git add ${newFilePath.replace('.ts', '.spec.ts')}`);
    }

    return {
        success: true
    };
}
