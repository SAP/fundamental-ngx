import { chain, Rule, schematic } from '@angular-devkit/schematics';
import { addDependencies } from '../add-dependencies';
import { Schema } from '../models/schema';

/**
 * Adds dependencies and runs other schematics
 * @param options
 */
export function ngAdd(options: Schema): Rule {
    return (): Rule => chain([addDependencies(options), proceedWithSchematics(options)]);
}

/** Proceed with schematics */
export function proceedWithSchematics(options: Schema): Rule {
    return chain([
        schematic('add-animations', options),
        schematic('add-styles', options),
        schematic('add-theming', options)
    ]);
}
