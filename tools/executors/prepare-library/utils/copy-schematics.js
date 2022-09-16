'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.copySchematics = void 0;
const devkit_1 = require('@nrwl/devkit');
const fs_extra_1 = require('fs-extra');
const child_process_1 = require('child_process');
async function copySchematics(targetOptions, projectConfig, projectName) {
    devkit_1.logger.info(`=== Copying schematics of ${projectName} ===`);
    if (!projectName) {
        projectName = projectConfig.name;
    }
    const { distPath } = targetOptions;
    const { tsConfig, collection } = targetOptions.schematics;
    const rootFolder = projectConfig.root;
    const tsConfigPath = `${rootFolder}/${tsConfig}`;
    const schematicsPath = `${rootFolder}/${collection}`;
    if ((0, fs_extra_1.pathExistsSync)(schematicsPath) && (0, fs_extra_1.pathExistsSync)(tsConfigPath)) {
        await runTsc(tsConfigPath);
        (0, fs_extra_1.copySync)(schematicsPath, `${distPath}/schematics`);
        devkit_1.logger.info(`✅ Copied schematics for project ${projectName}`);
    } else {
        throw new Error(`No schematics found for project ${projectName}`);
    }
}
exports.copySchematics = copySchematics;
const runTsc = async (tsConfigPath) => {
    return new Promise((resolve, reject) => {
        var _a, _b;
        const process = (0, child_process_1.exec)(`tsc -p ${tsConfigPath}`);
        (_a = process.stdout) === null || _a === void 0
            ? void 0
            : _a.on('data', (data) => {
                  devkit_1.logger.info(data);
              });
        (_b = process.stderr) === null || _b === void 0
            ? void 0
            : _b.on('data', (data) => {
                  devkit_1.logger.error(data);
              });
        process.on('close', (code) => {
            if (code === 0) {
                resolve(0);
            } else {
                reject(new Error(`tsc exited with code ${code}`));
            }
        });
    });
};
//# sourceMappingURL=copy-schematics.js.map
