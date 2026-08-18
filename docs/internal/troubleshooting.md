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

### Snapshot tests fail after OS upgrade

**Cause:** Font rendering differences between OS versions

**Fix:**

```bash
# Regenerate snapshots on the new OS
yarn e2e:update
```

### Visual snapshots fail unexpectedly

**Cause:** Pixel differences from style changes, animations, or rendering issues

**Fix:**

1. View diff: `npx playwright show-report`
2. If expected (you changed styles) → update snapshots (see below)
3. If unexpected → check font rendering, animation timing, browser version

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

### Snapshot update appears to do nothing

**Cause:** Bare `--update-snapshots` means `=changed`, which only rewrites a baseline when the comparison **fails**. If the difference fits inside the screenshot tolerance the test passes, so nothing is written and the stale baseline survives. Deleting the file works because that takes the "missing" path instead.

**Fix:**

```bash
yarn e2e:update
# or, scoped
npx playwright test --update-snapshots=all --grep "core/shellbar"
```

You do not need to start the e2e-harness first — Playwright's `webServer` config starts it for every run, updates included.

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
