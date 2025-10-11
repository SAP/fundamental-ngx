import { formatFiles, workspaceRoot } from '@nx/devkit';
import { execSync } from 'child_process';
import { sync as fastGlobSync } from 'fast-glob';
import { FsTree, flushChanges, printChanges } from 'nx/src/generators/tree';
import { parse } from 'path';
import { format, resolveConfig } from 'prettier';
import { loadProperties, parseProperties } from './duplicates';
import { TransformPropertiesExecutorSchema } from './schema';
import { updateTypings } from './update-typings';

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
            await format(
                `
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
            await format(
                `
                import translations from './${parsedPropertiesFilePath.name}';
                import { translationTester } from "../utils/translation-tester";
                import { FdLanguage } from "../models";

                describe("${newFileSpecPath}", () => translationTester(translations as unknown as FdLanguage));
                `,
                { ...prettierConfig, parser: 'typescript' }
            )
        );
    }
    updateTypings(host, Object.keys(parseProperties(host.read(propertiesFiles[0], 'utf-8') as string)));
    await formatFiles(host);
    const changes = host.listChanges();
    printChanges(changes);
    // need to call flushChanges because the files to git add have yet to actually change on the filesystem
    flushChanges(host.root, changes);
    execSync(`git add libs/i18n/src/lib/models/fd-language-key-identifier.ts`);
    for (const change of changes) {
        execSync(`git add ${change.path}`);
    }
    return {
        success: true
    };
}
