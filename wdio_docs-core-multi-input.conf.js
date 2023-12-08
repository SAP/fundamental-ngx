module.exports.config = require('./e2e/wdio.base-config.js')({
    runner: 'local',
    projectName: 'docs-core-multi-input',
    specs: ['libs/docs/core/multi-input/e2e/**/*.e2e-spec.ts']
});
