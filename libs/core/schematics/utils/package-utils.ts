import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addPackageJsonDependency, NodeDependency } from '@schematics/angular/utility/dependencies';

/**
 * Add dependencies to the package.json
 */
export function installDependencies(): Rule {
    return (tree: Tree, context: SchematicContext) => {
        context.addTask(new NodePackageInstallTask());
        return tree;
    };
}

/**
 * Add dependencies to the package.json and log the changes
 */
export function addPackageDependency(tree: Tree, dep: NodeDependency, ctx?: SchematicContext): void {
    addPackageJsonDependency(tree, dep);
    if (ctx) {
        ctx.logger.info(`✅️ Added "${dep.name}" into ${dep.type}`);
    }
}
