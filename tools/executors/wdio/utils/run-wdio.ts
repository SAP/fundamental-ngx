import { ExecutorContext, logger } from '@nrwl/devkit';
import { execSync } from 'child_process';
import { unlinkSync, writeFileSync } from 'fs';

export async function runWdio(baseUrl: string, e2eFiles: string[], context: ExecutorContext) {
    const wdioConfig = `wdio_${context.projectName}.conf.js`;
    writeFileSync(
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
    logger.info(`Running command ${command}`);
    try {
        const wdioProcess = execSync(command, { encoding: 'utf-8' });
        logger.log(wdioProcess);
        unlinkSync(wdioConfig);
        return true;
    } catch (e) {
        logger.error(e.stdout);
        return false;
    }
}
