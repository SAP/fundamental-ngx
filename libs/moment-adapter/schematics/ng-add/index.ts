import { Rule, SchematicContext, Tree, chain } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

/**
 * ng add schematic that
 * - install moment-adapter package
 * @param options options passed for this schematic
 */
export function ngAdd(): Rule {
    return () => chain([endInstallTask()]);
}

/**
 *  Runs npm install. Called as the last rule.
 */
function endInstallTask(): Rule {
    return (tree: Tree, context: SchematicContext) => {
        context.addTask(new NodePackageInstallTask());

        return tree;
    };
}
