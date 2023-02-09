module.exports.config = require('./e2e/wdio.base-config.js')({
    runner: 'local',
    projectName: 'docs-core-dialog',
    specs: ['libs/docs/core/dialog/e2e/**/*.e2e-spec.ts']
});
