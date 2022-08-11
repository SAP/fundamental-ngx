import { detectPackageManager, ExecutorContext, getPackageManagerCommand, ProjectConfiguration } from '@nrwl/devkit';
import { exec } from 'child_process';

export default async function pack(options: any, context: ExecutorContext) {
    const projectConfig: ProjectConfiguration = context.workspace.projects[context.projectName as string];
    const [distFolder] = projectConfig.targets?.build.outputs as string[];
    if (!distFolder) {
        throw new Error(`No dist folder found for project ${context.projectName}`);
    }
    const packageManager = detectPackageManager('./');
    return new Promise((resolve, reject) => {
        exec(getPackageManagerCommand(packageManager).run('pack', ''), { cwd: distFolder }, (err, stdout, stderr) => {
            if (stdout) {
                console.log(stdout);
            }
            if (stderr) {
                console.error(stderr);
            }
            if (!err) {
                console.log(`Packed ${distFolder}`);
                resolve({ success: true });
            } else {
                reject(err);
            }
        });
    });
}
