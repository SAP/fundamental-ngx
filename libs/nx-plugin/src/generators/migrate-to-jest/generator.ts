import { readProjectConfiguration, Tree, updateProjectConfiguration } from '@nrwl/devkit';
import { jestProjectGenerator } from '@nrwl/jest';
import { relative } from 'path';
import { workspaceRoot } from 'nx/src/utils/app-root';

export default async function generator(tree: Tree, { project: name }: { project: string }) {
    const projectConfig = readProjectConfiguration(tree, name);
    if (!projectConfig.targets) {
        return;
    }
    const [targetName, targetWithKarma] =
        Object.entries(projectConfig.targets || {}).find(([, target]) => target.executor?.includes('karma')) || [];
    if (targetWithKarma && targetName) {
        const options = projectConfig.targets[targetName].options;
        tree.delete(options.main);
        tree.delete(options.tsConfig);
        tree.delete(options.karmaConfig);
        delete projectConfig.targets[targetName];
        updateProjectConfiguration(tree, name, projectConfig);
        if (targetName === 'test') {
            await jestProjectGenerator(tree, {
                project: name,
                setupFile: 'angular',
                supportTsx: false,
                skipSerializers: false,
                skipFormat: true,
                skipPackageJson: false
            });
            const fileContents = tree.read(`${projectConfig.root}/jest.config.ts`, 'utf-8') as string;
            const setupFilesAfterEnv = (fileContents.match(/setupFilesAfterEnv: \[(.*)]/) as RegExpMatchArray)[1];
            const pathToRoot = relative(projectConfig.root, workspaceRoot).replace(/\\/g, '/');
            tree.write(
                `${projectConfig.root}/jest.config.ts`,
                `
import baseConfig from '${pathToRoot}/jest.config.base';

export default {
    ...baseConfig,
    displayName: '${projectConfig.name}',
    preset: '${pathToRoot}/jest.preset.js',
    setupFilesAfterEnv: [${setupFilesAfterEnv}, '${pathToRoot}/jest-extended-matchers.ts'],
    coverageDirectory: '${pathToRoot}/dist/coverage/${projectConfig.name}',
};
`
            );
        }
    }
}
