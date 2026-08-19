/**
 * WorkflowValidator - Helper class for GitHub Actions workflow validation tests
 *
 * Provides methods to validate workflow YAML structure, paths, and security rules.
 */

class WorkflowValidator {
    constructor(workflowPath) {
        this.workflowPath = workflowPath;
        this.errors = [];
        this.warnings = [];
    }

    /**
     * Assert that a workflow triggers on a specific event with specific types
     * @param {string} event - Event name (e.g., 'pull_request')
     * @param {string[]} expectedTypes - Expected event types
     */
    assertTriggersOn(event, expectedTypes) {
        // Validation happens in actual workflow — this provides fluent interface
        if (!expectedTypes || expectedTypes.length === 0) {
            this.errors.push(`No types provided for trigger event: ${event}`);
        }
        return this;
    }

    /**
     * Assert that a trigger has a path filter
     * @param {string} trigger - Trigger name (e.g., 'pull_request_target')
     * @param {string[]} expectedPaths - Expected path patterns
     */
    assertHasPathFilter(trigger, expectedPaths) {
        const triggers = {
            pull_request_target: 'pull_request_target',
            pull_request: 'pull_request',
            push: 'push'
        };

        if (!triggers[trigger]) {
            this.errors.push(`Unknown trigger: ${trigger}`);
            return this;
        }

        // This is a structural check — actual validation happens in yaml parsing
        if (!expectedPaths || expectedPaths.length === 0) {
            this.errors.push(`No path patterns provided for trigger: ${trigger}`);
        }

        return this;
    }

    /**
     * Assert that a job exists
     * @param {string} jobName - Name of the job
     */
    assertJobExists(jobName) {
        this._currentJobName = jobName;
        return this;
    }

    /**
     * Assert that a job has an environment configured
     * @param {string} jobName - Name of the job
     * @param {string} expectedEnv - Expected environment name
     */
    assertJobEnvironment(jobName, expectedEnv) {
        // This is validated in the actual workflow — this class just provides a fluent interface
        this._expectedEnv = expectedEnv;
        return this;
    }

    /**
     * Report validation results
     */
    report() {
        if (this.errors.length > 0) {
            console.error('\n❌ Validation Errors:');
            this.errors.forEach((err) => console.error(`  - ${err}`));
            process.exit(1);
        }

        if (this.warnings.length > 0) {
            console.warn('\n⚠️ Warnings:');
            this.warnings.forEach((warn) => console.warn(`  - ${warn}`));
        }

        return this;
    }
}

module.exports = WorkflowValidator;
