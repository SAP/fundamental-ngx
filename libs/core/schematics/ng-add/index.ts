import { chain, Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';
import { WorkspaceSchema } from '@schematics/angular/utility/workspace-models';
import { updateWorkspace, WorkspaceDefinition } from '@schematics/angular/utility/workspace';
import { Change, InsertChange } from '@schematics/angular/utility/change';
import {
    addModuleImportToModule,
    findBootstrapModuleCall,
    findModuleFromOptions,
    findNode,
    findNodes,
    getAppModulePath,
    getProjectMainFile,
    insertImport
} from '@angular/cdk/schematics';
import * as ts from 'typescript';

import {
    checkPackageVersion,
    getPackageVersionFromPackageJson,
    getSourceFile,
    hasPackage
} from '../utils/package-utils';
import { Schema } from './schema';
import { getProjectTargetOptions } from '../utils/angular-json-utils';
import { hasModuleImport } from '../utils/ng-module-utils';

const angularConfigPath = '/angular.json';

interface AngularAssets {
    glob: string;
    input: string;
    output: string;
}

interface AngularStyle {
    input: string;
    inject: boolean;
    bundleName: string;
}

export function ngAdd(options: any): Rule {
    return chain([
        addDependencies(options),
        addStylesToConfig(options),
        addAssetsToConfig(options),
        addTheming(options),
        addAnimations(options),
        endInstallTask()
    ]);
}

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

        if (options.animations && !hasPackage(tree, '@angular/animations')) {
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
                // Will be replaced with the real version during sync-version script run
                version: `THEMING_VER_PLACEHOLDER`,
                name: '@sap-theming/theming-base-content',
                overwrite: true
            });
        }

        dependencies.forEach((dependency) => {
            addPackageJsonDependency(tree, dependency);

            context.logger.info(`✅️ Added ${dependency.name} to ${dependency.type}.`);
        });

        return tree;
    };
}

function endInstallTask(): Rule {
    return (tree: Tree, context: SchematicContext) => {
        context.addTask(new NodePackageInstallTask());

        return tree;
    };
}

function addStylesToConfig(options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        const workspaceJson = _getWorkspaceJson(tree);

        try {
            const additionalStyles = ['./node_modules/@fundamental-ngx/core/styles/fundamental-ngx-core.css'];

            if (options.fonts) {
                additionalStyles.push('./node_modules/fundamental-styles/dist/fonts/sap_fonts.css');
            }

            let stylesArray: (string | AngularAssets)[] = (
                workspaceJson!.projects[options.project]!.architect!.build!.options as any
            )['styles'];
            let stylesUpdated = false;

            additionalStyles.forEach((additionalStyle) => {
                if (
                    !stylesArray.find(
                        (jsonStyle) => typeof jsonStyle === 'string' && jsonStyle === `${additionalStyle}`
                    )
                ) {
                    stylesUpdated = true;
                    stylesArray.push(additionalStyle);
                }
            });

            if (!stylesUpdated) {
                context.logger.info(`✅️ Found duplicate styles in angular.json. Skipping.`);

                if (options.fonts) {
                    context.logger.info(`✅️ Found duplicate font styles to angular.json.`);
                }

                return tree;
            }

            (workspaceJson!.projects[options.project]!.architect!.build!.options as any)['styles'] = stylesArray;
        } catch (e) {
            throw new SchematicsException(
                `Unable to find angular.json project styles. Please manually configure your styles array.`
            );
        }

        tree.overwrite(angularConfigPath, JSON.stringify(workspaceJson, null, 2));

        context.logger.info(`✅️ Added styles to angular.json.`);

        if (options.fonts) {
            context.logger.info(`✅️ Added font styles to angular.json.`);
        }

        return tree;
    };
}

function addAssetsToConfig(options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        const workspaceJson = _getWorkspaceJson(tree);

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
            let assetsArray: (string | AngularAssets)[] = (
                workspaceJson!.projects[options.project]!.architect!.build!.options as any
            )['assets'];
            let assetsUpdated = false;

            additionalAssets.forEach((asset) => {
                if (
                    !assetsArray.find((jsonAsset) => typeof jsonAsset === 'object' && jsonAsset.input === asset.input)
                ) {
                    assetsUpdated = true;
                    assetsArray.push(asset);
                }
            });

            if (!assetsUpdated) {
                context.logger.info(`✅️ Found duplicate assets in angular.json. Skipping.`);
                return tree;
            }

            (workspaceJson!.projects[options.project]!.architect!.build!.options as any)['assets'] = assetsArray;
        } catch (e) {
            throw new SchematicsException(
                `Unable to find angular.json project assets. Please manually configure your assets array.`
            );
        }

        tree.overwrite(angularConfigPath, JSON.stringify(workspaceJson, null, 2));

        context.logger.info(`✅️ Added assets to angular.json.`);

        return tree;
    };
}

function addTheming(options: Schema): Rule {
    return (tree, context) =>
        updateWorkspace(async (workspace) => {
            context.logger.info(
                `⚠️ Currently, we don't automatically remove the deprecated Themes approach. If you have it applied you have to remove it by yourself.
[Instructions: https://sap.github.io/fundamental-ngx/#/core/theming]`
            );

            if (options.theme === 'custom') {
                return;
            }

            const targetOptions = getProjectTargetOptions(workspace.projects.get(options.project)!, 'build');
            const styles = targetOptions.styles as (string | { input: string })[];

            for (let i = 0; i < styles.length; i++) {
                let style = styles[i];
                const stylePath = typeof style === 'string' ? style : style.input;

                const baseVariablesMatch = stylePath.match(/@sap-theming\/(.*)\/baseLib\/(.*)\/css_variables.css$/);
                if (baseVariablesMatch) {
                    const theme = baseVariablesMatch[2];
                    context.logger
                        .info(`ℹ️ Found theming ${theme} base SAP variables in styles. Can not add theme to application.
Try to replace theme in application manually, or use ThemingService to manage multiple themes.
[Instructions: https://sap.github.io/fundamental-ngx/#/core/theming]`);
                    return;
                }

                const fundamentalStylesDeltaThemingVariablesMatch = stylePath.match(
                    /fundamental-styles\/(.*)\/theming\/(.*)\/.css$/
                );
                if (fundamentalStylesDeltaThemingVariablesMatch) {
                    const theme = fundamentalStylesDeltaThemingVariablesMatch[2];
                    context.logger
                        .info(`ℹ️ Found theming ${theme} fundamental-styles variables in styles. Can not add theme to application.
Try to replace theme in application manually, or use ThemingService to manage multiple themes.
[Instructions: https://sap.github.io/fundamental-ngx/#/core/theming]`);
                    return;
                }
            }

            const workspaceJson = _getWorkspaceJson(tree);
            const iconFonts = ['sap_fiori_3_fonts', 'sap_horizon_fonts'];
            let stylesArray: (string | AngularStyle)[] = (
                workspaceJson!.projects[options.project]!.architect!.build!.options as any
            )['styles'];
            let stylesUpdated = false;

            iconFonts.forEach((font) => {
                if (
                    !stylesArray.find(
                        (jsonStyle) => typeof jsonStyle === 'object' && jsonStyle.bundleName === `${font}`
                    )
                ) {
                    stylesUpdated = true;
                    stylesArray.push({
                        input: `./node_modules/fundamental-styles/dist/fonts/${font}.css`,
                        inject: false,
                        bundleName: font
                    });
                }
            });

            if (stylesUpdated) {
                (workspaceJson!.projects[options.project]!.architect!.build!.options as any)['styles'] = stylesArray;

                tree.overwrite(angularConfigPath, JSON.stringify(workspaceJson, null, 2));

                context.logger.info(`✅️ Added theming icon font styles to angular.json.`);
            } else {
                context.logger.info(`✅️ Found duplicate theming icon font styles in angular.json. Skipping.`);
            }

            try {
                _addThemingModuleInit(options, tree, workspace);

                context.logger.info(`✅️ Added Theming initialization to app module.`);
            } catch (e) {
                context.logger.info(`ℹ️ Please process adding Theming to root module by yourself.
[Instructions: https://sap.github.io/fundamental-ngx/#/core/theming]`);
            }
        });
}

function addAnimations(options: Schema): any {
    return async (tree: Tree, context: SchematicContext) => {
        const browserAnimationsModuleName = 'BrowserAnimationsModule';
        const noopAnimationsModuleName = 'NoopAnimationsModule';
        const modulePath = await findModuleFromOptions(tree, options as any);

        if (!modulePath) {
            context.logger.warn(
                `⚠️ Could not set up animations because root module not found. Please manually set up animations.`
            );
            return;
        }

        if (options.animations) {
            if (hasModuleImport(tree, modulePath, noopAnimationsModuleName)) {
                context.logger.warn(
                    `⚠️ Could not set up "${browserAnimationsModuleName} because "${noopAnimationsModuleName}" is already imported. Please manually set up browser animations.`
                );

                return tree;
            }

            if (hasModuleImport(tree, modulePath, browserAnimationsModuleName)) {
                context.logger.info(
                    `✅️ Import of ${browserAnimationsModuleName} already present in app module. Skipping.`
                );

                return tree;
            }

            addModuleImportToModule(
                tree,
                modulePath,
                browserAnimationsModuleName,
                '@angular/platform-browser/animations'
            );

            context.logger.info(`✅️ Added ${browserAnimationsModuleName} to app module.`);

            return tree;
        }

        if (!hasModuleImport(tree, modulePath, browserAnimationsModuleName)) {
            addModuleImportToModule(tree, modulePath, noopAnimationsModuleName, '@angular/platform-browser/animations');

            context.logger.info(`✅️ Added ${noopAnimationsModuleName} to app module.`);
        }

        return tree;
    };
}

function _getWorkspaceJson(tree: Tree): WorkspaceSchema {
    const workspaceConfig = tree.read(angularConfigPath);

    if (!workspaceConfig) {
        throw new SchematicsException(
            `Unable to find angular.json. Please manually configure your assets & styles arrays.`
        );
    }

    return JSON.parse(workspaceConfig.toString());
}

function _addThemingModuleInit(options: Schema, tree: Tree, workspace: WorkspaceDefinition): void {
    const projectDef = workspace.projects.get(options.project);
    const mainPath = getProjectMainFile(projectDef!);
    const bootstrapModuleCall = findBootstrapModuleCall(tree, mainPath);

    if (!bootstrapModuleCall) {
        throw new SchematicsException(`❌ No bootstrap module call found.`);
    }

    const appModulePath = getAppModulePath(tree, mainPath);
    const appModuleName = bootstrapModuleCall.arguments[0].getText();
    const appModuleSourceFile = getSourceFile(tree, appModulePath);
    const appModuleClassIdentifierNode = findNode(appModuleSourceFile, ts.SyntaxKind.Identifier, appModuleName);

    if (!appModuleClassIdentifierNode) {
        throw new SchematicsException(`❌ App module declaration not found.`);
    }

    const changes: Change[] = [];

    changes.push(insertImport(appModuleSourceFile, appModulePath, `ThemingService`, `@fundamental-ngx/core/theming`));

    const appModuleClass = appModuleClassIdentifierNode.parent;
    const appModuleCtr = findNodes(appModuleClass, ts.SyntaxKind.Constructor)[0];

    if (appModuleCtr) {
        const ctrBlock = findNodes(appModuleCtr, ts.SyntaxKind.Block)[0];
        const ctrParameters = (appModuleCtr as ts.ConstructorDeclaration).parameters;

        changes.push(
            new InsertChange(
                appModulePath,
                (ctrParameters.length ? ctrParameters[ctrParameters.length - 1].pos : ctrBlock.pos) - 1,
                (ctrParameters.length ? ', ' : '') + `themingService: ThemingService`
            )
        );

        changes.push(new InsertChange(appModulePath, ctrBlock.end - 1, `\nthemingService.init();\n`));
    } else {
        changes.push(
            new InsertChange(
                appModulePath,
                appModuleClass.end - 1,
                `\nconstructor(themingService: ThemingService) {\nthemingService.init();\n}\n`
            )
        );
    }

    const exportRecorder = tree.beginUpdate(appModulePath);

    for (const change of changes) {
        if (change instanceof InsertChange) {
            exportRecorder.insertLeft(change.pos, change.toAdd);
        }
    }

    tree.commitUpdate(exportRecorder);

    const themingModuleConfig =
        `{ defaultTheme: '${options.theme}'` + (!options.readThemeFromURL ? `, loadStylesFromURL: false` : '') + ` }`;

    // Done afterwards to avoid the mess with insert positions
    addModuleImportToModule(
        tree,
        appModulePath,
        `ThemingModule.withConfig(${themingModuleConfig})`,
        '@fundamental-ngx/core/theming'
    );

    if (options.readThemeFromURL && !hasModuleImport(tree, appModulePath, 'RouterModule')) {
        addModuleImportToModule(tree, appModulePath, 'RouterModule.forRoot([])', '@angular/router');
    }
}
