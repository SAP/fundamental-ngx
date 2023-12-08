module.exports.config = require('./e2e/wdio.base-config.js')({
    runner: 'local',
    projectName: 'docs-core-time-picker',
    specs: ['libs/docs/core/time-picker/e2e/**/*.e2e-spec.ts']
});
