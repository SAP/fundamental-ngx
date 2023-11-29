import { chain, Rule, schematic } from '@angular-devkit/schematics';
import { addDependencies } from '../add-dependencies';
import { Schema } from '../models/schema';

export function ngAdd(options: Schema): Rule {
    return () => {
        return chain([addDependencies(options), proceedWithSchematics(options)]);
    };
}

export function proceedWithSchematics(options: Schema): Rule {
    return chain([
        schematic('add-animations', options),
        schematic('add-styles', options),
        schematic('add-theming', options)
    ]);
}
