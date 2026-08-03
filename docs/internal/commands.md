# Common Commands Reference

**Purpose:** The definitive command reference for the Fundamental NGX project. All commands are copy-paste ready. When in doubt, check here first.

---

## Building

```bash
# Build a specific library
nx run core:build
nx run platform:build

# Build all affected libraries (recommended)
nx affected:build

# Build with verbose output
nx run core:build --verbose
```

## Testing

### Unit Tests (Jest)

```bash
# Run all unit tests for a library
nx run core:test

# Run specific test file
nx run core:test --testfile=button.component.spec.ts

# Run tests in watch mode
nx run core:test --watch

# Run tests with coverage
nx run core:test --coverage

# Run affected tests only (recommended)
nx affected:test

# Skip NX cache
nx run core:test --skip-nx-cache
```

### E2E Tests (Playwright)

```bash
# Run all E2E tests (auto-starts e2e-harness)
npx playwright test

# Run specific test suite
npx playwright test --grep "core/button"

# Run tests in headed mode (see browser)
npx playwright test --headed

# Run tests in debug mode
npx playwright test --debug

# View test report
npx playwright show-report

# Run a test multiple times (detect flakiness)
npx playwright test --repeat-each=10 --grep "test-name"

# Increase timeout for slow tests
npx playwright test --timeout=60000
```

## Linting

```bash
# Lint specific project
npx nx lint core
npx nx lint platform
npx nx lint docs

# Lint with auto-fix
npx nx lint core --fix

# Lint all projects
npx nx run-many --target=lint --all

# Lint only affected projects (recommended)
npx nx affected --target=lint
```

## Formatting

```bash
# Format all files (run after code changes)
yarn format

# Check formatting without changes (add --check flag)
yarn prettier . --check
```

## Development

```bash
# Start docs app
yarn start

# Show dependency graph
nx graph
```

## Cache & Cleanup

```bash
# Clear NX cache (if builds are stale)
nx reset

# Build skipping cache
yarn build --skip-nx-cache

# Full UI5 Web Components rebuild (clears and regenerates all wrappers)
yarn cleanup
nx run ui5-webcomponents-base:generate --skip-nx-cache
nx run ui5-webcomponents:generate --skip-nx-cache
nx run ui5-webcomponents-ai:generate --skip-nx-cache
nx run ui5-webcomponents-fiori:generate --skip-nx-cache
nx run ui5-webcomponents-base:build --skip-nx-cache
nx run ui5-webcomponents:build --skip-nx-cache
nx run ui5-webcomponents-ai:build --skip-nx-cache
nx run ui5-webcomponents-fiori:build --skip-nx-cache
```

## NG15 Downport Branch Setup

Switch between the Angular 15 downport branch (Yarn 1.x + Node 18) and main branch (Yarn 4.x + Node 22).

```bash
# Switch to Angular 15 downport branch
git checkout ng-15-downport

# Going back to Yarn 1.x (for ng-15-downport)
sudo corepack disable
sudo npm i -g yarn
# Install Node 18 (use nvm or your preferred method)
rm -rf node_modules dist
yarn install

# ---

# Going to Yarn 4.x (back to main branch)
sudo npm uninstall -g yarn
sudo corepack enable
# Install Node 22 (use nvm or your preferred method)
rm -rf node_modules dist
yarn install
```

**Notes:**

- Angular 15 downport branch uses **Yarn 1.x** and **Node 18**
- Main branch uses **Yarn 4.x** and **Node 22**
- Always clean `node_modules` and `dist` when switching

## Working with affected

```bash
# See what's affected by your changes
nx affected:graph

# Run all affected targets
nx affected:build
nx affected:test
nx affected:lint
```

## E2E Harness & Snapshots

### Start the E2E Harness

```bash
# Start manually (keeps running across test runs)
npx nx serve e2e-harness
```

The harness is served at **http://localhost:4400**.

> Example: `http://localhost:4400/platform/settings-generator/custom-control`

### Update Snapshots

**IMPORTANT:** Snapshot updates require the e2e-harness to be running first (Playwright config only auto-starts it for regular test runs, not `--update-snapshots`).

```bash
# 1. Start the harness in one terminal
npx nx serve e2e-harness

# 2. Update snapshots in another terminal
npx playwright test --update-snapshots

# Update snapshots for a specific component only
npx playwright test --update-snapshots --grep "core/shellbar"
```

### Add E2E Routes

When adding a new page/route to E2E coverage:

1. Add the route to [apps/e2e-harness/e2e/config/e2e.routes.json](../../apps/e2e-harness/e2e/config/e2e.routes.json)
2. Regenerate the route manifest:

```bash
nx run e2e-harness:generate-routes
```
