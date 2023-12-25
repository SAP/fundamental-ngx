import { ProjectDefinition } from '@angular-devkit/core/src/workspace';
import { TargetDefinition } from '@angular-devkit/core/src/workspace/definitions';
import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { askQuestion } from '@angular/cli/src/utilities/prompt';
import { WorkspaceDefinition, writeWorkspace } from '@schematics/angular/utility';
import { getWorkspace } from '@schematics/angular/utility/workspace';

let _workspace: WorkspaceDefinition | undefined;

const buildTargets: Record<string, string> = {};

/**
 * Clears the cached workspace.
 */
export function clearWorkspaceCache(): void {
    _workspace = undefined;
}

/**
 * Gets the cached workspace definition.
 * @param tree
 */
export async function getWorkspaceDefinition(tree: Tree): Promise<WorkspaceDefinition> {
    if (!_workspace) {
        _workspace = await getWorkspace(tree);
    }
    return _workspace as WorkspaceDefinition;
}

/**
 * Gets the project definition for the given project name.
 * @param tree
 * @param projectName
 */
export async function getProjectDefinition(tree: Tree, projectName: string): Promise<ProjectDefinition> {
    const workspace = await getWorkspaceDefinition(tree);
    const project = workspace.projects.get(projectName);
    if (!project) {
        throw new SchematicsException(`Project ${projectName} not found`);
    }
    return project;
}

/** Gets the build target name for the given project. */
export async function getProjectBuildTargetName(tree: Tree, projectName: string): Promise<string> {
    const projectDefinition = await getProjectDefinition(tree, projectName);
    if (!buildTargets[projectName]) {
        buildTargets[projectName] = 'build';
        const buildTarget = projectDefinition.targets.get(buildTargets[projectName]);
        if (!buildTarget) {
            buildTargets[projectName] = (await askQuestion(
                "Please select your project's build target",
                Array.from(projectDefinition.targets.keys()).map((name) => ({
                    name,
                    value: name
                })),
                0,
                null
            )) as string;
        }
    }
    return buildTargets[projectName];
}

/**
 * Gets the build target for the given project name.
 * @param tree
 * @param projectName
 */
export async function getProjectBuildTarget(tree: Tree, projectName: string): Promise<TargetDefinition> {
    const projectDefinition = await getProjectDefinition(tree, projectName);
    return projectDefinition.targets.get(await getProjectBuildTargetName(tree, projectName)) as TargetDefinition;
}

/**
 * Updates the project definition for the given project name.
 * @param tree
 * @param projectName
 * @param updatedProject
 */
export async function updateProjectDefinition(
    tree: Tree,
    projectName: string,
    updatedProject: ProjectDefinition
): Promise<void> {
    const workspace = await getWorkspaceDefinition(tree);
    workspace.projects.set(projectName, updatedProject);
    await writeWorkspace(tree, workspace);
}

/**
 * Updates the workspace definition.
 * @param tree
 * @param updatedWorkspace
 */
export async function updateWorkspaceDefinition(tree: Tree, updatedWorkspace: WorkspaceDefinition): Promise<void> {
    await writeWorkspace(tree, _workspace as WorkspaceDefinition);
    _workspace = updatedWorkspace;
}
