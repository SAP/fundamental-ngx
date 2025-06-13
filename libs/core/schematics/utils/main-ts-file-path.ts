import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { Builders } from '@schematics/angular/utility/workspace-models';
import { getProjectBuildTarget } from './workspace';

export async function getMainTsFilePath(tree: Tree, projectName: string): Promise<string> {
    const buildTarget = await getProjectBuildTarget(tree, projectName);
    const options = buildTarget.options as Record<string, string>;

    const mainFilePath = buildTarget.builder === Builders.BuildApplication ? options.browser : options.main;

    if (!mainFilePath || !tree.exists(mainFilePath)) {
        throw new SchematicsException(`Could not find the main file of the project.`);
    }
    return mainFilePath;
}
