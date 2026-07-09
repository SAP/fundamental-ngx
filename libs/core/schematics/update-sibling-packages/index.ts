import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { getPackageJsonDependency } from '@schematics/angular/utility/dependencies';
import { compare } from 'compare-versions';
import { coerce, SemVer, valid } from 'semver';
import { addPackageDependency } from '../utils/package-utils';

const libraryPackageJson = require('@fundamental-ngx/core/package.json');

const siblingPackages = [
    '@fundamental-ngx/platform',
    '@fundamental-ngx/btp',
    '@fundamental-ngx/cx',
    '@fundamental-ngx/datetime-adapter',
    '@fundamental-ngx/moment-adapter',
    '@fundamental-ngx/ui5-webcomponents',
    '@fundamental-ngx/ui5-webcomponents-base',
    '@fundamental-ngx/ui5-webcomponents-fiori',
    '@fundamental-ngx/ui5-webcomponents-ai'
];

const siblingVersion = process.env.FD_ENV_VERSION_PLACEHOLDER || libraryPackageJson.version;

export function updateSiblingPackages(): Rule {
    return (tree: Tree, context: SchematicContext) => {
        const coreVersion = valid(coerce(siblingVersion) as SemVer);
        if (!coreVersion) {
            context.logger.warn(`⚠️ Could not determine @fundamental-ngx/core version; skipping sibling updates.`);
            return tree;
        }

        let installNeeded = false;

        for (const name of siblingPackages) {
            const existing = getPackageJsonDependency(tree, name);
            if (!existing) {
                continue;
            }

            const existingCoerced = valid(coerce(existing.version) as SemVer);
            if (existingCoerced && compare(existingCoerced, coreVersion, '<')) {
                addPackageDependency(
                    tree,
                    {
                        type: existing.type,
                        version: siblingVersion,
                        name,
                        overwrite: true
                    },
                    context
                );
                installNeeded = true;
            }
        }

        if (installNeeded) {
            context.addTask(new NodePackageInstallTask());
        }

        return tree;
    };
}
