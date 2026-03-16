---
name: preflight
description: Run local quality gates before creating a PR
argument-hint: [library]
disable-model-invocation: true
---

# Preflight Check

Run all local quality gates for the affected library. If no argument provided, detect the library from changed files via `git diff --name-only`.

## Steps

### 1. Identify scope

```bash
# If $ARGUMENTS provided, use it. Otherwise detect from changed files:
git diff --name-only HEAD~1
```

Map changed file paths to library names (`libs/core/` → `core`, `libs/platform/` → `platform`, etc.).

### 2. Build

```bash
nx run <library>:build
```

Report: PASS or FAIL with error summary.

### 3. Lint

```bash
nx run <library>:lint
```

Report: PASS or FAIL with violation count and top issues.

### 4. Unit tests

```bash
nx run <library>:test --skip-nx-cache
```

Report: PASS or FAIL with failing test names and error messages.

### 5. Export check

For each changed component file, verify it is exported from the library's `public_api.ts` or `index.ts`. Flag any new public classes missing from exports.

### 6. Breaking change check

Run `git diff` on changed files. Flag:

- Removed `input()`, `output()`, or `model()` declarations
- Renamed exported classes, functions, or types
- Changed input/output names
- Changed default values

If breaking changes found, verify the commit message contains `BREAKING CHANGE:` footer.

## Output

```
## Preflight Report

| Gate              | Status | Details          |
|-------------------|--------|------------------|
| Build             | PASS   |                  |
| Lint              | FAIL   | 3 violations     |
| Unit Tests        | PASS   | 42 tests passed  |
| Exports           | PASS   |                  |
| Breaking Changes  | WARN   | 1 input removed  |

### Failures
[details for each failed gate]

### Action Required
[what needs fixing before PR]
```
