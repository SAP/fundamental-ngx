import { JsonValue } from '@angular-devkit/core';
import { SchematicsException } from '@angular-devkit/schematics';
import { ProjectDefinition } from '@angular-devkit/core/src/workspace';

export function getProjectTargetOptions(
    project: ProjectDefinition,
    buildTarget: string
): Record<string, JsonValue | undefined> {
    const options = project.targets?.get(buildTarget)?.options;

    if (!options) {
        throw new SchematicsException(`Cannot determine project target configuration for: ${buildTarget}.`);
    }

    return options;
}
