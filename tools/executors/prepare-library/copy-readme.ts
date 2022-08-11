import { ProjectConfiguration } from '@nrwl/devkit';
import { copyFileSync } from 'fs';

export async function copyReadme(projectConfig: ProjectConfiguration, projectName: string) {
    const options = projectConfig.targets?.prepare.options.copyReadme as { readmePath: string; targetPath: string };
    copyFileSync(`${projectConfig.root}/${options.readmePath}`, `${projectConfig.root}/${options.targetPath}`);
    console.log(`Copied README.md from ${options.readmePath} to ${options.targetPath}`);
}
