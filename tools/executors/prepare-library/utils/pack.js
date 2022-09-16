'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const devkit_1 = require('@nrwl/devkit');
const child_process_1 = require('child_process');
async function pack(targetOptions, context) {
    devkit_1.logger.info(`=== Packing ${context.projectName} ===`);
    const { distPath } = targetOptions;
    const packageManager = (0, devkit_1.detectPackageManager)('./');
    (0, child_process_1.execSync)((0, devkit_1.getPackageManagerCommand)(packageManager).run('pack', ''), {
        cwd: distPath,
        stdio: 'inherit'
    });
    return {
        success: true
    };
}
exports.default = pack;
//# sourceMappingURL=pack.js.map
