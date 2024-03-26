import { ExecutorContext, logger, readTargetOptions } from '@nx/devkit';
import glob from 'glob';
import { runWdio } from '../../e2e-utils/run-wdio';
import { startDevServer } from '../../e2e-utils/start-dev-server';
import { WdioExecutorOptions } from './schema.type';

export default async function (_options: WdioExecutorOptions, context: ExecutorContext): Promise<{ success: boolean }> {
    const combinedOptions: WdioExecutorOptions = {
        ..._options,
        ...readTargetOptions<WdioExecutorOptions>(
            {
                project: context.projectName as string,
                target: context.targetName as string,
                configuration: context.configurationName
            },
            context
        )
    };

    const foundE2eFiles = combinedOptions.e2eFiles.reduce((acc: string[], next: string): string[] => {
        acc.push(...glob.sync(next));
        return acc;
    }, []);
    if (foundE2eFiles.length === 0) {
        logger.info('No spec files found');
        return { success: true };
    }
    const { baseUrl } = await startDevServer(_options as any, context);
    await runWdio(baseUrl, combinedOptions.e2eFiles, context);
    return { success: true };
}
