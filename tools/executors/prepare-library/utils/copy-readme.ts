import { logger, ProjectConfiguration } from '@nrwl/devkit';
import { copyFileSync } from 'fs';
import { CopyReadmeOptions, PrepareOptions } from './prepare.options';

export async function copyReadme(
    targetOptions: PrepareOptions,
    projectConfig: ProjectConfiguration,
    projectName: string
) {
    if (isCopyReadmeOptions(targetOptions.copyReadme)) {
        logger.info(`=== Copying README.md to ${projectName} ===`);
        const { readmePath, targetPath } = targetOptions.copyReadme;
        copyFileSync(`${projectConfig.root}/${readmePath}`, `${projectConfig.root}/${targetPath}`);
        logger.info(`✅ Copied README.md from ${readmePath} to ${targetPath}`);
    } else {
        logger.error(`Provided copyReadme options for project ${projectName} is invalid`);
    }
}

function isCopyReadmeOptions(options: any): options is CopyReadmeOptions {
    return options && typeof options === 'object' && options.readmePath && options.targetPath;
}
