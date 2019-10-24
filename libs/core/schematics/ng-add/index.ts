import { Rule, SchematicContext, Tree, chain, SchematicsException } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { getPackageVersionFromPackageJson, hasPackage } from '../utils/package-utils';
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';
import { addImportToRootModule, hasModuleImport } from '../utils/ng-module-utils';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { getProject } from '@schematics/angular/utility/project';
import { WorkspaceSchema } from '@schematics/angular/utility/workspace-models';

import chalk from 'chalk';

const browserAnimationsModuleName = 'BrowserAnimationsModule';
const noopAnimationsModuleName = 'NoopAnimationsModule';
const fdStylesIconPath = 'node_modules/fundamental-styles/dist/icon.css';
const fdStylesFontsPath = 'node_modules/fundamental-styles/dist/fonts.css';

export function ngAdd(options: any): Rule {
    return chain([
        addDependencies(),
        addAnimations(options),
        addStylePathToConfig(options),
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

// Configures browser animations.
function addAnimations(options: any): Rule {
    return (tree: Tree) => {
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

// Adds the style path to the angular.json.
function addStylePathToConfig(options: any): Rule {
    return (tree: Tree) => {
        const angularConfigPath = '/angular.json';
        const workspaceConfig = tree.read('/angular.json');
        if (!workspaceConfig) {
            throw new SchematicsException(`Unable to find angular.json. Please manually configure your styles array.`);
        }
        const workspaceJson: WorkspaceSchema = JSON.parse(workspaceConfig.toString());

        try {
            // tslint:disable-next-line:no-non-null-assertion
            let stylesArray = (workspaceJson!.projects[options.project]!.architect!.build!.options as any)['styles'];

            if (!stylesArray.includes(fdStylesIconPath) || !stylesArray.includes(fdStylesFontsPath)) {
                stylesArray = pushStylesToArray(stylesArray, fdStylesFontsPath);
                stylesArray = pushStylesToArray(stylesArray, fdStylesIconPath);
                // tslint:disable-next-line:no-non-null-assertion
                (workspaceJson!.projects[options.project]!.architect!.build!.options as any)['styles'] = stylesArray;
            } else {
                console.log(chalk.green(`✅️ Found duplicate style path in angular.json. Skipping.`));
                return tree;
            }
        } catch (e) {
            throw new SchematicsException(`Unable to find angular.json project styles. Please manually configure your styles array.`);
        }
        tree.overwrite(angularConfigPath, JSON.stringify(workspaceJson, null, 2));
        console.log(chalk.green(`✅️ Added fundamental-styles path to angular.json.`));
        return tree;
    };
}

function pushStylesToArray(stylesArray: any, path: string): any {
    if (!stylesArray.includes(path)) {
        stylesArray.push(path);
    }
    return stylesArray;
}
