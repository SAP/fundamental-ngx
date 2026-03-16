# NX Monorepo Workflow

> This document covers the NX workspace structure and development workflow for Fundamental NGX.

## Table of Contents

- [Workspace Structure](#workspace-structure)
- [Common Commands](#common-commands)
- [Running Specific Test Files](#running-specific-test-files)
- [Development Workflow](#development-workflow)
- [Incremental Validation](#incremental-validation)
- [NX Best Practices](#nx-best-practices)

---

## Workspace Structure

The Fundamental NGX project uses NX as a monorepo build system with the following libraries:

| Library                        | Description                                               |
| ------------------------------ | --------------------------------------------------------- |
| `libs/core`                    | Core Angular components and services                      |
| `libs/platform`                | Platform-specific components                              |
| `libs/cdk`                     | Component Development Kit with utilities and base classes |
| `libs/btp`                     | BTP (Business Technology Platform) components             |
| `libs/cx`                      | Customer Experience components                            |
| `libs/i18n`                    | Internationalization utilities                            |
| `libs/datetime-adapter`        | Date/time adapters                                        |
| `libs/ui5-webcomponents`       | UI5 Web Components wrappers                               |
| `libs/ui5-webcomponents-ai`    | AI-specific UI5 components wrappers                       |
| `libs/ui5-webcomponents-fiori` | Fiori UI5 components wrappers                             |
| `libs/ui5-webcomponents-base`  | Base UI5 web components package                           |
| `apps/docs`                    | Documentation application                                 |

---

## Common Commands

### Building

```bash
# Build specific project
nx build <project>

# Build all projects
nx run-many --target=build --all

# Build only affected projects
nx affected:build
```

### Testing

```bash
# Run all tests in a library
nx test <library>

# Run specific test file
nx run <library>:test --testfile=<filename>.spec.ts

# Run tests in watch mode
nx test <library> --watch

# Run only affected tests
nx affected:test
```

### Linting

```bash
# Lint specific project
nx run <library>:lint

# Lint with auto-fix
nx run <library>:lint --fix

# Lint only affected projects
nx affected:lint
```

### Serving

```bash
# Serve the documentation app
yarn start

# Or using NX
nx serve docs
```

---

## Running Specific Test Files

The most common way to run tests for a specific file:

```bash
nx run <library>:test --testfile=<filename>.spec.ts
```

### Examples

```bash
# CDK tests
nx run cdk:test --testfile=line-clamp.directive.spec.ts
nx run cdk:test --testfile=clicked.directive.spec.ts
nx run cdk:test --testfile=truncate.directive.spec.ts

# Core tests
nx run core:test --testfile=button.component.spec.ts
nx run core:test --testfile=dialog.component.spec.ts

# Platform tests
nx run platform:test --testfile=table.component.spec.ts
nx run platform:test --testfile=form-field.component.spec.ts
```

---

## Development Workflow

### The Build-Test-Lint Cycle

After making ANY code changes, follow this validation sequence:

```bash
# 1. Compile - catches type errors and syntax issues
nx run <library>:build

# 2. Lint - catches style violations, member ordering, and shadowing
nx run <library>:lint

# 3. Test - catches logic errors and broken functionality
nx run <library>:test --testfile=<file>.spec.ts
```

### When to Run Validation

| Change Type                     | When to Validate        | Why                                       |
| ------------------------------- | ----------------------- | ----------------------------------------- |
| Type annotation changes         | After each file         | TypeScript may not infer as expected      |
| Adding/removing properties      | Immediately             | References may break                      |
| Structural changes (reordering) | Before committing       | ESLint member ordering rules              |
| New test suites                 | After writing           | Verify tests are realistic and pass       |
| linkedSignal/computed changes   | After each change       | Complex type inference needs verification |
| Multiple file refactoring       | After each logical step | Catch cascading errors early              |

---

## Incremental Validation

### ✅ GOOD - Validate incrementally

```typescript
// 1. Make change
readonly contentDensity = this._contentDensity.asReadonly();

// 2. Run build immediately
// $ nx run core:build

// 3. If error, fix before next change
// 4. Then proceed to next change
```

### ❌ BAD - Make multiple changes before validating

```typescript
// Changed 5 files with type modifications
// Added 20 new tests
// Refactored class structure
// NOW running build... (16 errors!)
```

### Watch Mode (Recommended)

For active development, use watch mode:

```bash
# Run tests in watch mode
nx test <library> --watch

# Run lint in watch mode (if supported)
nx run <library>:lint --watch
```

---

## NX Best Practices

### Understanding Dependencies

```bash
# View project dependency graph
nx graph

# Show what projects are affected by changes
nx affected:graph
```

### Use Affected Commands

Only build/test what changed:

```bash
# Build affected projects
nx affected:build

# Test affected projects
nx affected:test

# Lint affected projects
nx affected:lint
```

### Leverage Caching

NX automatically caches build and test results. To skip cache:

```bash
nx run <library>:test --skip-nx-cache
```

### Using Generators

Create new components and services using NX generators:

```bash
# Create a new component
nx g @schematics/angular:component my-component --project=core

# Create a new service
nx g @schematics/angular:service my-service --project=core
```

### Task Dependencies

The project uses task dependencies defined in `nx.json`. Common patterns:

- Build depends on building dependencies first
- Test depends on build completing
- Lint can run independently

---

## Pre-Commit Checklist

Before committing changes:

```bash
# 1. Build affected libraries
nx affected:build

# 2. Lint affected libraries
nx affected:lint

# 3. Test affected libraries
nx affected:test
```

Or run all checks:

```bash
yarn test
yarn lint
```

---

## Common Issues

### Cache Issues

If you suspect stale cache:

```bash
# Clear NX cache
nx reset
```

### Dependency Graph Issues

If imports aren't resolving:

```bash
# Regenerate dependency graph
nx reset
nx graph
```

### Build Order Issues

If builds fail due to missing dependencies:

```bash
# Build with dependencies
nx run <library>:build --with-deps
```
