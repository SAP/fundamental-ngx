import { createProjectGraphAsync, readProjectConfiguration, Tree, updateProjectConfiguration } from '@nrwl/devkit';
import { jestProjectGenerator } from '@nrwl/jest';

export default async function generator(tree: Tree) {
    const graph = await createProjectGraphAsync();
    for (const { name } of Object.values(graph.nodes)) {
        const projectConfig = readProjectConfiguration(tree, name);
        if (
            projectConfig.projectType === 'library' &&
            projectConfig.targets?.test?.executor === '@angular-devkit/build-angular:karma'
        ) {
            const options = projectConfig.targets?.test.options;
            tree.delete(options.main);
            tree.delete(options.tsConfig);
            tree.delete(options.karmaConfig);
            delete projectConfig.targets.test;
            updateProjectConfiguration(tree, name, projectConfig);
            await jestProjectGenerator(tree, {
                project: name,
                setupFile: 'angular',
                supportTsx: false,
                skipSerializers: false,
                skipFormat: true,
                skipPackageJson: false
            });
        }
    }
}
