import { ProjectConfiguration } from '@nrwl/devkit';
import { pathExistsSync, copySync } from 'fs-extra';
import { exec } from 'child_process';

export async function copySchematics(projectConfig: ProjectConfiguration, projectName?: string): Promise<void> {
    if (!projectName) {
        projectName = projectConfig.name;
    }
    const [distFolder] = projectConfig.targets?.build.outputs as string[];
    if (!distFolder) {
        throw new Error(`No dist folder found for project ${projectName}`);
    }
    const options = projectConfig.targets?.prepare.options.schematics as { collection: string; tsConfig: string };
    const rootFolder = projectConfig.root;
    const tsConfigPath = `${rootFolder}/${options.tsConfig}`;
    const schematicsPath = `${rootFolder}/${options.collection}`;
    if (pathExistsSync(schematicsPath) && pathExistsSync(tsConfigPath)) {
        await runTsc(tsConfigPath);
        copySync(schematicsPath, `${distFolder}/schematics`);
        console.log(`Copied schematics for project ${projectName}`);
    } else {
        console.log({ options, tsConfigPath, schematicsPath });
        throw new Error(`No schematics found for project ${projectName}`);
    }
}

const runTsc = async (tsConfigPath: string) => {
    return new Promise((resolve, reject) => {
        const process = exec(`tsc -p ${tsConfigPath}`);
        process.stdout?.on('data', (data) => {
            console.log(data);
        });
        process.stderr?.on('data', (data) => {
            console.error(data);
        });
        process.on('close', (code) => {
            if (code === 0) {
                resolve(0);
            } else {
                reject(new Error(`tsc exited with code ${code}`));
            }
        });
    });
};
