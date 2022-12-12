import { chain, Rule, schematic, SchematicContext, Tree } from '@angular-devkit/schematics';
import { RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { Schema } from '../models/schema';

export function ngAdd(options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        // First, queue dependency installation task.
        const dependenciesTaskId = context.addTask(new RunSchematicTask('add-dependencies', options));

        // Wait for dependencies to be installed and proceed with main schematics.
        context.addTask(new RunSchematicTask('proceed-with-schematics', options), [dependenciesTaskId]);

        return tree;
    };
}

export function proceedWithSchematics(options: Schema): Rule {
    return chain([
        schematic('add-animations', options),
        schematic('add-styles', options),
        schematic('add-theming', options)
    ]);
}
