import { readProjectConfiguration, TargetConfiguration, Tree, workspaceRoot } from '@nx/devkit';
import { Builders } from '@schematics/angular/utility/workspace-models';
import { prompt } from 'enquirer';
import { sync as fastGlobSync } from 'fast-glob';
import { existsSync, readFileSync, statSync, writeFileSync } from 'fs';
import { join } from 'path';
import { SyncVersionsGeneratorSchema } from './schema';
import { replaceInFile } from './utils';

const knownBuildExecutors = [
    '@nx/angular:package',
    '@nx/angular:ng-packagr-lite',
    '@nx/angular:browser-esbuild',
    '@nx/angular:webpack-browser',
    Builders.BrowserEsbuild,
    Builders.Browser,
    Builders.NgPackagr,
    Builders.Application
];

export async function syncVersionsGenerator(tree: Tree, options: SyncVersionsGeneratorSchema) {
    let files = options.files;
    const project = readProjectConfiguration(tree, options.project);
    const projectRoot = project.root;
    if (!files) {
        const buildTarget = Object.values(project.targets as Record<string, TargetConfiguration>).find(({ executor }) =>
            knownBuildExecutors.includes(executor as string)
        );
        files = buildTarget?.outputs;
        if (!files || files.length === 0) {
            const { path } = (await prompt({
                name: 'path',
                type: 'input',
                message: 'Type the path to the files to sync versions. Supports glob patterns.'
            })) as any;
            files = [path];
        }
    }
    if (!files || files.length === 0) {
        throw new Error('No files to sync versions');
    }
    const globs: string[] = [];
    for (const file of files) {
        let normalizedFileName = file
            .replace(/\{workspaceRoot}/g, workspaceRoot)
            .replace(/\{projectRoot}/g, projectRoot);
        if (!normalizedFileName.startsWith(workspaceRoot)) {
            normalizedFileName = join(workspaceRoot, normalizedFileName);
        }

        if (
            (!existsSync(normalizedFileName) || statSync(normalizedFileName).isDirectory()) &&
            !normalizedFileName.includes('*')
        ) {
            normalizedFileName = join(normalizedFileName, '**/*');
        }
        globs.push(normalizedFileName);
    }

    const foundFiles = fastGlobSync(globs);

    foundFiles.forEach((filePath) => {
        const content = readFileSync(filePath, 'utf-8');
        const newContent = replaceInFile(filePath, content);
        if (content !== newContent) {
            writeFileSync(filePath, newContent);
        }
    }); // Also update the source package.json for the project if it exists
    const sourcePackageJsonPath = join(workspaceRoot, projectRoot, 'package.json');
    if (existsSync(sourcePackageJsonPath)) {
        const sourceContent = readFileSync(sourcePackageJsonPath, 'utf-8');
        const newSourceContent = replaceInFile(sourcePackageJsonPath, sourceContent);
        if (sourceContent !== newSourceContent) {
            writeFileSync(sourcePackageJsonPath, newSourceContent);
        }
    }
}

export default syncVersionsGenerator;
