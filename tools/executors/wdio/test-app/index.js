'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const devkit_1 = require('@nrwl/devkit');
const start_dev_server_1 = require('../utils/start-dev-server');
const run_wdio_1 = require('../utils/run-wdio');
const spec_files_1 = require('../utils/spec-files');
async function default_1(options, context) {
    const combinedOptions = {
        ...(0, devkit_1.readTargetOptions)(
            {
                project: context.projectName,
                target: context.targetName,
                configuration: context.configurationName
            },
            context
        ),
        ...options // coming from cli
    };
    const e2eFiles = await (0, spec_files_1.specFiles)(combinedOptions, context);
    let success;
    if (e2eFiles.length === 0) {
        devkit_1.logger.info('No spec files found');
        return { success: true };
    }
    const { baseUrl } = await (0, start_dev_server_1.startDevServer)(combinedOptions, context);
    try {
        success = await (0, run_wdio_1.runWdio)(baseUrl, e2eFiles, context);
        return { success };
    } catch (e) {
        devkit_1.logger.error(e.message);
        success = false;
        return { success };
    }
    // return { success: true };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map
