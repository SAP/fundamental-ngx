import { ExecutorContext, ProjectConfiguration } from '@nrwl/devkit';
import { copySchematics } from './copy-schematics';
import { copyReadme } from './copy-readme';
import { syncVersions } from './sync-versions';

export default async function prepareLibrary(_options: any, context: ExecutorContext) {
    const projectConfig: ProjectConfiguration = context.workspace.projects[context.projectName as string];
    if (projectConfig.targets?.prepare.options.schematics) {
        await copySchematics(projectConfig, context.projectName as string);
    }
    if (projectConfig.targets?.prepare.options.copyReadme) {
        await copyReadme(projectConfig, context.projectName as string);
    }
    await syncVersions(projectConfig, context.projectName as string);
    return { success: true };
}
