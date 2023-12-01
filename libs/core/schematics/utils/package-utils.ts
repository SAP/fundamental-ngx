import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { compare, CompareOperator } from 'compare-versions';

// Get the version of a package name
export function getPackageVersionFromPackageJson(tree: Tree, name: string): string | null {
    if (!tree.exists('package.json')) {
        return null;
    }

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

    const packageJson = JSON.parse(tree.read('package.json')!.toString('utf-8'));

    return packageJson.dependencies && packageJson.dependencies[name];
}

export function checkPackageVersion(tree: Tree, name: string, compareTo: string, operator: CompareOperator): boolean {
    const packageJson = JSON.parse(tree.read('package.json')!.toString('utf-8'));

    return compare(packageJson.dependencies[name], compareTo, operator);
}

export function installDependencies(): Rule {
    return (tree: Tree, context: SchematicContext) => {
        context.addTask(new NodePackageInstallTask());

        return tree;
    };
}
