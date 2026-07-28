# Testing Guide

**Purpose:** Commands and workflows for running unit tests, E2E tests, visual regression tests, and updating snapshots. Covers Playwright, Jest, and screenshot testing.

---

## E2E Testing (Playwright)

```bash
# Run all E2E tests
npx playwright test

# Run specific test suite
npx playwright test --grep "core/button"

# Run tests in headed mode (see browser)
npx playwright test --headed

# Run tests in debug mode
npx playwright test --debug

# Update snapshots
npx playwright test --update-snapshots

# View test report
npx playwright show-report
```

---

## Unit Tests (Jest)

```bash
# Run all unit tests for a library
nx run core:test

# Run specific test file
nx run core:test --testfile=button.component.spec.ts

# Run tests in watch mode
nx run core:test --watch

# Run tests with coverage
nx run core:test --coverage

# Run affected tests only (faster)
nx affected:test
```

---

## Visual Regression Tests

```bash
# Update visual snapshots (after intentional UI changes)
npx playwright test --update-snapshots

# Run only visual tests
npx playwright test --grep "visual"

# Compare snapshots
npx playwright show-report
```

---

## Troubleshooting

### Snapshot mismatches

If snapshots fail unexpectedly:

1. Check if the change is intentional
2. Review the diff in the HTML report: `npx playwright show-report`
3. Update if correct: `npx playwright test --update-snapshots`

### Flaky tests

```bash
# Run a test multiple times to detect flakiness
npx playwright test --repeat-each=10 --grep "flaky-test"
```

### Test hangs or times out

```bash
# Increase timeout for slow tests
npx playwright test --timeout=60000
```
