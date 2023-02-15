import { ExecutorContext, logger, parseTargetString, readTargetOptions } from '@nrwl/devkit';
import { ChildProcess, exec } from 'child_process';
import { TestAppOptions, WithDevServer } from './options.type';
const waitOn = require('wait-on');

const parallel = Math.ceil(require('os').cpus().length * 0.75);

export async function startDevServer(
    opts: TestAppOptions,
    context: ExecutorContext
): Promise<{ baseUrl: string; process?: ChildProcess }> {
    const tenSecondsInMs = 10 * 1000;
    const minuteInMs = 6 * tenSecondsInMs;

    if (!isWithDevServer(opts)) {
        return await waitFor(opts.baseUrl, tenSecondsInMs);
    }

    const { project, target, configuration } = parseTargetString(opts.devServerTarget);
    const devServerTargetOpts = readTargetOptions({ project, target, configuration }, context);
    const { port, ssl, host } = devServerTargetOpts;
    const protocol = ssl ? 'https' : 'http';
    const baseUrl = `${protocol}://${host}:${port}`;
    const configurationFlag = configuration ? `--configuration ${configuration}` : '';
    const targetCommand = `npx nx run-many --target=${target} --projects=${project} ${configurationFlag} --parallel=${parallel}`;
    logger.info(`Starting dev server with command: ${targetCommand}`);
    const process = exec(targetCommand);
    process.stdout?.on('data', (data: string) => logger.info(data));
    const timeout = minuteInMs * 10;
    return await waitFor(baseUrl, timeout);
}

function waitFor(baseUrl: string, timeout: number): Promise<{ baseUrl: string }> {
    logger.info(`Waiting for ${baseUrl} to be available. Timeout: ${timeout / 1000}s`);
    return waitOn({ resources: [baseUrl], timeout }).then(() => ({ baseUrl }));
}

function isWithDevServer(opts: any): opts is WithDevServer {
    return !!opts.devServerTarget;
}
