import { Rule, SchematicContext, Tree, chain, externalSchematic, noop } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { hasPackage } from '../utils/package-utils';
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';

/**
 * ng add schematic that
 * - adds `ng add @fundamental-ngx/core` external schematic to task list
 * @param _options options passed for this schematic
 */
export function ngAdd(_options: any): Rule {
    return (_tree: Tree, _context: SchematicContext) => {
        return chain([
            addCoreLib(_options),
            _options.installations ? callCoreSchematic(_options) : noop(),
            endInstallTask()
        ]);
    };
}

/**
 * installs `@fundamental-ngx/core` lib and makes call to core's schematic
 * @param options options passed for this schematic
 */
export function callCoreSchematic(options: any): Rule {
    return (_tree: Tree, context: SchematicContext) => {
        context.logger.info('Adding Fundamental NGX Core schematic to tasks');
        const installTaskId = context.addTask(
            new NodePackageInstallTask({
                packageName: '@fundamental-ngx/core'
            })
        );

        // Chain won't work here since we need the externals to be actually installed before we call their schemas
        // This ensures the externals are a dependency of the node install, so they exist when their schemas run.
        context.addTask(new RunSchematicTask('addCoreSchematic', options), [installTaskId]);
        return _tree;
    };
}

/**
 * runs the core library's ng-add schematic
 * @param options options passed for this schematic
 */
export function addCoreSchematic(options: any): Rule {
    return (_tree: Tree, _context: SchematicContext) => {
        _context.logger.info('Running core schematics...\n');
        return chain([externalSchematic('@fundamental-ngx/core', 'ng-add', options)]);
    };
}

/**
 * adds the latest versions of core and platform libraries to package.json
 * @param _options options passed for this schematic
 */
function addCoreLib(_options: any): Rule {
    return (tree: Tree, context: SchematicContext) => {
        context.logger.info('***** Adding Core dependencies to your application *****');
        const dependencies: NodeDependency[] = [];

        if (!hasPackage(tree, '@fundamental-ngx/core')) {
            dependencies.push({
                type: NodeDependencyType.Default,
                version: `latest`,
                name: '@fundamental-ngx/core'
            });
        }

        dependencies.forEach((dependency) => {
            addPackageJsonDependency(tree, dependency);
            console.log(`✅️ Added ${dependency.name} to ${dependency.type} to your application`);
        });

        return tree;
    };
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
