'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.copyReadme = void 0;
const devkit_1 = require('@nrwl/devkit');
const fs_1 = require('fs');
async function copyReadme(targetOptions, projectConfig, projectName) {
    if (isCopyReadmeOptions(targetOptions.copyReadme)) {
        devkit_1.logger.info(`=== Copying README.md to ${projectName} ===`);
        const { readmePath, targetPath } = targetOptions.copyReadme;
        (0, fs_1.copyFileSync)(`${projectConfig.root}/${readmePath}`, `${projectConfig.root}/${targetPath}`);
        devkit_1.logger.info(`✅ Copied README.md from ${readmePath} to ${targetPath}`);
    } else {
        devkit_1.logger.error(`Provided copyReadme options for project ${projectName} is invalid`);
    }
}
exports.copyReadme = copyReadme;
function isCopyReadmeOptions(options) {
    return options && typeof options === 'object' && options.readmePath && options.targetPath;
}
//# sourceMappingURL=copy-readme.js.map
