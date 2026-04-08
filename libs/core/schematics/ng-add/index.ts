import { chain, Rule, schematic } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { addDependencies } from '../add-dependencies';
import { Schema } from '../models/schema';

/**
 * Adds dependencies and runs other schematics
 * @param options
 */
export function ngAdd(options: Schema): Rule {
    return (): Rule =>
        chain([
            addDependencies(options),
            (t, ctx) => {
                const installTaskId = ctx.addTask(new NodePackageInstallTask());
                ctx.addTask(new RunSchematicTask('proceed-with-schematics', options), [installTaskId]);
                return t;
            }
        ]);
}

/** Proceed with schematics */
export function proceedWithSchematics(options: Schema): Rule {
    return chain([schematic('add-styles', options), schematic('add-theming', options)]);
}
