import { chain, Rule } from '@angular-devkit/schematics';
import { readWorkspaceJson } from '@nrwl/workspace';
import { addEslintJsonOverrides } from '../utils/linting';

interface AddEslintOverridesSchema {
    project?: string;
}

export default function (schema: AddEslintOverridesSchema): Rule {
    let projects: string[];
    if (schema.project) {
        projects = [schema.project];
    } else {
        const workspaceJson = readWorkspaceJson();
        projects = Object.keys(workspaceJson.projects);
    }
    return updateEslintJsonForProjects(projects);
}

function updateEslintJsonForProjects(projectNames: string[]) {
    console.log('Number of projects: ', projectNames.length);
    return chain(projectNames.map((projectName) => (tree) => addEslintJsonOverrides(tree, projectName)));
}
