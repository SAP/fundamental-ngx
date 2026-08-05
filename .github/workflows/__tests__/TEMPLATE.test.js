const path = require('path');
const WorkflowValidator = require('./workflow-validator');

/**
 * Template for workflow validation tests.
 * Copy this file and customize the assertions for your workflow.
 */

const workflowPath = path.join(__dirname, '../YOUR_WORKFLOW.yml');
const validator = new WorkflowValidator(workflowPath);

validator
    // Example: Trigger configuration
    .assertTriggersOn('pull_request', ['opened', 'synchronize'])

    // Example: Path filtering
    .assertHasPathFilter('pull_request', ['src/**'])

    // Example: Job existence and conditions
    .assertJobExists('build')
    .assertJobCondition('build', null)

    // Example: Environment usage
    .assertJobEnvironment('deploy', 'production')

    // Report results and exit with appropriate code
    .report();
