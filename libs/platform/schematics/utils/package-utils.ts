import { Tree, SchematicsException } from '@angular-devkit/schematics';
import { virtualFs, workspaces } from '@angular-devkit/core';
import * as ts from 'typescript';

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
export async function getSourceTreePath(host: Tree, options: any): Promise<string> {
    const project = await getWorkspaceProject(host, options);
    const sourceRoot = project.sourceRoot ? project.sourceRoot : '';
    return sourceRoot;
}

// Returns the dist path for the application
export async function getDistPath(host: Tree, options: any): Promise<string> {
    const project = await getWorkspaceProject(host, options);
    const value = project.targets;
    // tslint:disable-next-line:no-non-null-assertion
    const optionsRecord = value.get('build')!.options;
    // tslint:disable-next-line: no-non-null-assertion
    const outputDistPath = optionsRecord!['outputPath'];
    // tslint:disable-next-line: no-non-null-assertion
    const outputPath = outputDistPath!.toString();
    return outputPath;
}

// factory function to create a workspaces.WorkspaceHost from a Tree
export function createHost(tree: Tree): workspaces.WorkspaceHost {
    return {
        readFile: async function (path: string): Promise<string> {
            const data = tree.read(path);
            if (!data) {
                throw new SchematicsException('File not found.');
            }
            return virtualFs.fileBufferToString(data);
        },
        writeFile: async function (path: string, data: string): Promise<void> {
            return tree.overwrite(path, data);
        },
        isDirectory: async function (path: string): Promise<boolean> {
            return !tree.exists(path) && tree.getDir(path).subfiles.length > 0;
        },
        isFile: async function (path: string): Promise<boolean> {
            return tree.exists(path);
        }
    };
}

// Returns the workspace project for the application
export async function getWorkspaceProject(host: Tree, options: any): Promise<workspaces.ProjectDefinition> {
    const workspaceHost = createHost(host);
    const { workspace } = await workspaces.readWorkspace('/', workspaceHost);

    if (!options.project) {
        options.project = workspace.extensions.defaultProject;
    }

    const project = workspace.projects.get(options.project);
    if (!project) {
        throw new SchematicsException(`Invalid project name: ${options.project}`);
    }
    return project;
}

// Returns the default project for the application
export async function getDefaultProject(host: Tree, options: any): Promise<any> {
    const workspaceHost = createHost(host);
    const { workspace } = await workspaces.readWorkspace('/', workspaceHost);

    if (!options.project) {
        options.project = workspace.extensions.defaultProject;
    }

    return options.project;
}
