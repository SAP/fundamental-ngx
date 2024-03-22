import { ExecutorContext, logger, readTargetOptions } from '@nx/devkit';
import { TestAppOptions } from '../../e2e-utils/options.type';
import { runWdio } from '../../e2e-utils/run-wdio';
import { specFiles } from '../../e2e-utils/spec-files';
import { startDevServer } from '../../e2e-utils/start-dev-server';

export default async function (options: TestAppOptions, context: ExecutorContext) {
    const combinedOptions: TestAppOptions = {
        ...readTargetOptions<TestAppOptions>(
            {
                project: context.projectName as string,
                target: context.targetName as string,
                configuration: context.configurationName
            },
            context
        ), // coming from projectJson
        ...options // coming from cli
    };
    const e2eFiles = await specFiles(combinedOptions, context);
    if (e2eFiles.length === 0) {
        logger.info('No spec files found');
        return { success: true };
    }

    const { baseUrl } = await startDevServer(combinedOptions, context);
    try {
        return { success: await runWdio(baseUrl, e2eFiles, context) };
    } catch (e) {
        logger.error(e.message);
        return { success: false };
    }
    // return { success: true };
}
