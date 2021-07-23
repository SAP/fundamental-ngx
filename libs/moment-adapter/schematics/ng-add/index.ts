import { Rule, SchematicContext, Tree, chain, SchematicsException } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { getPackageVersionFromPackageJson, hasPackage } from '../utils/package-utils';
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';

export function ngAdd(options: any): Rule {
    return chain([
        addDependencies(),
        endInstallTask()
    ]);
}

// Runs npm install. Called as the last rule.
function endInstallTask(): Rule {
    return (tree: Tree, context: SchematicContext) => {
        context.addTask(new NodePackageInstallTask());
        return tree;
    };
}

// Adds missing dependencies to the project.
function addDependencies(): Rule {
    return (tree: Tree) => {
        const ngCoreVersionTag = getPackageVersionFromPackageJson(tree, '@angular/core');
        const dependencies: NodeDependency[] = [];

        if (!hasPackage(tree, '@angular/forms')) {
            dependencies.push({
                type: NodeDependencyType.Default,
                version: `${ngCoreVersionTag}`,
                name: '@angular/forms'
            });
        }

        if (!hasPackage(tree, '@angular/animations')) {
            dependencies.push({
                type: NodeDependencyType.Default,
                version: `${ngCoreVersionTag}`,
                name: '@angular/animations'
            });
        }

        dependencies.forEach((dependency) => {
            addPackageJsonDependency(tree, dependency);
            console.log(`✅️ Added ${dependency.name} to ${dependency.type}.`);
        });

        return tree;
    };
}
