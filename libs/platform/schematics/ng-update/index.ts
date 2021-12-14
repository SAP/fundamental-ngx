import { Rule, SchematicContext, Tree, chain, noop } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

import { Schema } from '../ng-add/schema';
import { readTranslationFiles } from '../utils/translation-utils';

/**
 * ng update schematic that will overwrite existing lib translations or add new ones to the host app's translation files
 * Most apps that have an older version of platform lib will not do `ng add` to get the translations, this should ideally be coming from `ng update`.
 * Therefore we mostly do the same things as `ng add` except that we overwrite any existing trans units coming from the lib
 * @param options options passed for this schematic
 */
export function ngUpdate(options: Schema): Rule {
    return chain([options.translations ? readTranslationFiles(options) : noop(), endInstallTask()]);
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
