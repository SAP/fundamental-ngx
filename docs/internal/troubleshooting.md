# Troubleshooting

**Purpose:** Common issues encountered during development and their solutions. If you hit a problem, check here first before debugging.

---

## Build Issues

### "Module not found" after pulling latest

**Cause:** Dependencies changed or node_modules out of sync

**Fix:**

```bash
yarn install
nx reset
```

### NX cache returning stale builds

**Cause:** NX cache not invalidated after changes

**Fix:**

```bash
nx reset
nx run <project>:build
```

### Build fails with "Heap out of memory"

**Cause:** Node.js default memory limit too low

**Fix:**

```bash
export NODE_OPTIONS="--max-old-space-size=4096"
nx run <project>:build
```

---

## Test Issues

### Tests pass locally but fail in CI

**Cause:** Environment differences (timezone, locale, browser version)

**Fix:**

- Check Playwright version matches CI
- Run tests with CI environment variables:
    ```bash
    CI=true npx playwright test
    ```
- Download HTML report from CI artifacts and compare screenshots

### Flaky tests (pass/fail intermittently)

**Cause:** Race conditions, animation timing, missing await

**Fix:**

1. Reproduce: `npx playwright test --repeat-each=10 --grep "test-name"`
2. Add proper waits: `waitForSelector` with `state: 'visible'`
3. Mock external dependencies (APIs, timers)

### Test hangs or times out

**Cause:** Waiting for element that never appears, infinite loop, server not running

**Fix:**

1. Debug: `npx playwright test --debug --grep "test-name"`
2. Check selector matches actual DOM
3. Verify e2e-harness is running (for E2E tests)

### Jest snapshots fail after code changes

**Cause:** Component output changed

**Fix:**

- If intentional: `nx run <lib>:test --updateSnapshot`
- If unintentional: fix code and re-run tests

---

## Lint / Format Issues

### ESLint errors after merge

**Cause:** ESLint rules changed or new files don't match formatting

**Fix:**

```bash
yarn format
nx affected:lint --fix
```

### "member-ordering" lint errors

**Cause:** Class members not in correct order (decorated props → signal inputs/outputs → public → protected → private)

**Fix:** Reorder members manually or run:

```bash
nx run <project>:lint --fix
```

---

## Git Issues

### Merge conflicts in package.json

**Cause:** Conflicting dependency updates

**Fix:**

```bash
# Accept incoming changes
git checkout --theirs package.json yarn.lock
yarn install
```

### Accidentally committed to main

**Cause:** Forgot to create a feature branch

**Fix:**

```bash
# Move commits to a new branch
git branch feature/my-fix
git reset --hard origin/main
git checkout feature/my-fix
```

---

## Yarn / Dependency Issues

### "Workspace not found" errors

**Cause:** Yarn 4 workspace resolution issue

**Fix:**

```bash
yarn install --check-cache
```

### Dependency resolution conflicts

**Cause:** Peer dependency mismatch

**Fix:**

```bash
# Check peer dependencies
yarn npm info <package>

# Force resolution (last resort)
# Add to package.json:
{
  "resolutions": {
    "<package>": "<version>"
  }
}
```
