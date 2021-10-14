import { Rule, SchematicContext, Tree, chain, SchematicsException } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { getPackageVersionFromPackageJson, hasPackage } from '../utils/package-utils';
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';
import { hasModuleImport } from '../utils/ng-module-utils';
import { WorkspaceSchema } from '@schematics/angular/utility/workspace-models';

import { defaultFontStyle } from './styles';
import {
    addModuleImportToModule,
    findModuleFromOptions
} from '@angular/cdk/schematics';

const browserAnimationsModuleName = 'BrowserAnimationsModule';
const noopAnimationsModuleName = 'NoopAnimationsModule';
const fdStylesIconPath = 'node_modules/fundamental-styles/dist/icon.css';

export function ngAdd(options: any): Rule {
    return chain([
        addDependencies(),
        endInstallTask(),
        addAnimations(options),
        addStylePathToConfig(options),
        addFontsToStyles(options)
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

// Configures browser animations.
function addAnimations(options: any): any {
    return async (tree: Tree) => {
        const modulePath = (await findModuleFromOptions(tree, options));

        if (options.animations) {

            if (hasModuleImport(tree, modulePath, noopAnimationsModuleName)) {
                return console.warn(
                    `Could not set up "${browserAnimationsModuleName}" ` +
                        `because "${noopAnimationsModuleName}" is already imported. Please manually ` +
                        `set up browser animations.`
                );
            }
            addModuleImportToModule(
                tree,
                modulePath,
                browserAnimationsModuleName,
                '@angular/platform-browser/animations'
            );

            console.log(`✅️ Added ${browserAnimationsModuleName} to root module.`);
        } else if (!hasModuleImport(tree, modulePath, browserAnimationsModuleName)) {
            addModuleImportToModule(tree, modulePath, noopAnimationsModuleName, '@angular/platform-browser/animations');

            console.log(`✅️ Added ${noopAnimationsModuleName} to root module.`);
        }

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
            // tslint:disable-next-line:no-non-null-assertion
            let stylesArray = (workspaceJson!.projects[options.project]!.architect!.build!.options as any)['styles'];

            if (!stylesArray.includes(fdStylesIconPath)) {
                stylesArray = pushStylesToArray(stylesArray, fdStylesIconPath);
                // tslint:disable-next-line:no-non-null-assertion
                (workspaceJson!.projects[options.project]!.architect!.build!.options as any)['styles'] = stylesArray;
            } else {
                console.log(`✅️ Found duplicate style path in angular.json. Skipping.`);
                return tree;
            }
        } catch (e) {
            throw new SchematicsException(
                `Unable to find angular.json project styles. Please manually configure your styles array.`
            );
        }
        tree.overwrite(angularConfigPath, JSON.stringify(workspaceJson, null, 2));
        console.log(`✅️ Added fundamental-styles path to angular.json.`);
        return tree;
    };
}

// Adds the default fonts import into styles.scss
function addFontsToStyles(options: any): Rule {
    return (tree: Tree) => {
        const stylesFilePath = '/src/styles.scss';
        const stylesFileContent = tree.read('/src/styles.scss');
        const defaultFontStyleString = defaultFontStyle;
        const sapThemingImport = 'node_modules/@sap-theming/theming-base-content/content/Base/baseLib';

        if (options.styleFonts) {
            if (!stylesFileContent) {
                console.warn(
                    `Unable to find styles.scss. Please manually configure your styles. For more info, visit https://fundamental-styles.netlify.com/getting-started.html`
                );
                return tree;
            }

            try {
                let stylesFileString: string = stylesFileContent.toString();

                if (!stylesFileString.includes(sapThemingImport)) {
                    stylesFileString = defaultFontStyleString + stylesFileString;
                    tree.overwrite(stylesFilePath, stylesFileString);
                } else {
                    console.log(`✅️ There are imports from @sap-theming in styles.scss already. Skipping`);
                    return tree;
                }
            } catch (e) {
                console.warn(
                    `Unable to find styles.scss. Please manually configure your styles. For more info, visit https://fundamental-styles.netlify.com/getting-started.html`
                );
                return tree;
            }
        }

        return tree;
    };
}

function pushStylesToArray(stylesArray: any, path: string): any {
    if (!stylesArray.includes(path)) {
        stylesArray.push(path);
    }
    return stylesArray;
}
