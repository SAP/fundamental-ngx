import { Rule, SchematicContext, Tree, chain } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

/**
 * ng add schematic that
 * - install moment-adapter package
 * @param _options options passed for this schematic
 */
export function ngAdd(_options: any): Rule {
    return (_tree: Tree, _context: SchematicContext) => chain([endInstallTask()]);
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
