import { createProjectGraphAsync, readProjectConfiguration, Tree, updateProjectConfiguration } from '@nrwl/devkit';
import { jestProjectGenerator } from '@nrwl/jest';

export default async function generator(tree: Tree) {
    const graph = await createProjectGraphAsync();
    for (const { name } of Object.values(graph.nodes)) {
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
            }
        }
    }
}
