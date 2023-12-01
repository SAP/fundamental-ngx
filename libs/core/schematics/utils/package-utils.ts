import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { compare, CompareOperator } from 'compare-versions';

/** Get the version of a package name */
export function getPackageVersionFromPackageJson(tree: Tree, name: string): string | null {
    const packageJson = getPackageJson(tree);

    if (packageJson?.dependencies?.[name]) {
        return packageJson.dependencies[name];
    }

    return null;
}

/** Check if a package exists in the package.json */
export function hasPackage(tree: Tree, name: string): boolean | null {
    if (!tree.exists('package.json')) {
        return null;
    }

    return !!getPackageJson(tree)?.dependencies?.[name];
}

/**
 * Check if a package exists in the package.json and if it's version
 */
export function checkPackageVersion(tree: Tree, name: string, compareTo: string, operator: CompareOperator): boolean {
    const packageJson = getPackageJson(tree);

    return compare(packageJson?.dependencies?.[name] as string, compareTo, operator);
}

/**
 * Add dependencies to the package.json
 */
export function installDependencies(): Rule {
    return (tree: Tree, context: SchematicContext) => {
        context.addTask(new NodePackageInstallTask());
        return tree;
    };
}

/**
 * Get the package.json
 */
function getPackageJson(tree: Tree): { dependencies?: Record<string, string> } | undefined {
    if (!tree.exists('package.json')) {
        throw new Error('Could not find package.json');
    }
    return tree.readJson('package.json') as { dependencies?: Record<string, string> };
}
