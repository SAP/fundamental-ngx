import { AssetPattern, AssetPatternClass } from '@angular-devkit/build-angular/src/builders/browser/schema';
import { Rule, SchematicContext, SchematicsException, Tree, chain } from '@angular-devkit/schematics';
import { Schema } from '../models/schema';
import { getProjectBuildTarget, getWorkspaceDefinition, updateWorkspaceDefinition } from '../utils/workspace';

/**
 * Add styles to angular.json
 * @param options
 */
export function addStyles(options: Schema): Rule {
    return chain([addStylesToConfig(options), addAssetsToConfig(options), updateBudgets(options)]);
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
            // Asset configuration for @sap-theming/theming-base-content
            // Starting with version 11.36.4 (Theming Engine 17.0.29), font paths in CSS changed from
            // relative paths (e.g., ../sap_horizon/fonts/) to absolute paths (../../../Base/baseLib/sap_horizon/fonts/).
            // To fix this, we copy fonts to match the absolute path structure (./Base/baseLib/*/fonts/).
            // This approach copies only ~5.5MB of fonts instead of the entire 48MB content/ directory.
            const additionalAssets: AssetPatternClass[] = [
                {
                    glob: '**/css_variables.css',
                    input: './node_modules/@sap-theming/theming-base-content/content/Base/baseLib/',
                    output: './assets/theming-base/'
                },
                {
                    glob: '**/*',
                    input: './node_modules/@sap-theming/theming-base-content/content/Base/baseLib/baseTheme/fonts/',
                    output: './Base/baseLib/baseTheme/fonts/'
                },
                {
                    glob: '**/*',
                    input: './node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_horizon/fonts/',
                    output: './Base/baseLib/sap_horizon/fonts/'
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

interface BudgetEntry {
    type: string;
    maximumWarning?: string;
    maximumError?: string;
}

const CLI_DEFAULT_WARNING = '500kB';
const CLI_DEFAULT_ERROR = '1MB';

function parseSize(size: string): number {
    const match = size.match(/^([\d.]+)\s*(kB|MB|GB)$/i);
    if (!match) {
        return Infinity;
    }
    const value = parseFloat(match[1]);
    switch (match[2].toLowerCase()) {
        case 'kb':
            return value * 1000;
        case 'mb':
            return value * 1000 * 1000;
        case 'gb':
            return value * 1000 * 1000 * 1000;
        default:
            return Infinity;
    }
}

function updateBudgets(options: Schema): Rule {
    return async (tree: Tree, context: SchematicContext): Promise<void> => {
        try {
            const buildTarget = await getProjectBuildTarget(tree, options.project);
            const configurations = buildTarget.configurations ?? {};
            const prodConfig = configurations['production'] ?? {};
            const budgets: BudgetEntry[] = (prodConfig.budgets as unknown as BudgetEntry[]) ?? [];

            const initialBudget = budgets.find((b: BudgetEntry) => b.type === 'initial');

            if (initialBudget) {
                const warningSize = parseSize(initialBudget.maximumWarning ?? '0');
                const errorSize = parseSize(initialBudget.maximumError ?? '0');
                const defaultWarning = parseSize(CLI_DEFAULT_WARNING);
                const defaultError = parseSize(CLI_DEFAULT_ERROR);

                if (warningSize <= defaultWarning && errorSize <= defaultError) {
                    initialBudget.maximumWarning = '1.5MB';
                    initialBudget.maximumError = '2MB';
                    context.logger.info(
                        `✅️ Updated initial bundle budget to 1.5MB warning / 2MB error (was ${CLI_DEFAULT_WARNING} / ${CLI_DEFAULT_ERROR}).`
                    );
                } else {
                    context.logger.info(`✅️ Custom bundle budgets detected. Skipping budget update.`);
                }
            } else {
                budgets.push({
                    type: 'initial',
                    maximumWarning: '1.5MB',
                    maximumError: '2MB'
                });
                context.logger.info(`✅️ Added initial bundle budget: 1.5MB warning / 2MB error.`);
            }

            prodConfig.budgets = budgets as unknown as typeof prodConfig.budgets;
            configurations['production'] = prodConfig;
            buildTarget.configurations = configurations;

            const workspace = await getWorkspaceDefinition(tree);
            await updateWorkspaceDefinition(tree, workspace);
        } catch (error) {
            context.logger.warn(
                `⚠️ Could not update bundle budgets (non-fatal): ${(error as Error).message}. ` +
                    `Styles and assets were still configured. Update angular.json budgets manually if needed.`
            );
        }
    };
}
