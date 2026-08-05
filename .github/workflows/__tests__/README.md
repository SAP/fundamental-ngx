# Workflow Tests

Validation tests for GitHub Actions workflows.

## Overview

This directory contains tests that validate workflow structure, triggers, and job configuration. Tests use the `WorkflowValidator` framework to assert workflow properties in a declarative, readable way.

## Framework: WorkflowValidator

`workflow-validator.js` provides a chainable API for asserting workflow properties:

```javascript
const validator = new WorkflowValidator('./path/to/workflow.yml');

validator
    .assertTriggersOn('pull_request', ['opened', 'synchronize'])
    .assertHasPathFilter('pull_request', ['libs/**', 'apps/**'])
    .assertHasPathsIgnore('pull_request', ['**/*.test.js'])
    .assertJobExists('build')
    .assertJobCondition('build', null)
    .assertJobEnvironment('build', 'ci')
    .report();
```

## Available Assertions

### Triggers

- `assertTriggersOn(eventType, types)` — Workflow must trigger on these event types
- `assertNotTriggersOn(eventType, types)` — Workflow must NOT trigger on these types

### Path Filtering

- `assertHasPathFilter(eventType, paths)` — Workflow must have these paths in filter
- `assertHasPathsIgnore(eventType, patterns)` — Workflow must ignore these path patterns

### Jobs

- `assertJobExists(jobName)` — Job must exist
- `assertJobCondition(jobName, condition)` — Job must have this `if:` condition (null = no condition)
- `assertJobEnvironment(jobName, envName)` — Job must use this environment
- `assertJobNoEnvironment(jobName)` — Job must not use any environment

### Results

- `getResults()` — Returns `{ valid, errors, summary }`
- `report()` — Prints results and exits with code 0 (pass) or 1 (fail)

## Writing Tests

1. Copy `TEMPLATE.test.js` to `{workflow-name}.test.js`
2. Update the workflow path
3. Write assertions that define the expected behavior
4. Run: `npm run test:workflows`

Example: `e2e-test.test.js`

```javascript
const path = require('path');
const WorkflowValidator = require('./workflow-validator');

const validator = new WorkflowValidator(path.join(__dirname, '../e2e-test.yml'));

validator
    .assertTriggersOn('pull_request', ['opened', 'synchronize'])
    .assertHasPathFilter('pull_request', ['libs/**', 'apps/e2e-harness/**'])
    .assertJobExists('e2e')
    .assertJobCondition('e2e', null)
    .report();
```

## Running Tests

```bash
# Run all workflow tests
npm run test:workflows

# Run specific test
node .github/workflows/__tests__/on-pull-request.test.js
```

Exit codes:

- `0` — All tests passed
- `1` — One or more tests failed

## Test Coverage

Current tests:

- ✓ `on-pull-request.test.js` — Validates PR workflow triggers and job conditionals
- (Add more workflows as needed)

## Adding New Tests

When you add or modify a workflow:

1. Create or update corresponding `.test.js` file
2. Add assertions that capture the desired behavior
3. Run `npm run test:workflows` to verify
4. Commit both the workflow and test file

This ensures workflow changes are intentional and documented.
