import { ExecutorContext, logger, readTargetOptions } from '@nrwl/devkit';
import { startDevServer } from '../../e2e-utils/start-dev-server';
import { runWdio } from '../../e2e-utils/run-wdio';
import { TestAppOptions } from '../../e2e-utils/options.type';
import { specFiles } from '../../e2e-utils/spec-files';

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
    let success;
    if (e2eFiles.length === 0) {
        logger.info('No spec files found');
        return { success: true };
    }

    const { baseUrl } = await startDevServer(combinedOptions, context);
    try {
        success = await runWdio(baseUrl, e2eFiles, context);
        return { success };
    } catch (e) {
        logger.error(e.message);
        success = false;
        return { success };
    }
    // return { success: true };
}
