import { Tree, Rule } from '@angular-devkit/schematics';
import { updateJsonInTree } from '@nrwl/workspace/src/utils/ast-utils';
import { offsetFromRoot, readWorkspace } from '@nrwl/workspace';

/**
 * Adds overrides to lib's eslintrc file.
 */
export function addEslintJsonOverrides(tree: Tree, projectName: string): Rule {
    const workspaceJson = readWorkspace(tree);
    const project = workspaceJson.projects[projectName];
    const eslintPath = `${project.root}/.eslintrc.json`;
    if (!tree.exists(eslintPath)) {
        throw new Error(`Could not find ".eslintrc.json" at "${project.root}"`);
    }
    return updateJsonInTree(eslintPath, (eslintJson) => {
        const overridePath = `${offsetFromRoot(project.root)}.eslintrc-overrides.json`;
        const overrides = eslintJson.overrides ?? [];
        const tsRuleIndex = overrides.findIndex((rule) => rule.files?.length === 1 && rule.files[0] === '*.ts');
        if (tsRuleIndex !== -1) {
            if (Array.isArray(overrides[tsRuleIndex].extends)) {
                if (!overrides[tsRuleIndex].extends.includes(overridePath)) {
                    overrides[tsRuleIndex].extends.push(overridePath);
                }
            } else {
                overrides[tsRuleIndex].extends = [overridePath];
            }
        } else {
            overrides.push({ files: ['*.ts'], extends: [overridePath] });
        }

        return eslintJson;
    });
}
