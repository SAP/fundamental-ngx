import { chain, Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';
import { coerce, major, SemVer, valid } from 'semver';
import { Schema } from '../models/schema';
import {
    checkPackageVersion,
    getPackageVersionFromPackageJson,
    hasPackage,
    installDependencies
} from '../utils/package-utils';

const desiredVersions = {
    'fundamental-styles': process.env.FD_ENV_FDSTYLES_VER_PLACEHOLDER || 'FDSTYLES_VER_PLACEHOLDER',
    '@sap-theming/theming-base-content': process.env.FD_ENV_THEMING_VER_PLACEHOLDER || 'THEMING_VER_PLACEHOLDER',
    '@fundamental-ngx/i18n': process.env.FD_ENV_VERSION_PLACEHOLDER || 'VERSION_PLACEHOLDER',
    '@fundamental-ngx/cdk': process.env.FD_ENV_VERSION_PLACEHOLDER || 'VERSION_PLACEHOLDER'
};

/**
 * Adds dependencies to the project
 * @param options
 */
export function addDependencies(options: Schema): Rule {
    return chain([addExternalLibraries(options), installDependencies()]);
}

function addExternalLibraries(options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        const ngCoreVersionTag = getPackageVersionFromPackageJson(tree, '@angular/core');
        if (!ngCoreVersionTag) {
            throw new SchematicsException('Could not find @angular/core in package.json');
        }
        const angularVersion = valid(coerce(ngCoreVersionTag) as SemVer)
            ? `^${major(coerce(ngCoreVersionTag) as SemVer)}.0.0`
            : null;
        if (!angularVersion) {
            throw new SchematicsException(
                `Could not determine Angular version, ${ngCoreVersionTag} is not valid semver`
            );
        }
        const dependencies: NodeDependency[] = [];

        if (!hasPackage(tree, '@angular/forms')) {
            dependencies.push({
                type: NodeDependencyType.Default,
                version: angularVersion,
                name: '@angular/forms'
            });
        }

        if (options.animations && !hasPackage(tree, '@angular/animations')) {
            dependencies.push({
                type: NodeDependencyType.Default,
                version: angularVersion,
                name: '@angular/animations'
            });
        }

        if (!hasPackage(tree, '@angular/cdk')) {
            dependencies.push({
                type: NodeDependencyType.Default,
                version: angularVersion,
                name: '@angular/cdk'
            });
        }

        if (
            !hasPackage(tree, 'fundamental-styles') ||
            checkPackageVersion(tree, 'fundamental-styles', desiredVersions['fundamental-styles'], '<')
        ) {
            dependencies.push({
                type: NodeDependencyType.Default,
                // Will be replaced with the real version during sync-version script run
                version: desiredVersions['fundamental-styles'],
                name: 'fundamental-styles',
                overwrite: true
            });
        }

        if (
            !hasPackage(tree, '@sap-theming/theming-base-content') ||
            checkPackageVersion(
                tree,
                '@sap-theming/theming-base-content',
                desiredVersions['@sap-theming/theming-base-content'],
                '<'
            )
        ) {
            dependencies.push({
                type: NodeDependencyType.Default,
                // Will be replaced with the real version during sync-version script run
                version: desiredVersions['@sap-theming/theming-base-content'],
                name: '@sap-theming/theming-base-content',
                overwrite: true
            });
        }

        if (
            !hasPackage(tree, '@fundamental-ngx/i18n') ||
            checkPackageVersion(tree, '@fundamental-ngx/i18n', desiredVersions['@fundamental-ngx/i18n'], '<')
        ) {
            dependencies.push({
                type: NodeDependencyType.Default,
                // Will be replaced with the real version during sync-version script run
                version: desiredVersions['@fundamental-ngx/i18n'],
                name: '@fundamental-ngx/i18n',
                overwrite: true
            });
        }

        if (
            !hasPackage(tree, '@fundamental-ngx/cdk') ||
            checkPackageVersion(tree, '@fundamental-ngx/cdk', desiredVersions['@fundamental-ngx/cdk'], '<')
        ) {
            dependencies.push({
                type: NodeDependencyType.Default,
                // Will be replaced with the real version during sync-version script run
                version: desiredVersions['@fundamental-ngx/cdk'],
                name: '@fundamental-ngx/cdk',
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
