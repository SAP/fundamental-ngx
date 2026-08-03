# NX Monorepo Workflow

**Purpose:** Understanding the NX monorepo structure, development patterns, and best practices. For commands, see [docs/internal/commands.md](../internal/commands.md).

---

## Table of Contents

- [Workspace Structure](#workspace-structure)
- [Development Workflow](#development-workflow)
- [Incremental Validation](#incremental-validation)
- [Understanding NX Concepts](#understanding-nx-concepts)
- [Best Practices](#best-practices)

---

## Workspace Structure

The Fundamental NGX project uses NX as a monorepo build system with the following libraries:

| Library                        | Description                                               | Prefix |
| ------------------------------ | --------------------------------------------------------- | ------ |
| `libs/core`                    | Core Angular components and services                      | `fd-`  |
| `libs/platform`                | Platform-specific components                              | `fdp-` |
| `libs/cdk`                     | Component Development Kit with utilities and base classes | `fdk-` |
| `libs/btp`                     | BTP (Business Technology Platform) components             | `fdb-` |
| `libs/cx`                      | Customer Experience components                            | `cx-`  |
| `libs/i18n`                    | Internationalization utilities                            | —      |
| `libs/datetime-adapter`        | Date/time adapters                                        | —      |
| `libs/ui5-webcomponents`       | UI5 Web Components wrappers                               | `ui5-` |
| `libs/ui5-webcomponents-ai`    | AI-specific UI5 components wrappers                       | `ui5-` |
| `libs/ui5-webcomponents-fiori` | Fiori UI5 components wrappers                             | `ui5-` |
| `libs/ui5-webcomponents-base`  | Base UI5 web components package                           | `ui5-` |
| `apps/docs`                    | Documentation application                                 | —      |

**Dependency rules** (enforced by `nx-enforce-module-boundaries`):

- `cdk` has no library dependencies (base layer)
- `core` depends on `cdk`, `i18n`
- `platform` depends on `core`, `cdk`, `i18n`
- `btp`, `cx` depend on `core`, `platform`, `cdk`
- `ui5-*` depends on `ui5-webcomponents-base` only
- `docs` can import everything

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

> **Commands:** See [commands.md](../internal/commands.md) for all build/test/lint commands.

### When to Validate

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

Make one change, validate immediately, then proceed:

```typescript
// 1. Make change
readonly contentDensity = this._contentDensity.asReadonly();

// 2. Run build immediately
// $ nx run core:build

// 3. If error, fix before next change
// 4. Then proceed to next change
```

**Why this works:**

- Errors are isolated to the last change
- Faster feedback loop
- Easier to debug

### ❌ BAD - Make multiple changes before validating

```typescript
// Changed 5 files with type modifications
// Added 20 new tests
// Refactored class structure
// NOW running build... (16 errors!)
```

**Why this fails:**

- Can't isolate which change caused the error
- Overwhelming number of errors
- Time wasted debugging

### Watch Mode (Recommended)

For active development, use watch mode to get instant feedback:

```bash
# Run tests in watch mode (re-runs on file changes)
nx test <library> --watch
```

**Watch mode benefits:**

- Automatic re-run on file save
- Faster iterations (no startup overhead)
- Filter by filename or test name

> **Commands:** See [commands.md](../internal/commands.md#testing) for watch mode options.

---

## Understanding NX Concepts

### Affected Commands

NX tracks file changes and only runs tasks for projects affected by those changes.

**Why use affected:**

- Much faster than running all projects
- Focuses validation on what actually changed
- Essential for large monorepos

**How it works:**

```bash
# NX compares your branch against a base (usually main)
# and determines which projects are affected
nx affected:build  # Only build affected projects
nx affected:test   # Only test affected projects
nx affected:lint   # Only lint affected projects
```

**Visualize what's affected:**

```bash
nx affected:graph  # Opens interactive dependency graph
```

> **Commands:** See [commands.md](../internal/commands.md#working-with-affected) for affected commands.

### Dependency Graph

NX builds a dependency graph of all projects in the workspace.

**View the graph:**

```bash
nx graph  # Full workspace graph
nx affected:graph  # Only affected projects
```

**Why the graph matters:**

- Shows which projects depend on each other
- Determines build order (dependencies build first)
- Calculates what's affected by changes

**Example:**

- If you change `libs/core/button`, NX knows:
    - `libs/platform` depends on `core` → affected
    - `apps/docs` depends on `core` → affected
    - `libs/cdk` doesn't depend on `core` → not affected

### Caching

NX caches task results (build, test, lint) to avoid redundant work.

**How it works:**

- Hashes inputs (source files, dependencies, config)
- Checks if a task with the same hash has been run before
- If yes, restores the cached output instantly
- If no, runs the task and caches the output

**When cache helps:**

- Switching branches → cached builds restore instantly
- Running affected commands → unchanged projects use cache
- CI/CD → shared cache across machines (if configured)

**When cache causes issues:**

- Stale builds after configuration changes
- External dependencies changed (npm packages)

**Clear cache if builds are stale:**

```bash
nx reset  # Clears all cached results
```

**Skip cache for specific task:**

```bash
nx run <library>:test --skip-nx-cache
```

> **Commands:** See [commands.md](../internal/commands.md#cache--cleanup) for cache commands.

### Task Dependencies

NX can run tasks in parallel or in sequence based on dependencies.

**Defined in `nx.json`:**

- `build` depends on `^build` (dependencies must build first)
- `test` depends on `build` (tests need built artifacts)
- `lint` runs independently (no dependencies)

**Parallel execution:**

- NX runs independent tasks in parallel automatically
- Speeds up validation significantly
- Example: linting multiple projects at once

---

## Best Practices

### Use Affected Commands

**Always prefer affected commands for validation:**

```bash
# ✅ GOOD - Only validate what changed
nx affected:build
nx affected:test
nx affected:lint

# ❌ BAD - Validates everything (slow)
nx run-many --target=build --all
nx run-many --target=test --all
```

**When to run all:**

- After major dependency updates (Angular, NX)
- Before cutting a release
- When you suspect cache issues

### Leverage Watch Mode

**For active development:**

```bash
# Keep tests running in watch mode
nx test <library> --watch

# Make changes, tests re-run automatically
# Much faster than manual re-runs
```

### Validate Incrementally

**Don't batch changes:**

- Make one logical change
- Run build/test immediately
- Fix errors before proceeding
- Repeat

**Why:**

- Faster debugging (error is isolated)
- Prevents cascading failures
- Builds confidence in each change

### Check the Dependency Graph

**Before making architectural changes:**

```bash
nx graph  # Opens interactive graph
```

**Ask:**

- Will this change affect many projects?
- Are the dependencies correct?
- Is there a circular dependency?

### Understand Task Dependencies

**Know what depends on what:**

- Tests depend on builds → build errors block tests
- Builds depend on dependency builds → fix dependencies first
- Lint is independent → can run while building

**Use this to parallelize work:**

```bash
# Run lint while waiting for build
nx run core:lint &
nx run core:build
```

---

## Pre-Commit Checklist

Before committing changes, validate affected projects:

```bash
# 1. Build affected libraries
nx affected:build

# 2. Lint affected libraries
nx affected:lint

# 3. Test affected libraries
nx affected:test
```

Or run all checks with yarn scripts:

```bash
yarn test  # Runs tests for all libraries
yarn lint  # Lints all libraries
```

> **Commands:** See [commands.md](../internal/commands.md) for all pre-commit commands.

---

## Common Patterns

### Working on a Single Component

```bash
# 1. Start docs app to see changes live
yarn start

# 2. Open component tests in watch mode
nx run core:test --watch --testfile=button.component.spec.ts

# 3. Make changes, tests re-run automatically
# 4. Before committing, validate affected
nx affected:build
nx affected:lint
nx affected:test
```

### Working Across Multiple Libraries

```bash
# 1. Make changes in multiple libraries
# 2. Validate incrementally after each logical change
nx run core:build && nx run platform:build

# 3. Before committing, validate all affected
nx affected:build
nx affected:test
nx affected:lint
```

### After Dependency Updates

```bash
# 1. Clear cache (dependencies changed)
nx reset

# 2. Rebuild everything from scratch
nx run-many --target=build --all --skip-nx-cache

# 3. Run all tests
nx run-many --target=test --all
```

---

## Troubleshooting

### Cache Issues

**Problem:** Build seems stale or out of date.

**Solution:**

```bash
nx reset  # Clears NX cache
```

### Dependency Graph Issues

**Problem:** Imports aren't resolving or circular dependencies.

**Solution:**

```bash
nx graph  # Visualize dependencies
# Look for red lines (circular) or missing connections
```

### Build Order Issues

**Problem:** Build fails because dependency isn't built yet.

**Solution:**

```bash
# Build with dependencies first
nx run <library>:build --with-deps
```

### Lint Ordering Errors

**Problem:** ESLint complains about member ordering.

**Solution:**

- Check [CLAUDE.md](../../CLAUDE.md#landmines) for member ordering rules
- Order: decorated props → signal inputs/outputs → public → protected → private
- Protected **before** private, always

---

## Related Documentation

- [commands.md](../internal/commands.md) - Command reference
- [testing.md](../internal/testing.md) - Testing workflows
- [CLAUDE.md](../../CLAUDE.md) - Project overview and landmines
