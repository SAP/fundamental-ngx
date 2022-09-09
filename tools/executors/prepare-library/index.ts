import { ExecutorContext, ProjectConfiguration, readTargetOptions } from '@nrwl/devkit';
import { copySchematics } from './utils/copy-schematics';
import { copyReadme } from './utils/copy-readme';
import { syncVersions } from './utils/sync-versions';
import { PrepareOptions } from './utils/prepare.options';
import { PrepareSchema } from './utils/prepare.schema';
import pack from './utils/pack';

export default async function prepareLibrary(_options: PrepareSchema, context: ExecutorContext) {
    const projectConfig: ProjectConfiguration = context.workspace.projects[context.projectName as string];
    let targetOptions: PrepareOptions = readTargetOptions(
        { project: context.projectName as string, target: context.targetName as string },
        context
    );
    targetOptions = {
        ...targetOptions,
        ...{
            versionsOverrides: {
                projectVersion: _options?.projectVersion || targetOptions.versionsOverrides?.projectVersion
            }
        }
    };
    if (!targetOptions.distPath) {
        throw new Error(`distPath was not provided for project ${context.projectName}`);
    }
    if (targetOptions?.schematics) {
        await copySchematics(targetOptions, projectConfig, context.projectName as string);
    }
    if (targetOptions?.copyReadme) {
        await copyReadme(targetOptions, projectConfig, context.projectName as string);
    }
    await syncVersions(targetOptions, projectConfig, targetOptions.versionsOverrides, context.projectName as string);
    if (_options.pack) {
        return await pack(targetOptions, context);
    }
    return { success: true };
}
