# E2E / Integration Testing

| I want to...                                               | Go to                                                                |
| ---------------------------------------------------------- | -------------------------------------------------------------------- |
| Run the tests for one component                            | [Quick Start](#1-quick-start)                                        |
| Add screenshot coverage for a new example                  | [3.1 Add a visual regression test](#31-add-a-visual-regression-test) |
| Add a keyboard / focus / ARIA test                         | [3.2 Add an interaction test](#32-add-an-interaction-test)           |
| Update a baseline because the component changed on purpose | [3.5 Update visual baselines](#35-update-visual-baselines)           |
| Skip a flaky or non-deterministic example                  | [3.4 Skip a route from tests](#34-skip-a-route-from-tests)           |
| Look up a config file or script                            | [Reference](#6-reference)                                            |

## 1. Quick Start

```bash
# First time only (downloads Chromium)
npx playwright install chromium

# Run all tests (starts dev server automatically)
npx playwright test

# Run tests for one component
npx playwright test --grep "core/button"

# Run only one project (default — skips compact/HC/responsive visuals)
npx playwright test --project chromium

# Run headed (see the browser)
npx playwright test --headed

# View HTML report after a run
npx playwright show-report
```

| Script            | What it does                                           |
| ----------------- | ------------------------------------------------------ |
| `yarn e2e`        | Run the e2e suite                                      |
| `yarn e2e:update` | Run and regenerate baselines for whatever ran          |
| `yarn e2e:report` | Open the last HTML report (diffs, traces, screenshots) |

## 2. Architecture

The **e2e-harness** app is a minimal Angular shell that renders every library example component at its own route. A script discovers all `*-example.component.ts` and `*-sample.ts` files across `libs/docs/`, and generates lazy-loaded routes. Routes follow the pattern `/<library>/<component>/<example>` (e.g., `/core/button/types`).

```
apps/e2e-harness/
  scripts/generate-routes.ts        # Route generator — runs automatically, never hand-edit output
  src/app/app.routes.generated.ts   # GENERATED + gitignored — Angular routes for the harness
  e2e/
    global-setup.ts                 # Runs generate-routes.ts before every Playwright session
    fixtures/
      base.fixture.ts               # goto(), getRoutes() helpers
      axe.fixture.ts                # axe-core a11y scanning
    config/
      e2e.routes.json               # GENERATED + gitignored — route manifest read by Playwright
      e2e.skip.json                 # Routes excluded from ALL tests
      visual-skip.json              # Routes excluded from VISUAL tests only
      a11y-suppressions.json        # Known a11y violations, per route
    specs/
      visual/                       # Screenshot comparison tests
      a11y/                         # Accessibility sweep (axe-core)
      interaction/                  # Keyboard nav, focus, state change tests
    snapshots/                      # Baseline images (per platform)
playwright.config.ts                # Root config (projects, sharding, server)
```

## 3. Workflows

### 3.1 Add a visual regression test

**When:** you added a new example component. Visual tests are automatic — every discovered route gets one. Routes regenerate at the start of every Playwright run; nothing needs to be committed.

1. Create the example in `libs/docs/<library>/<component>/examples/`.
2. Generate baselines: `npx playwright test --update-snapshots --grep "<library>/<component>"`.
3. Commit the new baseline images under `snapshots/darwin/`.

**Verify:** `npx playwright test --grep "<library>/<component>"` passes locally.

### 3.2 Add an interaction test

**When:** keyboard navigation, focus, ARIA state, or other behavioral assertions need explicit coverage.

1. Create `apps/e2e-harness/e2e/specs/interaction/<component>.spec.ts`.
2. Import the base fixture and use `goto()` — it disables CSS animations and waits for render.
3. Assert on focus, state, and ARIA attributes.

```typescript
import { expect, test } from '../../fixtures/base.fixture';

test.describe('core/combobox', () => {
    test('selects option with keyboard', async ({ page, goto }) => {
        await goto('core/combobox/combobox');
        const input = page.getByRole('combobox').first();
        await input.click();
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        await expect(input).toHaveValue(/.+/);
    });
});
```

Never use `waitForTimeout` — auto-retrying assertions (`toHaveAttribute`, `toBeFocused`) handle timing.

**Verify:** `npx playwright test specs/interaction/<component>.spec.ts` passes.

### 3.3 Suppress an accessibility violation

**When:** an axe-core finding is known and tracked, and you want CI to stop flagging it.

Add an entry to `apps/e2e-harness/e2e/config/a11y-suppressions.json`:

```json
{
    "routes": {
        "core/my-component/example": {
            "suppress": ["color-contrast"],
            "reason": "Tracked in JIRA-1234"
        }
    }
}
```

**Verify:** `npx playwright test specs/a11y/ --grep "<library>/<component>"` passes.

### 3.4 Skip a route from tests

**When:** a route can't be tested deterministically — animation timing, external assets, DI errors, etc.

| Add to             | Effect                                                           |
| ------------------ | ---------------------------------------------------------------- |
| `e2e.skip.json`    | Route excluded from **all** tests (visual + a11y + interaction). |
| `visual-skip.json` | Route excluded from **visual** tests only. Still gets a11y.      |

```json
{
    "skipped": [{ "route": "<library>/<component>/<example>", "reason": "..." }]
}
```

**Verify:** the route no longer appears in test output for the relevant suite.

### 3.5 Update visual baselines

**When:** a visual test fails and the change is intentional.

**One rule:** update Mac locally and commit. CI handles Linux.

1. Run `yarn e2e:update --grep "<library>/<component>"` — regenerates `snapshots/darwin/`.
2. Review the new PNGs. If they look wrong, it's a regression — don't update.
3. Commit `snapshots/darwin/` and push.
4. CI runs `--update-snapshots` on Linux and commits `snapshots/linux/` back to your branch.
5. `git pull` before your next push.

Scope updates to keep diffs small: `yarn e2e:update --project high-contrast --grep "core/button"`

A pre-commit hook on macOS rejects staged `snapshots/linux/` files — unstage them if it fires.

**If unintentional:** `yarn e2e:report` → view diffs → fix the code → re-run until passing.

## 4. CI Pipeline

| Job            | Purpose                                                  | Failure mode                                                                            |
| -------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `detect-scope` | Compute which shards to run from the PR's changed files. | Path filter regex broken — fix in workflow.                                             |
| `e2e`          | Sharded Playwright run. Visual + a11y + interaction.     | Visual diff → [3.5](#35-update-visual-baselines). Other → `playwright-report` artifact. |
| `report`       | Merge shard reports, attach a11y comment to the PR.      | Rare. Re-run the job.                                                                   |
| `e2e-status`   | Branch-protection gate.                                  | Fails if `e2e` failed or was cancelled.                                                 |

**Sharding:**

| Shard      | Scope                               |
| ---------- | ----------------------------------- |
| `core-1`   | `libs/core/[a-e]*`                  |
| `core-2`   | `libs/core/[f-o]*`                  |
| `core-3`   | `libs/core/[p-z]*`                  |
| `platform` | `libs/platform/`                    |
| `other`    | `cdk`, `btp`, `cx`, `i18n`, `ui5-*` |

If e2e infrastructure changed, all shards run.

**Auto-baseline-commit:** committing `snapshots/darwin/` changes is the signal — CI runs `--update-snapshots` on Linux and pushes `snapshots/linux/` back to your branch automatically.

## 5. Troubleshooting

| Symptom                                       | Cause                                                           | Fix                                                                                                                                          |
| --------------------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `Route not found` or component doesn't render | New example not yet discovered.                                 | Routes regenerate automatically on the next run.                                                                                             |
| New example not picked up by the generator    | Filename doesn't match the discovery pattern.                   | Rename to `*-example.component.ts` (core/platform) or `*-sample.ts` (UI5 WC).                                                                |
| Component throws a DI error in the harness    | Harness app config missing a provider.                          | Add to `apps/e2e-harness/src/app/app.config.ts`, or skip via [3.4](#34-skip-a-route-from-tests).                                             |
| Visual test fails locally, passes in CI       | Platform font rendering differs. Linux baselines are canonical. | Use `--update-snapshots` locally. Don't commit `snapshots/linux/` from a Mac.                                                                |
| Visual test flakes with 1px diffs             | Animation, timing, or external asset.                           | Use `goto()`. Add `await expect(locator).toBeVisible()` before screenshot. Skip via [3.4](#34-skip-a-route-from-tests) if non-deterministic. |

## 6. Reference

| File                                                 | Edited by hand? | Purpose                                                         |
| ---------------------------------------------------- | --------------- | --------------------------------------------------------------- |
| `apps/e2e-harness/src/app/app.routes.generated.ts`   | No              | Angular routes. Gitignored — generated before build by NX.      |
| `apps/e2e-harness/e2e/config/e2e.routes.json`        | No              | Playwright route manifest. Gitignored — generated at test-time. |
| `apps/e2e-harness/e2e/config/e2e.skip.json`          | Yes             | Routes excluded from all tests.                                 |
| `apps/e2e-harness/e2e/config/visual-skip.json`       | Yes             | Routes excluded from visual tests only.                         |
| `apps/e2e-harness/e2e/config/a11y-suppressions.json` | Yes             | Per-route axe-core rule suppressions.                           |
| `apps/e2e-harness/src/app/app.config.ts`             | Yes             | Harness app providers.                                          |
| `playwright.config.ts`                               | Yes             | Projects, sharding, dev server, reporters.                      |
| `.github/workflows/e2e-test.yml`                     | Yes             | CI pipeline.                                                    |
