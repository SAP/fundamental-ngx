import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { addModuleImportToModule, findModuleFromOptions, isStandaloneApp } from '@angular/cdk/schematics';
import { addRootProvider } from '@schematics/angular/utility';
import { Schema } from '../models/schema';
import { callsProvidersFunction } from '../utils/calls-providers-function';
import { getMainTsFilePath } from '../utils/main-ts-file-path';
import { hasModuleImport } from '../utils/ng-module-utils';

/**
 * Adds animations to the project.
 * @param options
 */
export function addAnimations(options: Schema): Rule {
    return chain([_addAnimations(options)]);
}

function _addAnimations(options: Schema): Rule {
    return async (tree: Tree, context: SchematicContext) => {
        const mainFilePath = await getMainTsFilePath(tree, options.project);
        const isStandalone = isStandaloneApp(tree, mainFilePath);
        return isStandalone
            ? addAnimationsProviders(options, tree, context)
            : addAnimationsModule(options, tree, context);
    };
}

async function addAnimationsProviders(options: Schema, tree: Tree, context: SchematicContext): Promise<void | Rule> {
    const animationsFunction = 'provideAnimations';
    const noopAnimationsFunction = 'provideNoopAnimations';

    if (options.animations) {
        if (await callsProvidersFunction(tree, options.project, animationsFunction)) {
            context.logger.info(`✅️ ${animationsFunction} already present in bootstrap call. Skipping.`);
            return;
        }

        if (await callsProvidersFunction(tree, options.project, noopAnimationsFunction)) {
            context.logger.warn(
                `⚠️ Could not set up "${animationsFunction} because "${noopAnimationsFunction}" is already imported. Please manually set up browser animations.`
            );
            return;
        }
        return addRootProvider(
            options.project,
            ({ code, external }) => code`${external(animationsFunction, '@angular/platform-browser/animations')}()`
        );
    }
    return;
}

async function addAnimationsModule(options: Schema, tree: Tree, context: SchematicContext): Promise<void> {
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

            return;
        }

        if (hasModuleImport(tree, modulePath, browserAnimationsModuleName)) {
            context.logger.info(
                `✅️ Import of ${browserAnimationsModuleName} already present in app module. Skipping.`
            );

            return;
        }

        addModuleImportToModule(tree, modulePath, browserAnimationsModuleName, '@angular/platform-browser/animations');

        context.logger.info(`✅️ Added ${browserAnimationsModuleName} to app module.`);

        return;
    }

    if (!hasModuleImport(tree, modulePath, browserAnimationsModuleName)) {
        addModuleImportToModule(tree, modulePath, noopAnimationsModuleName, '@angular/platform-browser/animations');

        context.logger.info(`✅️ Added ${noopAnimationsModuleName} to app module.`);
    }
}
