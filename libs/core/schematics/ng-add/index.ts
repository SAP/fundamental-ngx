import { chain, Rule, SchematicContext, SchematicsException, TaskId, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';
import { WorkspaceSchema } from '@schematics/angular/utility/workspace-models';

import { defaultStyles } from './styles';
import { checkPackageVersion, getPackageVersionFromPackageJson, hasPackage } from '../utils/package-utils';
import { Schema } from './schema';
import { updateWorkspace } from '@schematics/angular/utility/workspace';
import { getProjectTargetOptions } from '../utils/angular-json-utils';
import { ProjectDefinition } from '@angular-devkit/core/src/workspace';

// Needed to queue dependent schematics
let installTaskId: TaskId;

const fdStylesIconPath = 'node_modules/fundamental-styles/dist/icon.css';
const angularConfigPath = '/angular.json';

const FONT_FACE_REGEX = /(@font-face)[\w\s]?{[\s\S\W\w]+?(?=\s}\s)?\s?}/gi;

interface AngularAssets {
    glob: string;
    input: string;
    output: string;
}

export function ngAdd(options: any): Rule {
    return chain([
        endInstallTask(),
        addDependencies(options),
        endInstallTask(),
        addStylePathToConfig(options),
        addAssetsPathToConfig(options),
        addFontsToStyles(options),
        addThemeToApplication(options) as unknown as Rule,
        callAnimationsSchematics(options),
        callFontMigrationSchematics(options)
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
            if (
                !hasPackage(tree, 'fundamental-styles') ||
                checkPackageVersion(tree, 'fundamental-styles', 'FDSTYLES_VER_PLACEHOLDER', '<')
            ) {
                dependencies.push({
                    type: NodeDependencyType.Default,
                    // Will be replaced with the real version during sync-version script run
                    version: `FDSTYLES_VER_PLACEHOLDER`,
                    name: 'fundamental-styles',
                    overwrite: true
                });
            }

            if (
                !hasPackage(tree, '@sap-theming/theming-base-content') ||
                checkPackageVersion(tree, '@sap-theming/theming-base-content', 'THEMING_VER_PLACEHOLDER', '<')
            ) {
                dependencies.push({
                    type: NodeDependencyType.Default,
                    // Will be replaced with the real version during sync-version scipt run
                    version: `THEMING_VER_PLACEHOLDER`,
                    name: '@sap-theming/theming-base-content',
                    overwrite: true
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

function callFontMigrationSchematics(options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        // Chain won't work here since we need the externals to be actually installed before we call their schemas
        // This ensures the externals are a dependency of the node install, so they exist when their schemas run.
        context.addTask(new RunSchematicTask('migrate-theme-fonts', options), [installTaskId]);

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

function getWorkspaceJson(tree: Tree): WorkspaceSchema {
    const angularConfigPath = '/angular.json';
    const workspaceConfig = tree.read(angularConfigPath);

    if (!workspaceConfig) {
        throw new SchematicsException(`Unable to find angular.json. Please manually configure your styles array.`);
    }

    return JSON.parse(workspaceConfig.toString());
}

function addAssetsPathToConfig(options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        const workspaceJson = getWorkspaceJson(tree);

        try {
            const additionalAssets: AngularAssets[] = [
                {
                    glob: '**/css_variables.css',
                    input: './node_modules/@sap-theming/theming-base-content/content/Base/baseLib/',
                    output: './assets/theming-base/'
                },
                {
                    glob: '**/*',
                    input: './node_modules/fundamental-styles/dist/theming/',
                    output: './assets/fundamental-styles-theming/'
                }
            ];

            let assetsArray = (workspaceJson!.projects[options.project]!.architect!.build!.options as any)[
                'assets'
            ] as (string | AngularAssets)[];

            additionalAssets.forEach((asset) => {
                if (
                    !assetsArray.find((jsonAsset) => typeof jsonAsset === 'object' && jsonAsset.input === asset.input)
                ) {
                    assetsArray.push(asset);
                }
            });
        } catch (e) {
            throw new SchematicsException(
                `Unable to find angular.json project assets. Please manually configure your assets array.`
            );
        }

        tree.overwrite(angularConfigPath, JSON.stringify(workspaceJson, null, 2));

        context.logger.info(`✅️ Added theming assets to angular.json.`);

        return tree;
    };
}

// Adds the icon style path to the angular.json.
function addStylePathToConfig(options: any): Rule {
    return (tree: Tree, context: SchematicContext) => {
        const workspaceJson = getWorkspaceJson(tree);

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
        context.logger.info(`
        ❔Learn more how to enable theming for your application here: https://sap.github.io/fundamental-ngx/#/core/theming
        `);

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

                let fontsImported = false;

                Object.keys(defaultStyles).forEach((font) => {
                    const matches = stylesFileString.match(FONT_FACE_REGEX);
                    if (!matches || matches.filter((match) => match.includes(font)).length === 0) {
                        stylesFileString = stylesFileString + (defaultStyles[font] as string);
                        fontsImported = true;
                    }
                });

                if (fontsImported) {
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

function addThemeToApplication(options: Schema) {
    return (_tree: any, context: any) =>
        updateWorkspace((workspace) => {
            if (options.theme !== 'custom') {
                const themeAssets = [
                    `./node_modules/@sap-theming/theming-base-content/content/Base/baseLib/${options.theme}/css_variables.css`,
                    `./node_modules/fundamental-styles/dist/theming/${options.theme}.css`
                ];
                const targetOptions = getProjectTargetOptions(
                    workspace.projects.get(options.project) as unknown as ProjectDefinition,
                    'build'
                );
                const styles = targetOptions.styles as (string | { input: string })[];

                for (let i = 0; i < styles.length; i++) {
                    let style = styles[i];
                    const baseVariablesRegex = /@sap-theming\/(.*)\/baseLib\/(.*)\/css_variables.css$/;
                    const fundamentalStylesDeltaThemingVariablesRegex =
                        /fundamental-styles\/(.*)\/theming\/(.*)\/.css$/;
                    const stylePath = typeof style === 'string' ? style : style.input;

                    const baseVariablesMatch = stylePath.match(baseVariablesRegex);
                    if (baseVariablesMatch) {
                        const theme = baseVariablesMatch[2];
                        context.logger.info(`
                        Found theme ${theme} base SAP variables in styles. Can not add theme to application.
                        Try to replace theme in application manually, or use ThemingService to manage multiple themes.
                        [Instructions: https://sap.github.io/fundamental-ngx/#/core/theming]
                    `);
                        return;
                    }

                    const fundamentalStylesDeltaThemingVariablesMatch = stylePath.match(
                        fundamentalStylesDeltaThemingVariablesRegex
                    );
                    if (fundamentalStylesDeltaThemingVariablesMatch) {
                        const theme = fundamentalStylesDeltaThemingVariablesMatch[2];
                        context.logger.info(`
                        Found theme ${theme} fundamental-styles variables in styles. Can not add theme to application.
                        Try to replace theme in application manually, or use ThemingService to manage multiple themes.
                        [Instructions: https://sap.github.io/fundamental-ngx/#/core/theming]
                    `);
                        return;
                    }
                }

                targetOptions.styles = [...(styles || []), ...themeAssets];
                context.logger.info(
                    `✅️ Added theme ${options.theme} variables to project ${options.project} in angular.json.`
                );
            }
        });
}
