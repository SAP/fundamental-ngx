import { chain, noop, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { addPackageJsonDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { getPackageVersionFromPackageJson, hasDevPackage, hasPackage } from '../utils/package-utils';

import { processTranslations } from '../utils/translation-utils';
import { Schema } from './schema';

/**
 * ng add schematic that
 * - adds platform lib to package.json
 * - adds @fundamental-ngx/core & @angular/localize to package.json if not present there already
 * - installs dependent libraries and runs their external schematics
 * - adds lib translations and angular.json locale configurations to host app if no translations available
 * - updates lib translations to host app's translations if available by appending at the end of host app's files
 * - replaces lib source paths with node_modules source paths for lib-related trans units
 * @param options options passed for this schematic
 */
export function ngAdd(options: Schema): Rule {
    return (tree: Tree) => {
        const coreInstalled = hasPackage(tree, '@fundamental-ngx/core');
        const localizeInstalled = hasDevPackage(tree, '@angular/localize') || hasPackage(tree, '@angular/localize');
        const XML2JSinstalled = hasDevPackage(tree, 'xml2js') || hasPackage(tree, 'xml2js');

        return chain([
            coreInstalled ? noop() : callCoreSchematic(options),
            localizeInstalled ? noop() : callLocalizeSchematic(options),
            options.translations ? processTranslations(options, XML2JSinstalled) : noop(),
            endInstallTask()
        ]);
    };
}

/**
 * installs `@fundamental-ngx/core` lib and makes call to core's schematic
 * @param options options passed for this schematic
 */
function callCoreSchematic(options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        context.logger.info('✅️ Added Fundamental NGX Core schematic to tasks');

        addPackageJsonDependency(tree, {
            type: NodeDependencyType.Default,
            // Will be replaced with the real version during sync-version scipt run
            version: `VERSION_PLACEHOLDER`,
            name: '@fundamental-ngx/core'
        });

        const installTaskId = context.addTask(
            new NodePackageInstallTask({
                packageName: '@fundamental-ngx/core'
            })
        );

        // Chain won't work here since we need the externals to be actually installed before we call their schemas
        // This ensures the externals are a dependency of the node install, so they exist when their schemas run.
        context.addTask(new RunSchematicTask('@fundamental-ngx/core', 'ng-add', options), [installTaskId]);

        return tree;
    };
}

/**
 * installs `@angular/localize` lib and makes call to the localize schematic
 * @param options options passed for this schematic
 */
export function callLocalizeSchematic(options: Schema): any {
    return (tree: Tree, context: SchematicContext) => {
        context.logger.info('✅️ Added Angular Localize schematic to tasks');

        addPackageJsonDependency(tree, {
            type: NodeDependencyType.Dev,
            version: `${getPackageVersionFromPackageJson(tree, '@angular/core')}`,
            name: '@angular/localize'
        });

        const installTaskId = context.addTask(
            new NodePackageInstallTask({
                packageName: '@angular/localize'
            })
        );

        // Chain won't work here since we need the externals to be actually installed before we call their schemas
        // This ensures the externals are a dependency of the node install, so they exist when their schemas run.
        context.addTask(new RunSchematicTask('@angular/localize', 'ng-add', options), [installTaskId]);

        return tree;
    };
}

/**
 *  Run npm install.
 */
function endInstallTask(): Rule {
    return (tree: Tree, context: SchematicContext) => {
        context.addTask(new NodePackageInstallTask());

        return tree;
    };
}
