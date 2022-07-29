import { SchematicContext, Tree } from '@angular-devkit/schematics';
import { addModuleImportToModule, findModuleFromOptions } from '@angular/cdk/schematics';
import { hasModuleImport } from '../utils/ng-module-utils';

const browserAnimationsModuleName = 'BrowserAnimationsModule';
const noopAnimationsModuleName = 'NoopAnimationsModule';

// Configures animations modules
export function addAnimations(options: any): any {
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
