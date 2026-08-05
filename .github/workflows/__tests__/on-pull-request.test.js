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
        '.github/workflows/on-pull-request.yml'
    ])
    .assertHasPathsIgnore('pull_request', ['apps/e2e-harness/e2e/snapshots/**'])

    // Linting jobs always run (no conditional)
    .assertJobExists('pr_title_lint')
    .assertJobCondition('pr_title_lint', null)
    .assertJobExists('pr_body_lint')
    .assertJobCondition('pr_body_lint', null)

    // Build/test jobs skip on description-only edits
    .assertJobExists('nx_agents')
    .assertJobCondition('nx_agents', "github.event.action != 'edited'")
    .assertJobEnvironment('nx_agents', 'ci')

    .assertJobExists('build_test')
    .assertJobCondition('build_test', "github.event.action != 'edited'")
    .assertJobEnvironment('build_test', 'ci')

    // Report results
    .report();
