# Testing Guide

**Purpose:** Testing workflows, best practices, and troubleshooting. For commands, see [commands.md](commands.md).

---

## Quick Start

> **Commands:** See [commands.md](commands.md#testing) for all test commands.

**Basic workflow:**

1. Run unit tests after code changes: `nx run <library>:test --testfile=<file>.spec.ts`
2. Run E2E tests to verify UI: `npx playwright test --grep "component-name"`
3. Update snapshots when UI changes are intentional (see [Snapshot Workflow](#snapshot-workflow))

---

## Testing Workflows

### Unit Testing Workflow (Jest)

**When to run:**

- After modifying component logic
- After changing component structure or properties
- Before committing code

**Typical flow:**

```bash
# 1. Run specific test file during development
nx run core:test --testfile=button.component.spec.ts --watch

# 2. Run all library tests before committing
nx run core:test

# 3. Run affected tests to validate your branch
nx affected:test
```

**Watch mode tips:**

- Press `p` to filter by filename pattern
- Press `t` to filter by test name pattern
- Press `u` to update snapshots (Jest snapshots, not Playwright)
- Press `q` to quit watch mode

---

### E2E Testing Workflow (Playwright)

**When to run:**

- After visual/UI changes
- Before creating a PR
- When reviewing component rendering

**Typical flow:**

```bash
# Run all E2E tests (auto-starts harness)
npx playwright test

# Run tests for specific component (faster iteration)
npx playwright test --grep "core/dialog"

# Debug a specific test
npx playwright test --debug --grep "test-name"
```

> **Commands:** See [commands.md](commands.md#e2e-tests-playwright) for all Playwright options.

---

### Snapshot Workflow

**When snapshots fail:**

1. Review the diff: `npx playwright show-report`
2. If the change is **intentional** (you changed CSS/HTML):
    - Start the harness: `npx nx serve e2e-harness`
    - Update snapshots: `npx playwright test --update-snapshots`
3. If the change is **unintentional** (regression):
    - Fix the code
    - Re-run tests to verify

**Updating snapshots:**

> ⚠️ **IMPORTANT:** You must start the e2e-harness **before** updating snapshots. The Playwright config only auto-starts it for regular test runs, not for `--update-snapshots`.

```bash
# Terminal 1: Start the harness
npx nx serve e2e-harness

# Terminal 2: Update snapshots
npx playwright test --update-snapshots
```

> **Commands:** See [commands.md](commands.md#update-snapshots) for snapshot commands.

---

## Troubleshooting

Having test issues? See **[troubleshooting.md](troubleshooting.md#test-issues)** for solutions to:

- Visual snapshot mismatches
- Flaky tests (pass/fail intermittently)
- Test hangs or timeouts
- Jest snapshot failures
- Tests passing locally but failing in CI
- Cannot update Playwright snapshots
