'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const devkit_1 = require('@nrwl/devkit');
const start_dev_server_1 = require('../utils/start-dev-server');
const run_wdio_1 = require('../utils/run-wdio');
async function default_1(_options, context) {
    const combinedOptions = {
        ..._options,
        ...(0, devkit_1.readTargetOptions)(
            {
                project: context.projectName,
                target: context.targetName,
                configuration: context.configurationName
            },
            context
        )
    };
    const { baseUrl } = await (0, start_dev_server_1.startDevServer)(_options, context);
    await (0, run_wdio_1.runWdio)(baseUrl, combinedOptions.e2eFiles, context);
    return { success: true };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map
