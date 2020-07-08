import { Tree, SchematicsException } from '@angular-devkit/schematics';
import * as ts from 'typescript';
import { WorkspaceProject, WorkspaceSchema, ProjectType } from '@schematics/angular/utility/workspace-models';
import { getWorkspace } from '@schematics/angular/utility/config';

// Gets the ts source file from a path
export function getSourceFile(host: Tree, path: string): ts.SourceFile {
    const buffer = host.read(path);
    if (!buffer) {
        throw new SchematicsException(`Could not find file for path: ${path}`);
    }
    return ts.createSourceFile(path, buffer.toString(), ts.ScriptTarget.Latest, true);
}

// Get the version of a package name
export function getPackageVersionFromPackageJson(tree: Tree, name: string): string | null {
    if (!tree.exists('package.json')) {
        return null;
    }

    // tslint:disable-next-line:no-non-null-assertion
    const packageJson = JSON.parse(tree.read('package.json')!.toString('utf-8'));

    if (packageJson.dependencies && packageJson.dependencies[name]) {
        return packageJson.dependencies[name];
    }

    return null;
}

// Check if a package exists in the package.json
export function hasPackage(tree: Tree, name: string): boolean | null {
    if (!tree.exists('package.json')) {
        return null;
    }

    // tslint:disable-next-line:no-non-null-assertion
    const packageJson = JSON.parse(tree.read('package.json')!.toString('utf-8'));

    return packageJson.dependencies && packageJson.dependencies[name];
}

// Returns the source path for the application
export function getSourceTreePath(host: Tree, options: any) {
    const project: WorkspaceProject<ProjectType> = getWorkspaceProject(host, options);

    return <any>project.sourceRoot;
}

// Returns the dist path for the application
export function getDistPath(host: Tree, options: any) {
    const project: WorkspaceProject<ProjectType> = getWorkspaceProject(host, options);

    return (<any>project.architect).build.options.outputPath;
}

// Returns the workspace project for the application
export function getWorkspaceProject(host: Tree, options: any) {
    const workspace: WorkspaceSchema = getWorkspace(host);
    const projectName = options.project || workspace.defaultProject;

    if (!projectName) {
        throw Error(`Cant Find project by name ${projectName}`);
    }
    return workspace.projects[projectName];
}
