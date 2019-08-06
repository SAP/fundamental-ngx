import { Rule, SchematicContext, Tree, chain } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { getPackageVersionFromPackageJson, hasPackage } from '../utils/package-utils';
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';
import { addImportToRootModule, hasModuleImport } from '../utils/ng-module-utils';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { getProject } from '@schematics/angular/utility/project';

import chalk from 'chalk';

const browserAnimationsModuleName = 'BrowserAnimationsModule';
const noopAnimationsModuleName = 'NoopAnimationsModule';
const fdStylesPath = 'node_modules/fundamental-styles/dist/fundamental-styles.min.css';

export function ngAdd(options: any): Rule {
    return chain([
        addDependencies(),
        addAnimations(options),
        endInstallTask()
    ]);
}

function endInstallTask(): Rule {
    return (tree: Tree, context: SchematicContext) => {
        context.addTask(new NodePackageInstallTask());
        return tree;
    };
}

function addDependencies(): Rule {
    return (tree: Tree) => {
        const ngCoreVersionTag = getPackageVersionFromPackageJson(tree, '@angular/core');
        const dependencies: NodeDependency[] = [];

        if (!hasPackage(tree, '@angular/forms')) {
            dependencies.push({ type: NodeDependencyType.Default, version: `${ngCoreVersionTag}`, name: '@angular/forms' })
        }

        if (!hasPackage(tree, '@angular/animations')) {
            dependencies.push({ type: NodeDependencyType.Default, version: `${ngCoreVersionTag}`, name: '@angular/animations' })
        }

        dependencies.forEach(dependency => {
            addPackageJsonDependency(tree, dependency);
            console.log(chalk.green(`✅️ Added ${dependency.name} to ${dependency.type}.`));
        });

        return tree;
    };
}

function addAnimations(options: any): Rule {
    return (tree: Tree) => {
        // tslint:disable-next-line:no-non-null-assertion
        console.log(getProject(tree, options.project)!.architect!.build!.options);
        // tslint:disable-next-line:no-non-null-assertion
        const modulePath = getAppModulePath(tree, getProject(tree, options.project)!.architect!.build!.options!.main);

        if (options.animations) {
            if (hasModuleImport(tree, modulePath, noopAnimationsModuleName)) {
                return console.warn(chalk.red(`Could not set up "${chalk.bold(browserAnimationsModuleName)}" ` +
                    `because "${chalk.bold(noopAnimationsModuleName)}" is already imported. Please manually ` +
                    `set up browser animations.`));
            }
            addImportToRootModule(tree, browserAnimationsModuleName,
                '@angular/platform-browser/animations', modulePath);
            console.log(chalk.green(`✅️ Added ${browserAnimationsModuleName} to root module.`));
        } else if (!hasModuleImport(tree, modulePath, browserAnimationsModuleName)) {
            addImportToRootModule(tree, noopAnimationsModuleName,
                '@angular/platform-browser/animations', modulePath);
            console.log(chalk.green(`✅️ Added ${noopAnimationsModuleName} to root module.`));
        }
        return tree;
    };
}

function addStylePathToConfig(options: any): Rule {
    return (tree: Tree) => {

        return tree;
    };
}
