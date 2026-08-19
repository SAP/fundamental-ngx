const path = require('path');
const WorkflowValidator = require('./workflow-validator');

const workflowPath = path.join(__dirname, '../on-pull-request.yml');
const validator = new WorkflowValidator(workflowPath);

validator
    // Trigger configuration
    .assertTriggersOn('pull_request', ['opened', 'synchronize', 'edited'])
    .assertHasPathFilter('pull_request', [
        'libs/**',
        'apps/**',
        'playwright.config.ts',
        '.github/workflows/on-pull-request.yml',
        '!apps/e2e-harness/e2e/snapshots/**'
    ])

    // Report results
    .report();
