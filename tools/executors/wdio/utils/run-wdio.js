'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.runWdio = void 0;
const devkit_1 = require('@nrwl/devkit');
const child_process_1 = require('child_process');
const fs_1 = require('fs');
async function runWdio(baseUrl, e2eFiles, context) {
    const wdioConfig = `wdio_${context.projectName}.conf.js`;
    (0, fs_1.writeFileSync)(
        wdioConfig,
        `
module.exports.config = require('./e2e/wdio.base-config.js')({
    runner: 'local',
    projectName: '${context.projectName}',
    specs: ${JSON.stringify(e2eFiles, null, 4)},
});
`
    );
    const flags = ` ${baseUrl ? `--baseUrl ${baseUrl}` : ''}`;
    const command = `npx cross-env TS_NODE_PROJECT=./e2e/tsconfig.json npx wdio ${wdioConfig} ${flags}`;
    devkit_1.logger.info(`Running command ${command}`);
    try {
        const wdioProcess = (0, child_process_1.execSync)(command, { encoding: 'utf-8' });
        devkit_1.logger.log(wdioProcess);
        (0, fs_1.unlinkSync)(wdioConfig);
        return true;
    } catch (e) {
        devkit_1.logger.error(e.stdout);
        return false;
    }
}
exports.runWdio = runWdio;
//# sourceMappingURL=run-wdio.js.map
