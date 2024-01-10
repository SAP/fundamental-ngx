import { Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addPackageJsonDependency, getPackageJsonDependency } from '@schematics/angular/utility/dependencies';

/**
 * Adds the @fundamental-ngx/btp package to the package.json
 */
export function addBtpPackage(): Rule {
    return (tree: Tree, ctx: SchematicContext) => {
        const btpVersion = getPackageJsonDependency(tree, '@fundamental-ngx/btp');
        if (btpVersion) {
            return tree;
        }
        const coreVersion = getPackageJsonDependency(tree, '@fundamental-ngx/core');
        if (!coreVersion) {
            throw new SchematicsException('Could not find @fundamental-ngx/core in package.json');
        }
        addPackageJsonDependency(tree, { ...coreVersion, name: '@fundamental-ngx/btp' });
        ctx.addTask(new NodePackageInstallTask());
    };
}
