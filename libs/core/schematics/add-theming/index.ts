import { Rule, SchematicsException, Tree } from '@angular-devkit/schematics';
import {
    addModuleImportToModule,
    findBootstrapModuleCall,
    findNode,
    findNodes,
    getAppModulePath,
    getProjectMainFile,
    getProjectTargetOptions,
    insertImport
} from '@angular/cdk/schematics';
import { Change, InsertChange } from '@schematics/angular/utility/change';
import { updateWorkspace, WorkspaceDefinition } from '@schematics/angular/utility/workspace';
import { WorkspaceSchema } from '@schematics/angular/utility/workspace-models';
// Fixes error with additional 'default' key.
import * as ts from 'typescript';
import { Schema } from '../models/schema';
import { hasModuleImport } from '../utils/ng-module-utils';
import { getSourceFile } from '../utils/package-utils';

const angularConfigPath = '/angular.json';

interface AngularStyle {
    input: string;
    inject: boolean;
    bundleName: string;
}

export function addTheming(options: any): Rule {
    return (tree, context) =>
        updateWorkspace(async (workspace) => {
            if (options.theme === 'custom') {
                return;
            }

            context.logger.info(
                `⚠️ Currently, we don't automatically remove the deprecated Themes approach. If you have it applied you have to remove it by yourself.
[Instructions: https://sap.github.io/fundamental-ngx/#/core/theming]`
            );

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
                context.logger.debug(e);
                context.logger.info(`ℹ️ Please process adding Theming to root module by yourself.
[Instructions: https://sap.github.io/fundamental-ngx/#/core/theming]`);
            }
        });
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
    const appModuleClassIdentifierNode = findNode(appModuleSourceFile as any, ts.SyntaxKind.Identifier, appModuleName);

    if (!appModuleClassIdentifierNode) {
        throw new SchematicsException(`❌ App module declaration not found.`);
    }

    const changes: Change[] = [];

    changes.push(insertImport(appModuleSourceFile as any, appModulePath, `ThemingService`, `@fundamental-ngx/core/theming`));

    const appModuleClass = appModuleClassIdentifierNode.parent;
    const appModuleCtr = findNodes(appModuleClass, ts.SyntaxKind.Constructor)[0];

    if (appModuleCtr) {
        const ctrBlock = findNodes(appModuleCtr, ts.SyntaxKind.Block)[0];
        const ctrParameters = (appModuleCtr as unknown as ts.ConstructorDeclaration).parameters;

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
        `{ defaultTheme: '${options.theme}'` +
        (!options.readThemeFromURL ? `, changeThemeOnQueryParamChange: false` : '') +
        ` }`;

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
