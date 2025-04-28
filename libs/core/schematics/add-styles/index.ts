import { AssetPattern, AssetPatternClass } from '@angular-devkit/build-angular/src/builders/browser/schema';
import { Rule, SchematicContext, SchematicsException, Tree, chain } from '@angular-devkit/schematics';
import { Schema } from '../models/schema';
import { getProjectBuildTarget, getWorkspaceDefinition, updateWorkspaceDefinition } from '../utils/workspace';

/**
 * Add styles to angular.json
 * @param options
 */
export function addStyles(options: Schema): Rule {
    return chain([addStylesToConfig(options), addAssetsToConfig(options)]);
}

function handleError(context: SchematicContext, error: Error, message: string): void {
    context.logger.error(message);
    throw new SchematicsException(`${message}: ${error.message}`);
}

function addStylesToConfig(options: Schema): Rule {
    return async (tree: Tree, context: SchematicContext): Promise<void> => {
        try {
            const additionalStyle = './node_modules/@fundamental-ngx/core/styles/fundamental-ngx-core.css';
            const buildTarget = await getProjectBuildTarget(tree, options.project);
            const stylesArray: string[] = (buildTarget.options?.styles as string[]) || [];

            if (!stylesArray.includes(additionalStyle)) {
                stylesArray.push(additionalStyle);
                context.logger.info(`✅️ Added style to angular.json.`);
            } else {
                context.logger.info(`✅️ Style already exists in angular.json. Skipping.`);
            }

            buildTarget.options.styles = stylesArray;
            const workspace = await getWorkspaceDefinition(tree);
            await updateWorkspaceDefinition(tree, workspace);
        } catch (error) {
            handleError(context, error, 'Failed to add styles configuration');
        }
    };
}

function addAssetsToConfig(options: Schema): Rule {
    return async (tree: Tree, context: SchematicContext): Promise<void> => {
        try {
            const additionalAssets: AssetPatternClass[] = [
                {
                    glob: '**/css_variables.css',
                    input: './node_modules/@sap-theming/theming-base-content/content/Base/baseLib/',
                    output: './assets/theming-base/'
                },
                {
                    glob: '**/*',
                    input: './node_modules/@sap-theming/theming-base-content/content/Base/baseLib/baseTheme/fonts/',
                    output: './assets/theming-base/baseTheme/fonts/'
                },
                {
                    glob: '**/*',
                    input: './node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_horizon/fonts/',
                    output: './assets/theming-base/sap_horizon/fonts/'
                },
                {
                    glob: '**/*',
                    input: './node_modules/fundamental-styles/dist/theming/',
                    output: './assets/fundamental-styles-theming/'
                }
            ];

            const buildTarget = await getProjectBuildTarget(tree, options.project);
            const assetsArray: AssetPattern[] = (buildTarget.options?.assets as AssetPattern[]) || [];

            const newAssets = additionalAssets.filter(
                (newAsset) =>
                    !assetsArray.some(
                        (existingAsset) =>
                            typeof existingAsset === 'object' &&
                            existingAsset.input === newAsset.input &&
                            existingAsset.glob === newAsset.glob &&
                            existingAsset.output === newAsset.output
                    )
            );

            if (newAssets.length > 0) {
                assetsArray.push(...newAssets);
                context.logger.info(`✅️ Added assets to angular.json.`);
            } else {
                context.logger.info(`✅️ Assets already exist in angular.json. Skipping.`);
            }

            buildTarget.options.assets = assetsArray;
            const workspace = await getWorkspaceDefinition(tree);
            await updateWorkspaceDefinition(tree, workspace);
        } catch (error) {
            handleError(context, error, 'Failed to add assets configuration');
        }
    };
}
