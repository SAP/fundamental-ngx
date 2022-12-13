import { Rule, Tree, SchematicContext, chain } from '@angular-devkit/schematics';
import { NodeDependency, NodeDependencyType, addPackageJsonDependency } from '@schematics/angular/utility/dependencies';
import { Schema } from '../models/schema';
import {
    getPackageVersionFromPackageJson,
    hasPackage,
    checkPackageVersion,
    installDependencies
} from '../utils/package-utils';

export function addDependencies(options: Schema): Rule {
    return chain([addExternalLibraries(options), installDependencies()]);
}

function addExternalLibraries(options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        const ngCoreVersionTag = getPackageVersionFromPackageJson(tree, '@angular/core');
        const dependencies: NodeDependency[] = [];

        if (!hasPackage(tree, '@angular/forms')) {
            dependencies.push({
                type: NodeDependencyType.Default,
                version: `${ngCoreVersionTag}`,
                name: '@angular/forms'
            });
        }

        if (options.animations && !hasPackage(tree, '@angular/animations')) {
            dependencies.push({
                type: NodeDependencyType.Default,
                version: `${ngCoreVersionTag}`,
                name: '@angular/animations'
            });
        }

        if (!hasPackage(tree, '@angular/cdk')) {
            dependencies.push({
                type: NodeDependencyType.Default,
                version: `${ngCoreVersionTag}`,
                name: '@angular/cdk'
            });
        }

        if (
            !hasPackage(tree, 'fundamental-styles') ||
            checkPackageVersion(tree, 'fundamental-styles', 'FDSTYLES_VER_PLACEHOLDER', '<')
        ) {
            dependencies.push({
                type: NodeDependencyType.Default,
                // Will be replaced with the real version during sync-version script run
                version: `FDSTYLES_VER_PLACEHOLDER`,
                name: 'fundamental-styles',
                overwrite: true
            });
        }

        if (
            !hasPackage(tree, '@sap-theming/theming-base-content') ||
            checkPackageVersion(tree, '@sap-theming/theming-base-content', 'THEMING_VER_PLACEHOLDER', '<')
        ) {
            dependencies.push({
                type: NodeDependencyType.Default,
                // Will be replaced with the real version during sync-version script run
                version: `THEMING_VER_PLACEHOLDER`,
                name: '@sap-theming/theming-base-content',
                overwrite: true
            });
        }

        dependencies.forEach((dependency) => {
            addPackageJsonDependency(tree, dependency);

            context.logger.info(`✅️ Added ${dependency.name} to ${dependency.type}.`);
        });

        return tree;
    };
}
