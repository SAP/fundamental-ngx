import { Rule, SchematicContext, Tree, chain, SchematicsException } from '@angular-devkit/schematics';
import { addModuleImportToModule, findModuleFromOptions } from '@angular/cdk/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';
import { WorkspaceSchema } from '@schematics/angular/utility/workspace-models';

import { defaultFontStyle } from './styles';
import { hasModuleImport } from '../utils/ng-module-utils';
import { getPackageVersionFromPackageJson, hasPackage } from '../utils/package-utils';
import { Schema } from './schema';

const browserAnimationsModuleName = 'BrowserAnimationsModule';
const noopAnimationsModuleName = 'NoopAnimationsModule';
const fdStylesIconPath = 'node_modules/fundamental-styles/dist/icon.css';

export function ngAdd(options: any): Rule {
    return chain([
        addDependencies(options),
        endInstallTask(),
        addAnimations(options),
        addStylePathToConfig(options),
        addFontsToStyles(options)
    ]);
}

// Adds missing dependencies to the project.
function addDependencies(options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
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

        if (options.styleFonts) {
            if (!hasPackage(tree, 'fundamental-styles')) {
                dependencies.push({
                    type: NodeDependencyType.Default,
                    // Will be replaced with the real version during sync-version scipt run
                    version: `FDSTYLES_VER_PLACEHOLDER`,
                    name: 'fundamental-styles'
                });
            }

            if (!hasPackage(tree, '@sap-theming/theming-base-content')) {
                dependencies.push({
                    type: NodeDependencyType.Default,
                    // Will be replaced with the real version during sync-version scipt run
                    version: `THEMING_VER_PLACEHOLDER`,
                    name: '@sap-theming/theming-base-content'
                });
            }
        }

        dependencies.forEach((dependency) => {
            addPackageJsonDependency(tree, dependency);

            context.logger.info(`✅️ Added ${dependency.name} to ${dependency.type}.`);
        });

        return tree;
    };
}

// Runs npm install. Called as the last rule.
function endInstallTask(): Rule {
    return (tree: Tree, context: SchematicContext) => {
        context.addTask(new NodePackageInstallTask());

        return tree;
    };
}

// Configures browser animations.
function addAnimations(options: any): any {
    return async (tree: Tree, context: SchematicContext) => {
        const modulePath = await findModuleFromOptions(tree, options);

        if (options.animations) {
            if (hasModuleImport(tree, modulePath, noopAnimationsModuleName)) {
                context.logger.warn(
                    `Could not set up "${browserAnimationsModuleName} because "${noopAnimationsModuleName}" is already imported. Please manually set up browser animations.`
                );

                return tree;
            }

            if (hasModuleImport(tree, modulePath, browserAnimationsModuleName)) {
                context.logger.info(
                    `✅️ Import of ${browserAnimationsModuleName} already present in root module. Skipping.`
                );

                return tree;
            }

            addModuleImportToModule(
                tree,
                modulePath,
                browserAnimationsModuleName,
                '@angular/platform-browser/animations'
            );

            context.logger.info(`✅️ Added ${browserAnimationsModuleName} to root module.`);

            return tree;
        }

        if (!hasModuleImport(tree, modulePath, browserAnimationsModuleName)) {
            addModuleImportToModule(tree, modulePath, noopAnimationsModuleName, '@angular/platform-browser/animations');

            context.logger.info(`✅️ Added ${noopAnimationsModuleName} to root module.`);
        }

        return tree;
    };
}

// Adds the icon style path to the angular.json.
function addStylePathToConfig(options: any): Rule {
    return (tree: Tree, context: SchematicContext) => {
        const angularConfigPath = '/angular.json';
        const workspaceConfig = tree.read(angularConfigPath);

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
                context.logger.info(`✅️ Found duplicate style path in angular.json. Skipping.`);

                return tree;
            }
        } catch (e) {
            throw new SchematicsException(
                `Unable to find angular.json project styles. Please manually configure your styles array.`
            );
        }

        tree.overwrite(angularConfigPath, JSON.stringify(workspaceJson, null, 2));

        context.logger.info(`✅️ Added fundamental-styles path to angular.json.`);

        return tree;
    };
}

function pushStylesToArray(stylesArray: any, path: string): any {
    if (!stylesArray.includes(path)) {
        stylesArray.push(path);
    }

    return stylesArray;
}

// Adds the default fonts import into styles.scss
function addFontsToStyles(options: any): Rule {
    return (tree: Tree, context: SchematicContext) => {
        let [stylesFilePath, stylesFileContent] = resolveStyles(tree);

        if (options.styleFonts) {
            if (!stylesFileContent) {
                context.logger.warn(
                    `Unable to find styles file. Please manually configure your styles. For more info, visit https://fundamental-styles.netlify.app/?path=/docs/introduction-overview--page#project-configuration`
                );

                return tree;
            }

            try {
                let stylesFileString = stylesFileContent.toString();

                if (!stylesFileString.includes(defaultFontStyle)) {
                    stylesFileString = defaultFontStyle + stylesFileString;

                    tree.overwrite(stylesFilePath, stylesFileString);

                    context.logger.info(`✅️ Added imports from @sap-theming to styles file.`);

                    return tree;
                }

                context.logger.info(`✅️ There are imports from @sap-theming in styles file already. Skipping.`);

                return tree;
            } catch (e) {
                context.logger.warn(
                    `Unable to find styles file. Please manually configure your styles. For more info, visit https://fundamental-styles.netlify.com/getting-started.html`
                );

                return tree;
            }
        }

        return tree;
    };
}

function resolveStyles(tree: Tree): [string, Buffer] {
    const basePath = '/src/styles';
    const extensions = ['.css', '.scss', '.less'];

    let path: string;
    let content: Buffer;

    for (let extension of extensions) {
        path = basePath + extension;
        content = tree.read(path);

        if (content) {
            return [path, content];
        }
    }

    return [path, content];
}
