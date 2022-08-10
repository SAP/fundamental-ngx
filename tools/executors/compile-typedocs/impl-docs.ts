import { ExecutorContext, runExecutor } from '@nrwl/devkit';

export default async function compileTypedocs(_options: any, context: ExecutorContext) {
    const projects: Array<string> = Object.keys(context.workspace.projects).filter((projectName) => {
        if (context.workspace.projects[projectName].projectType !== 'library') {
            return false;
        }
        // @ts-ignore
        return !!context.workspace.projects[projectName]?.targets['compile-typedocs'];
    });
    for (const projectName of projects) {
        await runExecutor(
            { project: projectName, target: 'compile-typedocs' },
            {
                outputPath: `apps/docs/src/assets/typedoc/${projectName}`
            },
            {
                projectName,
                ...context
            }
        );
    }
    return { success: true };
}
