import { ExecutorContext, runExecutor } from '@nrwl/devkit';

export default async function packAll(_: any, context: ExecutorContext) {
    const executors = Object.keys(context.workspace.projects)
        .filter((projectName) => {
            const projectConfig = context.workspace.projects[projectName];
            return !!projectConfig.targets?.pack;
        })
        .map((projectName) => {
            return runExecutor({ project: projectName, target: 'pack' }, {}, { ...context, projectName });
        });
    for (const executor of executors) {
        for await (const resp of await executor) {
            if (!resp.success) {
                throw new Error(`Failed to pack`);
            }
        }
    }
    return { success: true };
}
