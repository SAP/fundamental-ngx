import { Tree, SchematicsException } from '@angular-devkit/schematics';

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
