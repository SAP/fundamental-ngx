import { ExecutorContext, logger, readTargetOptions } from '@nrwl/devkit';
import { WdioExecutorOptions } from './schema.type';
import { startDevServer } from '../../e2e-utils/start-dev-server';
import { runWdio } from '../../e2e-utils/run-wdio';
import glob from 'glob';

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
