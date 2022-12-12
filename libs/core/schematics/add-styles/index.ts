import { chain, Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';
import { WorkspaceSchema } from '@schematics/angular/utility/workspace-models';
import { Schema } from '../models/schema';

const angularConfigPath = '/angular.json';

interface AngularAssets {
    glob: string;
    input: string;
    output: string;
}

export function addStyles(options: Schema): Rule {
    return chain([addStylesToConfig(options), addAssetsToConfig(options)]);
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

function _getWorkspaceJson(tree: Tree): WorkspaceSchema {
    const workspaceConfig = tree.read(angularConfigPath);

    if (!workspaceConfig) {
        throw new SchematicsException(
            `Unable to find angular.json. Please manually configure your assets & styles arrays.`
        );
    }

    return JSON.parse(workspaceConfig.toString());
}
