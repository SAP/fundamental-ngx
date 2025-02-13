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

function addStylesToConfig(options: Schema): Rule {
    return async (tree: Tree, context: SchematicContext) => {
        try {
            const additionalStyles = ['./node_modules/@fundamental-ngx/core/styles/fundamental-ngx-core.css'];

            if (options.fonts) {
                additionalStyles.push('./node_modules/fundamental-styles/dist/fonts/sap_fonts.css');
            }
            const buildTarget = await getProjectBuildTarget(tree, options.project);
            const stylesArray: AssetPattern[] = (buildTarget.options?.styles as any) || [];
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
                const workspace = await getWorkspaceDefinition(tree);
                await updateWorkspaceDefinition(tree, workspace);
                return;
            }
            if (buildTarget.options) {
                buildTarget.options.styles = stylesArray as any;
            } else {
                buildTarget.options = {
                    styles: stylesArray as any
                };
            }
        } catch {
            throw new SchematicsException(
                `Unable to find angular.json project styles. Please manually configure your styles array.`
            );
        }

        context.logger.info(`✅️ Added styles to angular.json.`);

        if (options.fonts) {
            context.logger.info(`✅️ Added font styles to angular.json.`);
        }
    };
}

function addAssetsToConfig(options: Schema): Rule {
    return async (tree: Tree, context: SchematicContext) => {
        const workspaceJson = await getWorkspaceDefinition(tree);

        try {
            const additionalAssets: AssetPatternClass[] = [
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
            const buildTarget = await getProjectBuildTarget(tree, options.project);
            const assetsArray: AssetPattern[] = (buildTarget.options as any)['assets'];
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
                return;
            }

            (buildTarget.options as any)['assets'] = assetsArray;
        } catch {
            throw new SchematicsException(
                `Unable to find angular.json project assets. Please manually configure your assets array.`
            );
        }

        await updateWorkspaceDefinition(tree, workspaceJson!);

        context.logger.info(`✅️ Added assets to angular.json.`);

        return;
    };
}
