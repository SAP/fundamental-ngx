# CI Log Analysis: Reducing Excessive Logging

## Problem

The "Run affected Build, Lint and test commands" step in `on-pull-request.yml` generates **120MB+ logs** (~991k lines) for a single workflow run. Analysis shows:

- **43,533** console log messages (log/warn/error)
- **86,964** deprecation warnings
- **339** task execution status messages

## Root Causes

### 1. Repeated Deprecation Warnings (Primary Issue)

**86,964 deprecation warnings** from i18n library's `resolveTranslationSync()` and `resolveTranslationSyncFn()` being logged during every test execution.

**Example pattern:**

```
console.warn
  [DEPRECATION] resolveTranslationSyncFn() is deprecated and will be removed in a future version.
  Use resolveTranslationSignalFn() instead for better performance.
  Migration: resolveTranslationSignalFn() returns a function that returns Signal<string>
  See: https://github.com/SAP/fundamental-ngx/blob/main/libs/i18n/MIGRATION.md
```

Each warning includes:

- 4-line message
- Full stack trace (8+ lines)
- Repeated across hundreds/thousands of test cases

**Impact:** ~70% of log volume

### 2. Verbose Test Output

Tests run with full console output, including:

- Stack traces for every deprecation warning
- Zone.js internal traces
- Detailed timing information
- Angular compilation logs

### 3. Nx Cloud Status Messages

While useful, Nx adds verbosity:

- Cache status for every task
- DTE (Distributed Task Execution) coordination messages
- Agent communication logs

## Recommended Solutions

### Immediate: Suppress Deprecation Warnings in Tests

**Option A: Environment Variable (Recommended)**

Add to test configuration in `project.json` files or globally in `nx.json`:

```json
{
    "targets": {
        "test": {
            "executor": "@nx/jest:jest",
            "options": {
                "setupFilesAfterEnv": ["<rootDir>/test-setup.ts"],
                "passWithNoTests": true
            }
        }
    }
}
```

In `test-setup.ts`:

```typescript
// Suppress deprecation warnings in CI
if (process.env.CI) {
    const originalWarn = console.warn;
    console.warn = (...args: any[]) => {
        const message = args[0]?.toString() || '';
        if (message.includes('[DEPRECATION]')) {
            return; // Suppress in CI
        }
        originalWarn.apply(console, args);
    };
}
```

**Option B: Jest Configuration**

In `jest.config.ts`:

```typescript
export default {
    // ... other config
    silent: process.env.CI === 'true', // Suppress all console output in CI
    // OR
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};
```

### Short-term: Reduce Nx Verbosity

In `on-pull-request.yml`, add to the parallel commands step:

```yaml
- name: Run Build, Lint and test commands
  uses: ./.github/actions/parallel-commands
  env:
      NX_VERBOSE_LOGGING: false
      NX_STREAM_OUTPUT: false # Aggregate output instead of streaming
  with:
      parallel-commands: |
          npx nx affected --target=build ... --output-style=static
          npx nx run-many --target=test ... --output-style=static
          npx nx affected --target=lint ... --output-style=static
```

The `--output-style=static` flag reduces real-time streaming logs.

### Medium-term: Fix Deprecations

The root issue is using deprecated i18n APIs in tests. Migration needed:

**Current (deprecated):**

```typescript
resolveTranslationSync(key, params);
resolveTranslationSyncFn(key);
```

**Target (signal-based):**

```typescript
resolveTranslationSignal(key, params); // Returns Signal<string>
resolveTranslationSignalFn(key); // Returns function that returns Signal<string>
```

Files to migrate:

- `libs/i18n/src/lib/utils/translation-tester.ts` (line 29, 37)
- All test files using `resolveTranslationSync*` APIs

### Long-term: GitHub Actions Output Grouping

GitHub Actions supports log grouping to collapse verbose sections:

```bash
echo "::group::Running Tests"
npx nx run-many --target=test ...
echo "::endgroup::"
```

This won't reduce log size but improves readability.

## Recommended Implementation Plan

1. **Immediate (< 1 hour):**

    - Add test setup file to suppress deprecation warnings in CI
    - Deploy to next PR to validate log reduction

2. **Next Sprint:**

    - Migrate `translation-tester.ts` to signal-based APIs
    - Add Nx output styling flags

3. **Future:**
    - Audit all test files for deprecated i18n usage
    - Implement log grouping for better visibility

## Expected Impact

| Change                        | Log Reduction            | Effort    |
| ----------------------------- | ------------------------ | --------- |
| Suppress deprecation warnings | ~70% (85MB)              | 30 min    |
| Nx output styling             | ~10-15% (12-18MB)        | 15 min    |
| Fix deprecation usage         | Prevents future warnings | 2-4 hours |

**Combined:** Logs should drop from **120MB to ~20-30MB** with immediate changes.

## Alternative: GitHub Actions Artifact Storage

If log size remains an issue, consider storing verbose logs as artifacts instead of streaming:

```yaml
- name: Run tests
  run: npx nx run-many --target=test ... > test-output.log 2>&1

- name: Upload test logs
  if: failure()
  uses: actions/upload-artifact@v4
  with:
      name: test-logs
      path: test-output.log
```

This keeps the GitHub Actions UI clean while preserving full logs for debugging.
