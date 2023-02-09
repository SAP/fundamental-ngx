module.exports.config = require('./e2e/wdio.base-config.js')({
    runner: 'local',
    projectName: 'docs-platform-table',
    specs: ['libs/docs/platform/table/e2e/**/*.e2e-spec.ts']
});
