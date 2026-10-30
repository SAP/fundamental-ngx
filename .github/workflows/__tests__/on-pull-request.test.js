const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('path');
const YAML = require('yaml');
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
        'package.json',
        'yarn.lock',
        '.github/workflows/on-pull-request.yml'
    ])

    // Report results
    .report();

const paths = YAML.parse(readFileSync(workflowPath, 'utf8')).on.pull_request.paths;
for (const dependencyFile of ['package.json', 'yarn.lock']) {
    assert.ok(paths.includes(dependencyFile), `PR checks must run for ${dependencyFile} changes`);
}
