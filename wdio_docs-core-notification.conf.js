module.exports.config = require('./e2e/wdio.base-config.js')({
    runner: 'local',
    projectName: 'docs-core-notification',
    specs: ['libs/docs/core/notification/e2e/**/*.e2e-spec.ts']
});
