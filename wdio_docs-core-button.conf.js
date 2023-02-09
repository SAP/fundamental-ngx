module.exports.config = require('./e2e/wdio.base-config.js')({
    runner: 'local',
    projectName: 'docs-core-button',
    specs: ['libs/docs/core/button/e2e/**/*.e2e-spec.ts']
});
