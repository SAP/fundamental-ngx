module.exports.config = require('./e2e/wdio.base-config.js')({
    runner: 'local',
    projectName: 'docs',
    specs: [
        'libs/docs/platform/search-field/e2e/**/*.e2e-spec.ts',
        'libs/docs/platform/variant-management/e2e/**/*.e2e-spec.ts',
        'libs/docs/platform/smart-filter-bar/e2e/**/*.e2e-spec.ts',
        'libs/docs/platform/vhd/e2e/**/*.e2e-spec.ts',
        'libs/docs/platform/approval-flow/e2e/**/*.e2e-spec.ts',
        'libs/docs/platform/upload-collection/e2e/**/*.e2e-spec.ts',
        'libs/docs/platform/table/e2e/**/*.e2e-spec.ts'
    ]
});
