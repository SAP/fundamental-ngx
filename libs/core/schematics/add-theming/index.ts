import { StyleElement } from '@angular-devkit/build-angular/src/builders/browser-esbuild/schema';
import { chain, Rule } from '@angular-devkit/schematics';
import {
    addModuleImportToRootModule,
    getAppModulePath,
    hasNgModuleImport,
    isStandaloneApp
} from '@angular/cdk/schematics';
import { addRootProvider } from '@schematics/angular/utility';
import { Schema } from '../models/schema';
import { callsProvidersFunction } from '../utils/calls-providers-function';
import { getMainTsFilePath } from '../utils/main-ts-file-path';
import {
    getProjectBuildTarget,
    getProjectDefinition,
    getWorkspaceDefinition,
    updateWorkspaceDefinition
} from '../utils/workspace';

/**
 * Add theming to angular.json and root module or config
 * @param options
 */
export function addTheming(options: Schema): Rule {
    return async (tree, context) => {
        if (options.theme === 'custom') {
            return;
        }
        const workspace = await getWorkspaceDefinition(tree);

        context.logger.info(
            `⚠️ Currently, we don't automatically remove the deprecated Themes approach. If you have it applied you have to remove it by yourself.
[Instructions: https://sap.github.io/fundamental-ngx/#/core/theming]`
        );
        const buildTarget = await getProjectBuildTarget(tree, options.project);
        const targetOptions = buildTarget.options;
        if (!targetOptions) {
            context.logger.info(
                `⚠️ Can not add theming to application. Please add theming manually. Reason: no target options found for project ${options.project}`
            );
            return;
        }
        const styles = targetOptions.styles as StyleElement[];

        for (let i = 0; i < styles.length; i++) {
            const style = styles[i];
            const stylePath = typeof style === 'string' ? style : style.input;

            const baseVariablesMatch = stylePath.match(/@sap-theming\/(.*)\/baseLib\/(.*)\/css_variables.css$/);
            if (baseVariablesMatch) {
                const theme = baseVariablesMatch[2];
                context.logger
                    .info(`⚠️ Found theming ${theme} base SAP variables in styles. Can not add theme to application.
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
                    .info(`⚠️ Found theming ${theme} fundamental-styles variables in styles. Can not add theme to application.
Try to replace theme in application manually, or use ThemingService to manage multiple themes.
[Instructions: https://sap.github.io/fundamental-ngx/#/core/theming]`);
                return;
            }
        }

        const iconFonts = ['sap_fiori_3_fonts', 'sap_horizon_fonts'];

        let stylesUpdated = false;

        iconFonts.forEach((font) => {
            if (!styles.find((jsonStyle) => typeof jsonStyle === 'object' && jsonStyle.bundleName === `${font}`)) {
                stylesUpdated = true;
                styles.push({
                    input: `./node_modules/fundamental-styles/dist/fonts/${font}.css`,
                    inject: false,
                    bundleName: font
                });
            }
        });

        if (stylesUpdated) {
            targetOptions.outputHashing = 'all';

            await updateWorkspaceDefinition(tree, workspace);
            context.logger.info(`✅️ Added theming icon font styles to angular.json and set outputHashing to 'all'`);
        } else {
            context.logger.info(`✅️ Found duplicate theming icon font styles in angular.json. Skipping.`);
        }
        try {
            return chain([
                async () => {
                    if (!(await callsProvidersFunction(tree, options.project, 'provideTheming'))) {
                        return chain([
                            addRootProvider(
                                options.project,
                                ({ code, external }) =>
                                    code`${external(
                                        'provideTheming',
                                        '@fundamental-ngx/core/theming'
                                    )}({ defaultTheme: '${options.theme}', changeThemeOnQueryParamChange: ${
                                        options.readThemeFromURL ? 'true' : 'false'
                                    } })`
                            ),
                            () => context.logger.info(`✅️ Added theming provider to root app config`)
                        ]);
                    }
                    context.logger.info(`✅️ Found theming provider in root app config, skipping adding it.`);
                },
                async () => {
                    if (options.readThemeFromURL) {
                        const mainPath = await getMainTsFilePath(tree, options.project);
                        if (isStandaloneApp(tree, mainPath)) {
                            if (!(await callsProvidersFunction(tree, options.project, 'provideRouter'))) {
                                return chain([
                                    addRootProvider(
                                        options.project,
                                        ({ code, external }) =>
                                            code`${external('provideRouter', '@fundamental-ngx/core/router')}([])`
                                    ),
                                    () => context.logger.info(`✅️ Added router provider to root app config`)
                                ]);
                            }
                        } else {
                            const appModulePath = getAppModulePath(tree, mainPath);
                            if (!hasNgModuleImport(tree, appModulePath, 'RouterModule')) {
                                addModuleImportToRootModule(
                                    tree,
                                    'RouterModule.forRoot([])',
                                    '@angular/router',
                                    await getProjectDefinition(tree, options.project)
                                );
                                context.logger.info(`✅️ Added RouterModule.forRoot([]) to root app module`);
                            }
                        }
                    }
                },
                async () => {
                    if (!(await callsProvidersFunction(tree, options.project, 'themingInitializer'))) {
                        return chain([
                            addRootProvider(
                                options.project,
                                ({ code, external }) =>
                                    code`${external('themingInitializer', '@fundamental-ngx/core/theming')}()`
                            ),
                            () => context.logger.info(`✅️ Added themingInitializer provider to root app config`)
                        ]);
                    }
                    context.logger.info(
                        `✅️ Found themingInitializer provider in root app config, skipping adding it.`
                    );
                }
            ]);
        } catch (e) {
            context.logger.debug(e);
            context.logger.info(`⚠️ Please process adding Theming to root module by yourself.
[Instructions: https://sap.github.io/fundamental-ngx/#/core/theming]`);
        }
    };
}
