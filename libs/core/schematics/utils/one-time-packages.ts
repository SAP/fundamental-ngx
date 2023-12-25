import { Rule, SchematicContext } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
    NodeDependencyType,
    addPackageJsonDependency,
    getPackageJsonDependency,
    removePackageJsonDependency
} from '@schematics/angular/utility/dependencies';

/**
 * Adds the packages to the project temporarily.
 * @param packagesToInstall
 */
export function oneTimePackages(packagesToInstall: string[]): [Rule, Rule] {
    const packages: string[] = [];
    return [
        (tree, context: SchematicContext) => {
            packagesToInstall.forEach((packageName) => {
                const packageVersion = getPackageJsonDependency(tree, packageName);
                if (!packageVersion) {
                    addPackageJsonDependency(tree, {
                        type: NodeDependencyType.Dev,
                        name: packageName,
                        version: 'latest'
                    });
                    packages.push(packageName);
                }
            });
            if (packages.length) {
                context.addTask(new NodePackageInstallTask());
            }
        },
        (tree, context: SchematicContext) => {
            if (packages.length) {
                packages.forEach((packageName) => {
                    removePackageJsonDependency(tree, packageName);
                });
                context.addTask(new NodePackageInstallTask());
            }
        }
    ];
}
