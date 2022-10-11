import { ExecutorContext, logger } from '@nrwl/devkit';
import { spawn } from 'child_process';
import { unlinkSync, writeFileSync } from 'fs';

export async function runWdio(baseUrl: string, e2eFiles: string[], context: ExecutorContext): Promise<boolean> {
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
    return new Promise((resolve, reject) => {
        const testProcess = spawn(command, [], { shell: true });
        testProcess.stdout.on('data', (data) => {
            logger.log(data.toString());
        });
        testProcess.stderr.on('data', (data) => {
            logger.error(data.toString());
        });
        testProcess.on('exit', (code) => {
            unlinkSync(wdioConfig);
            if (code === 0) {
                resolve(true);
            } else {
                reject(new Error(`Test failed with code ${code}`));
            }
        });
    });
}
