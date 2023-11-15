import { execSync } from 'child_process';
import { sync as fastGlobSync } from 'fast-glob';
import { FsTree, flushChanges, printChanges } from 'nx/src/generators/tree';
import { workspaceRoot } from 'nx/src/utils/app-root';
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
    const host = new FsTree(workspaceRoot, process.env['NX_VERBOSE_LOGGING'] === 'true', undefined);
    for (const propertiesFilePath of propertiesFiles) {
        const parsedPropertiesFilePath = parse(propertiesFilePath);
        const newFilePath = `${parsedPropertiesFilePath.dir}/${parsedPropertiesFilePath.name}.ts`;
        const newFileSpecPath = `${parsedPropertiesFilePath.dir}/${parsedPropertiesFilePath.name}.spec.ts`;
        const fileContents = host.read(propertiesFilePath, 'utf-8') as string;
        const prettierConfig = await resolveConfig(newFilePath, {
            editorconfig: true
        });
        host.write(
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
        host.write(
            newFileSpecPath,
            format(
                `
                import translations from './${parsedPropertiesFilePath.name}';
                import { translationTester } from "../utils/translation-tester";
                import { FdLanguage } from "../models/lang";

                describe("${newFileSpecPath}", () => translationTester(translations as unknown as FdLanguage));
                `,
                { ...prettierConfig, parser: 'typescript' }
            )
        );
        const changes = host.listChanges();
        printChanges(changes);
        flushChanges(host.root, changes);
        execSync(`git add ${newFilePath}`);
        execSync(`git add ${newFileSpecPath}`);
    }

    return {
        success: true
    };
}
