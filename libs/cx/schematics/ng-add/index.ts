import { Rule, SchematicContext, SchematicsException, Tree, chain } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
    NodeDependency,
    addPackageJsonDependency,
    getPackageJsonDependency
} from '@schematics/angular/utility/dependencies';
import { WorkspaceSchema } from '@schematics/angular/utility/workspace-models';

const fdStylesIconPath = 'node_modules/fundamental-styles/dist/icon.css';

/** Installs cx package and dependencies. */
export function ngAdd(options: any): Rule {
    return chain([addDependencies(), addStylePathToConfig(options)]);
}

// Adds missing dependencies to the project.
function addDependencies(): Rule {
    return (tree: Tree, context: SchematicContext) => {
        const ngCoreVersionTag = getPackageJsonDependency(tree, '@angular/core');
        const dependencies: NodeDependency[] = [];

        const formsDependency = getPackageJsonDependency(tree, '@angular/forms');
        if (!formsDependency) {
            dependencies.push({
                ...ngCoreVersionTag,
                name: '@angular/forms'
            });
        }

        dependencies.forEach((dependency) => {
            addPackageJsonDependency(tree, dependency);
            console.log(`✅️ Added ${dependency.name} to ${dependency.type}.`);
        });

        context.addTask(new NodePackageInstallTask());

        return tree;
    };
}

// Adds the icon style path to the angular.json.
function addStylePathToConfig(options: any): Rule {
    return (tree: Tree) => {
        const angularConfigPath = '/angular.json';
        const workspaceConfig = tree.read('/angular.json');
        if (!workspaceConfig) {
            throw new SchematicsException(`Unable to find angular.json. Please manually configure your styles array.`);
        }
        const workspaceJson: WorkspaceSchema = JSON.parse(workspaceConfig.toString());

        try {
            let stylesArray = (workspaceJson!.projects[options.project]!.architect!.build!.options as any)['styles'];

            if (!stylesArray.includes(fdStylesIconPath)) {
                stylesArray = pushStylesToArray(stylesArray, fdStylesIconPath);
                (workspaceJson!.projects[options.project]!.architect!.build!.options as any)['styles'] = stylesArray;
            } else {
                console.log(`✅️ Found duplicate style path in angular.json. Skipping.`);
                return tree;
            }
        } catch (e) {
            console.error('Error:', e);
            throw new SchematicsException(
                `Unable to find angular.json project styles. Please manually configure your styles array.`
            );
        }
        tree.overwrite(angularConfigPath, JSON.stringify(workspaceJson, null, 2));
        console.log(`✅️ Added fundamental-styles path to angular.json.`);
        return tree;
    };
}

function pushStylesToArray(stylesArray: any, path: string): any {
    if (!stylesArray.includes(path)) {
        stylesArray.push(path);
    }
    return stylesArray;
}
