import { Rule, Tree, SchematicContext, chain } from '@angular-devkit/schematics';
import { findModuleFromOptions, addModuleImportToModule } from '@angular/cdk/schematics';
import { Schema } from '../models/schema';
import { hasModuleImport } from '../utils/ng-module-utils';

export function addAnimations(options: Schema): Rule {
    return chain([addAnimationsModule(options)]);
}

function addAnimationsModule(options: Schema): any {
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
