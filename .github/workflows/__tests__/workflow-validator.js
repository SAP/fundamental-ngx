const fs = require('fs');
const yaml = require('yaml');
const path = require('path');

/**
 * Workflow validator framework for testing GitHub Actions workflows.
 * Provides utilities to assert workflow structure, triggers, and job configuration.
 */
class WorkflowValidator {
    constructor(workflowPath) {
        if (!fs.existsSync(workflowPath)) {
            throw new Error(`Workflow file not found: ${workflowPath}`);
        }
        const content = fs.readFileSync(workflowPath, 'utf8');
        this.workflow = yaml.parse(content);
        this.path = workflowPath;
        this.errors = [];
    }

    /**
     * Assert that workflow triggers on specific event types
     */
    assertTriggersOn(eventType, types) {
        if (!this.workflow.on[eventType]) {
            this.errors.push(`❌ Workflow does not trigger on '${eventType}'`);
            return this;
        }

        const actualTypes = Array.isArray(this.workflow.on[eventType].types)
            ? this.workflow.on[eventType].types
            : this.workflow.on[eventType] === true
              ? ['any']
              : [];

        const missing = types.filter((t) => !actualTypes.includes(t));
        if (missing.length > 0) {
            this.errors.push(
                `❌ '${eventType}' is missing types: ${missing.join(', ')}\n` + `   Actual: [${actualTypes.join(', ')}]`
            );
        }
        return this;
    }

    /**
     * Assert that workflow does NOT trigger on specific event types
     */
    assertNotTriggersOn(eventType, types) {
        if (!this.workflow.on[eventType]) {
            return this; // Not configured at all is fine
        }

        const actualTypes = Array.isArray(this.workflow.on[eventType].types) ? this.workflow.on[eventType].types : [];

        const found = types.filter((t) => actualTypes.includes(t));
        if (found.length > 0) {
            this.errors.push(
                `❌ '${eventType}' should NOT trigger on: ${found.join(', ')}\n` +
                    `   Current types: [${actualTypes.join(', ')}]`
            );
        }
        return this;
    }

    /**
     * Assert that workflow has path filtering
     */
    assertHasPathFilter(eventType, paths) {
        if (!this.workflow.on[eventType]?.paths) {
            this.errors.push(`❌ '${eventType}' is missing 'paths' filter`);
            return this;
        }

        const actualPaths = this.workflow.on[eventType].paths;
        const missing = paths.filter((p) => !actualPaths.includes(p));
        if (missing.length > 0) {
            this.errors.push(
                `❌ '${eventType}' paths filter is missing: ${missing.join(', ')}\n` +
                    `   Actual: [${actualPaths.join(', ')}]`
            );
        }
        return this;
    }

    /**
     * Assert that workflow has paths-ignore filter
     */
    assertHasPathsIgnore(eventType, patterns) {
        if (!this.workflow.on[eventType]?.['paths-ignore']) {
            this.errors.push(`❌ '${eventType}' is missing 'paths-ignore' filter`);
            return this;
        }

        const actualPatterns = this.workflow.on[eventType]['paths-ignore'];
        const missing = patterns.filter((p) => !actualPatterns.includes(p));
        if (missing.length > 0) {
            this.errors.push(
                `❌ '${eventType}' paths-ignore is missing: ${missing.join(', ')}\n` +
                    `   Actual: [${actualPatterns.join(', ')}]`
            );
        }
        return this;
    }

    /**
     * Assert that a job exists
     */
    assertJobExists(jobName) {
        if (!this.workflow.jobs[jobName]) {
            this.errors.push(`❌ Job '${jobName}' not found`);
            return this;
        }
        return this;
    }

    /**
     * Assert that a job has a specific condition
     */
    assertJobCondition(jobName, expectedCondition) {
        this.assertJobExists(jobName);
        const job = this.workflow.jobs[jobName];

        if (expectedCondition === null || expectedCondition === undefined) {
            if (job.if) {
                this.errors.push(`❌ Job '${jobName}' should have no condition, but has: ${job.if}`);
            }
        } else {
            if (!job.if || job.if !== expectedCondition) {
                this.errors.push(
                    `❌ Job '${jobName}' condition mismatch\n` +
                        `   Expected: ${expectedCondition}\n` +
                        `   Actual: ${job.if || '(none)'}`
                );
            }
        }
        return this;
    }

    /**
     * Assert that a job uses a specific environment
     */
    assertJobEnvironment(jobName, envName) {
        this.assertJobExists(jobName);
        const job = this.workflow.jobs[jobName];

        if (job.environment !== envName) {
            this.errors.push(
                `❌ Job '${jobName}' environment mismatch\n` +
                    `   Expected: ${envName}\n` +
                    `   Actual: ${job.environment || '(none)'}`
            );
        }
        return this;
    }

    /**
     * Assert that a job does NOT use any environment
     */
    assertJobNoEnvironment(jobName) {
        this.assertJobExists(jobName);
        const job = this.workflow.jobs[jobName];

        if (job.environment) {
            this.errors.push(`❌ Job '${jobName}' should not use environment, but has: ${job.environment}`);
        }
        return this;
    }

    /**
     * Get all validation results
     */
    getResults() {
        return {
            valid: this.errors.length === 0,
            errors: this.errors,
            summary: this.errors.length === 0 ? '✓ All checks passed' : `✗ ${this.errors.length} error(s) found`
        };
    }

    /**
     * Print results and exit with appropriate code
     */
    report() {
        const results = this.getResults();
        console.log('\n' + '='.repeat(60));
        console.log(`Workflow: ${path.basename(this.path)}`);
        console.log('='.repeat(60));

        if (results.errors.length > 0) {
            results.errors.forEach((err) => console.log(err));
            console.log('='.repeat(60));
            console.log(results.summary);
            console.log('='.repeat(60) + '\n');
            process.exit(1);
        } else {
            console.log(results.summary);
            console.log('='.repeat(60) + '\n');
            process.exit(0);
        }
    }
}

module.exports = WorkflowValidator;
