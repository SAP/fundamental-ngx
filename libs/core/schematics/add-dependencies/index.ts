import { Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';
import { NodeDependencyType, getPackageJsonDependency } from '@schematics/angular/utility/dependencies';
import { compare } from 'compare-versions';
import { SemVer, coerce, major, valid } from 'semver';
import { Schema } from '../models/schema';
import { addPackageDependency } from '../utils/package-utils';

const libraryPackageJson = require('@fundamental-ngx/core/package.json');

const desiredVersions = {
    'fundamental-styles':
        process.env.FD_ENV_FDSTYLES_VER_PLACEHOLDER || libraryPackageJson.peerDependencies['fundamental-styles'],
    '@sap-theming/theming-base-content':
        process.env.FD_ENV_THEMING_VER_PLACEHOLDER ||
        libraryPackageJson.peerDependencies['@sap-theming/theming-base-content'],
    '@fundamental-ngx/i18n':
        process.env.FD_ENV_VERSION_PLACEHOLDER || libraryPackageJson.peerDependencies['@fundamental-ngx/i18n'],
    '@fundamental-ngx/cdk':
        process.env.FD_ENV_VERSION_PLACEHOLDER || libraryPackageJson.peerDependencies['@fundamental-ngx/cdk']
};

/**
 * Adds dependencies to the project
 * @param options
 */
export function addDependencies(options: Schema): Rule {
    return addExternalLibraries(options);
}

function addExternalLibraries(options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        const ngCoreVersionTag = getPackageJsonDependency(tree, '@angular/core');
        if (!ngCoreVersionTag) {
            throw new SchematicsException('Could not find @angular/core in package.json');
        }
        const angularVersion = valid(coerce(ngCoreVersionTag.version) as SemVer)
            ? `^${major(coerce(ngCoreVersionTag.version) as SemVer)}.0.0`
            : null;
        if (!angularVersion) {
            throw new SchematicsException(
                `Could not determine Angular version, ${ngCoreVersionTag} is not valid semver`
            );
        }
        const formsDependency = getPackageJsonDependency(tree, '@angular/forms');
        if (!formsDependency) {
            addPackageDependency(
                tree,
                {
                    type: NodeDependencyType.Default,
                    version: angularVersion,
                    name: '@angular/forms'
                },
                context
            );
        }

        const animationsDependency = getPackageJsonDependency(tree, '@angular/animations');
        if (options.animations && !animationsDependency) {
            addPackageDependency(
                tree,
                {
                    type: NodeDependencyType.Default,
                    version: angularVersion,
                    name: '@angular/animations'
                },
                context
            );
        }

        const cdKDependency = getPackageJsonDependency(tree, '@angular/cdk');
        if (!cdKDependency) {
            addPackageDependency(
                tree,
                {
                    type: NodeDependencyType.Default,
                    version: angularVersion,
                    name: '@angular/cdk'
                },
                context
            );
        }

        const fundamentalStylesDependency = getPackageJsonDependency(tree, 'fundamental-styles');
        if (
            !fundamentalStylesDependency ||
            compare(fundamentalStylesDependency.version, desiredVersions['fundamental-styles'], '<')
        ) {
            addPackageDependency(
                tree,
                {
                    type: NodeDependencyType.Default,
                    // Will be replaced with the real version during sync-version script run
                    version: desiredVersions['fundamental-styles'],
                    name: 'fundamental-styles',
                    overwrite: true
                },
                context
            );
        }

        const themingBaseContentDependency = getPackageJsonDependency(tree, '@sap-theming/theming-base-content');
        if (
            !themingBaseContentDependency ||
            compare(themingBaseContentDependency.version, desiredVersions['@sap-theming/theming-base-content'], '<')
        ) {
            addPackageDependency(
                tree,
                {
                    type: NodeDependencyType.Default,
                    // Will be replaced with the real version during sync-version script run
                    version: desiredVersions['@sap-theming/theming-base-content'],
                    name: '@sap-theming/theming-base-content',
                    overwrite: true
                },
                context
            );
        }

        const i18nDependency = getPackageJsonDependency(tree, '@fundamental-ngx/i18n');
        if (!i18nDependency || compare(i18nDependency.version, desiredVersions['@fundamental-ngx/i18n'], '<')) {
            addPackageDependency(
                tree,
                {
                    type: NodeDependencyType.Default,
                    // Will be replaced with the real version during sync-version script run
                    version: desiredVersions['@fundamental-ngx/i18n'],
                    name: '@fundamental-ngx/i18n',
                    overwrite: true
                },
                context
            );
        }

        const fdCdkDependency = getPackageJsonDependency(tree, '@fundamental-ngx/cdk');
        if (!fdCdkDependency || compare(fdCdkDependency.version, desiredVersions['@fundamental-ngx/cdk'], '<')) {
            addPackageDependency(
                tree,
                {
                    type: NodeDependencyType.Default,
                    // Will be replaced with the real version during sync-version script run
                    version: desiredVersions['@fundamental-ngx/cdk'],
                    name: '@fundamental-ngx/cdk',
                    overwrite: true
                },
                context
            );
        }

        return tree;
    };
}
