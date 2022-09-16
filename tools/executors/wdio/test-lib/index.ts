import { ExecutorContext, readTargetOptions } from '@nrwl/devkit';
import { WdioExecutorOptions } from './schema.type';
import { startDevServer } from '../utils/start-dev-server';
import { runWdio } from '../utils/run-wdio';

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
    const { baseUrl } = await startDevServer(_options as any, context);
    await runWdio(baseUrl, combinedOptions.e2eFiles, context);
    return { success: true };
}
