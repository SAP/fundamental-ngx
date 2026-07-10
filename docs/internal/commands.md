# Common Commands Reference

**Purpose:** Quick reference for frequently used commands in the Fundamental NGX project. Copy-paste ready commands for building, testing, linting, and managing the NX monorepo.

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

```bash
# Run all tests for a library
nx run core:test

# Run specific test file
nx run core:test --testfile=button.component.spec.ts

# Run affected tests only
nx affected:test

# Run tests in watch mode
nx run core:test --watch
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

# Check formatting without changes
yarn format:check
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
