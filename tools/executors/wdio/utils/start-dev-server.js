'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.startDevServer = void 0;
const devkit_1 = require('@nrwl/devkit');
const child_process_1 = require('child_process');
const waitOn = require('wait-on');
const parallel = Math.ceil(require('os').cpus().length * 0.75);
async function startDevServer(opts, context) {
    var _a;
    const tenSecondsInMs = 10 * 1000;
    const minuteInMs = 6 * tenSecondsInMs;
    if (!isWithDevServer(opts)) {
        return await waitFor(opts.baseUrl, tenSecondsInMs);
    }
    const { project, target, configuration } = (0, devkit_1.parseTargetString)(opts.devServerTarget);
    const devServerTargetOpts = (0, devkit_1.readTargetOptions)({ project, target, configuration }, context);
    const { port, ssl, host } = devServerTargetOpts;
    const protocol = ssl ? 'https' : 'http';
    const baseUrl = `${protocol}://${host}:${port}`;
    const configurationFlag = configuration ? `--configuration ${configuration}` : '';
    const targetCommand = `npx nx run-many --target=${target} --projects=${project} ${configurationFlag} --parallel=${parallel}`;
    devkit_1.logger.info(`Starting dev server with command: ${targetCommand}`);
    const process = (0, child_process_1.exec)(targetCommand);
    (_a = process.stdout) === null || _a === void 0 ? void 0 : _a.on('data', (data) => devkit_1.logger.info(data));
    const timeout = minuteInMs * 10;
    return await waitFor(baseUrl, timeout);
}
exports.startDevServer = startDevServer;
function waitFor(baseUrl, timeout) {
    devkit_1.logger.info(`Waiting for ${baseUrl} to be available. Timeout: ${timeout / 1000}s`);
    return waitOn({ resources: [baseUrl], timeout }).then(() => ({ baseUrl }));
}
function isWithDevServer(opts) {
    return !!opts.devServerTarget;
}
//# sourceMappingURL=start-dev-server.js.map
