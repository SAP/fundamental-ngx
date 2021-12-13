import { chain, externalSchematic, noop, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { getPackageVersionFromPackageJson, hasDevPackage, hasPackage } from '../utils/package-utils';

import { readTranslationFiles } from '../utils/translation-utils';
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
        const localizeInstalled = hasDevPackage(tree, '@angular/localize');

        return chain([
            addDependencies(),
            endInstallTask(),
            coreInstalled ? noop() : callCoreSchematic(options),
            localizeInstalled ? noop() : callLocalizeSchematic(options),
            options.translations ? readTranslationFiles(options) : noop()
        ]);
    };
}

/**
 * installs `@fundamental-ngx/core` lib and makes call to core's schematic
 * @param options options passed for this schematic
 */
function callCoreSchematic(options: Schema): Rule {
    return (_: unknown, context: SchematicContext) => {
        context.logger.info('Running @fundamental-ngx/core schematics...');

        return externalSchematic('@fundamental-ngx/core', 'ng-add', options);
    };
}

/**
 * installs `@angular/localize` lib and makes call to the localize schematic
 * @param options options passed for this schematic
 */
export function callLocalizeSchematic(options: Schema): any {
    return (_: unknown, context: SchematicContext) => {
        context.logger.info('Running @angular/localize schematics...');

        return externalSchematic('@angular/localize', 'ng-add', options);
    };
}

function addDependencies(): Rule {
    return (tree: Tree, context: SchematicContext) => {
        context.logger.info('Adding dependent libraries...');

        const ngCoreVersionTag = getPackageVersionFromPackageJson(tree, '@angular/core');
        const dependencies: NodeDependency[] = [];

        if (!hasPackage(tree, '@fundamental-ngx/core')) {
            dependencies.push({
                type: NodeDependencyType.Default,
                // Will be replaced with the real version during sync-version scipt run
                version: `VERSION_PLACEHOLDER`,
                name: '@fundamental-ngx/core'
            });
        }

        if (!hasDevPackage(tree, '@angular/localize')) {
            dependencies.push({
                type: NodeDependencyType.Dev,
                version: `${ngCoreVersionTag}`,
                name: '@angular/localize'
            });
        }

        dependencies.forEach((dependency) => {
            addPackageJsonDependency(tree, dependency);

            console.log(`✅️ Added ${dependency.name} to ${dependency.type}.`);
        });

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
