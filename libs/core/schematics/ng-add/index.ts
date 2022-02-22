import { Rule, SchematicContext, Tree, chain, SchematicsException, TaskId } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';
import { WorkspaceSchema } from '@schematics/angular/utility/workspace-models';

import { defaultFontStyle } from './styles';
import { getPackageVersionFromPackageJson, hasPackage } from '../utils/package-utils';
import { Schema } from './schema';

// Needed to queue dependent schematics
let installTaskId: TaskId;

const fdStylesIconPath = 'node_modules/fundamental-styles/dist/icon.css';

export function ngAdd(options: any): Rule {
    return chain([
        addDependencies(options),
        endInstallTask(),
        addStylePathToConfig(options),
        addFontsToStyles(options),
        callAnimationsSchematics(options)
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

        if (!hasPackage(tree, '@angular/cdk')) {
            dependencies.push({
                type: NodeDependencyType.Default,
                version: `${ngCoreVersionTag}`,
                name: '@angular/cdk'
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
        installTaskId = context.addTask(new NodePackageInstallTask());

        return tree;
    };
}

/**
 * Process adding animations modules.
 * Done as the separate schematics as @angular/cdk tools are used that may be not installed yet.
 */
function callAnimationsSchematics(options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        // Chain won't work here since we need the externals to be actually installed before we call their schemas
        // This ensures the externals are a dependency of the node install, so they exist when their schemas run.
        context.addTask(new RunSchematicTask('add-animations', options), [installTaskId]);

        context.logger.info('✅️ Added Fundamental NGX Add Animations schematic to tasks');

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
    const extensions = ['.css', '.scss', '.less', '.sass'];

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
