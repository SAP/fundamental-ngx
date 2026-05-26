# E2E / Integration Testing

## Common tasks

| I want to...                                                      | Go to                                                                |
| ----------------------------------------------------------------- | -------------------------------------------------------------------- |
| Run the tests for one component                                   | [1. Quick Start](#1-quick-start)                                     |
| Fix a CI failure on `verify-routes` (after rebase or new example) | [3.1 Regenerate routes](#31-regenerate-routes)                       |
| Add screenshot coverage for a new example                         | [3.2 Add a visual regression test](#32-add-a-visual-regression-test) |
| Add a keyboard / focus / ARIA test                                | [3.3 Add an interaction test](#33-add-an-interaction-test)           |
| Update a baseline because the component changed on purpose        | [3.6 Update visual baselines](#36-update-visual-baselines)           |
| Skip a flaky or non-deterministic example                         | [3.5 Skip a route from tests](#35-skip-a-route-from-tests)           |
| Look up a config file or script                                   | [6. Reference](#6-reference)                                         |

## Contents

- [1. Quick Start](#1-quick-start)
- [2. Architecture](#2-architecture)
- [3. Workflows](#3-workflows)
    - [3.1 Regenerate routes](#31-regenerate-routes)
    - [3.2 Add a visual regression test](#32-add-a-visual-regression-test)
    - [3.3 Add an interaction test](#33-add-an-interaction-test)
    - [3.4 Suppress an accessibility violation](#34-suppress-an-accessibility-violation)
    - [3.5 Skip a route from tests](#35-skip-a-route-from-tests)
    - [3.6 Update visual baselines](#36-update-visual-baselines)
- [4. CI Pipeline](#4-ci-pipeline)
- [5. Troubleshooting](#5-troubleshooting)
- [6. Reference](#6-reference)

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

# Run only interaction tests
npx playwright test specs/interaction/

# Run headed (see the browser)
npx playwright test --headed

# View HTML report after a run
npx playwright show-report
```

Yarn shortcuts that forward extra args to Playwright:

| Script            | What it does                                               |
| ----------------- | ---------------------------------------------------------- |
| `yarn e2e`        | Run the e2e suite                                          |
| `yarn e2e:update` | Run and regenerate baselines for whatever ran              |
| `yarn e2e:report` | Open the last HTML report (diffs, traces, screenshots)     |
| `yarn e2e:routes` | Regenerate `app.routes.generated.ts` and `e2e.routes.json` |

## 2. Architecture

The **e2e-harness** app (`apps/e2e-harness/`) is a minimal Angular shell that renders every library example component at its own route. A build-time script discovers all `*-example.component.ts` and `*-sample.ts` files across `libs/docs/`, extracts their class names, and generates lazy-loaded routes.

Routes follow the pattern `/<library>/<component>/<example>` (e.g., `/core/button/types`). Tests navigate to these routes and assert on visual output, accessibility, or interaction behavior.

```
apps/e2e-harness/
  scripts/generate-routes.ts        # Route generator (do not edit output by hand)
  src/app/app.routes.generated.ts   # GENERATED — Angular routes for the harness
  e2e/
    fixtures/
      base.fixture.ts               # goto(), getRoutes() helpers
      axe.fixture.ts                # axe-core a11y scanning
    config/
      e2e.routes.json               # GENERATED — route manifest read by Playwright
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

The two `GENERATED` files above are written by `scripts/generate-routes.ts`. Never hand-edit them — your edits will be overwritten on the next regeneration, and CI will fail.

## 3. Workflows

Each workflow follows the same shape: **When → Steps → Verify**.

### 3.1 Regenerate routes

**When:**

- You added a new example under `libs/docs/`.
- You rebased and the `verify-routes` CI job failed with `Generated routes are out of date`.
- You added or removed an entry from `e2e.skip.json`.

**Steps:**

```bash
yarn e2e:routes
git add apps/e2e-harness/src/app/app.routes.generated.ts apps/e2e-harness/e2e/config/e2e.routes.json
git commit -m "chore(e2e): regenerate routes"
```

**Verify:**

```bash
git diff --exit-code \
  apps/e2e-harness/src/app/app.routes.generated.ts \
  apps/e2e-harness/e2e/config/e2e.routes.json
```

Empty diff = success (matches what the `verify-routes` CI job runs).

### 3.2 Add a visual regression test

**When:** you added a new example component and want screenshot coverage. Visual tests are automatic — every route in `e2e.routes.json` gets one.

**Steps:**

1. Create the example in `libs/docs/<library>/<component>/examples/`.
2. Regenerate routes (see [3.1](#31-regenerate-routes)).
3. Generate baselines: `npx playwright test --update-snapshots --grep "<library>/<component>"`.
4. Commit the generated route files and the new baseline images under `snapshots/darwin/`.

**Verify:** `npx playwright test --grep "<library>/<component>"` passes locally.

### 3.3 Add an interaction test

**When:** keyboard navigation, focus, ARIA state, or other behavioral assertions need explicit coverage.

**Steps:**

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

### 3.4 Suppress an accessibility violation

**When:** an axe-core finding is known and tracked, and you want CI to stop flagging it on a specific route.

**Steps:** add an entry to `apps/e2e-harness/e2e/config/a11y-suppressions.json`:

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

**Verify:** `npx playwright test specs/a11y/ --grep "<library>/<component>"` passes. To remove the suppression later, delete the entry.

### 3.5 Skip a route from tests

**When:** a route can't be tested deterministically — compilation errors in the example, external image dependencies, animation timing, etc.

**Steps:** pick the right list and add an entry with a reason.

| Add to             | Effect                                                           |
| ------------------ | ---------------------------------------------------------------- |
| `e2e.skip.json`    | Route excluded from **all** tests (visual + a11y + interaction). |
| `visual-skip.json` | Route excluded from **visual** tests only. Still gets a11y.      |

```json
{
    "skipped": [
        {
            "route": "<library>/<component>/<example>",
            "reason": "Why this route can't be tested"
        }
    ]
}
```

After editing `e2e.skip.json`, regenerate routes (see [3.1](#31-regenerate-routes)) — the route count in `e2e.routes.json` changes.

**Verify:** the route no longer appears in test output for the relevant suite.

### 3.6 Update visual baselines

**When:** a visual test fails and the change is intentional (you styled the component, or it's new).

**One rule:** update Mac locally and commit. CI handles Linux.

**Steps:**

1. Run `yarn e2e:update --grep "<library>/<component>"` — regenerates `snapshots/darwin/...`.
2. Review the new PNGs. If they look wrong, the change is unintentional — go to **If unintentional** below.
3. Commit the updated `snapshots/darwin/` files and push.
4. CI sees the darwin changes, runs Playwright with `--update-snapshots` on Linux, and pushes a follow-up commit with `snapshots/linux/` to your branch.
5. `git pull` before your next push.

**If unintentional:** it's a regression. Don't update baselines.

1. `yarn e2e:report` — view diff PNGs (actual vs expected).
2. Fix the code.
3. Re-run `yarn e2e --grep "<library>/<component>"` until tests pass.

**Targeting one project:** five visual projects run by default (`chromium`, `compact`, `high-contrast`, `mobile`, `tablet`). Scope the update to keep diffs small:

```bash
yarn e2e:update --project high-contrast --grep "core/button"
```

**Verify:** `yarn e2e --grep "<library>/<component>"` passes locally (darwin baselines).

A pre-commit hook on macOS rejects staged `snapshots/linux/` files. Linux baselines are CI's job; if the hook fires, unstage them.

## 4. CI Pipeline

The workflow `.github/workflows/e2e-test.yml` runs five jobs:

| Job             | Purpose                                                                           | Failure mode                                                                                                   |
| --------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `detect-scope`  | Compute which shards to run from the PR's changed files.                          | Path filter regex broken — fix in workflow.                                                                    |
| `verify-routes` | Regenerate routes, fail if the committed output differs.                          | "Generated routes are out of date" → see [3.1](#31-regenerate-routes).                                         |
| `e2e`           | Sharded Playwright run (matrix from `detect-scope`). Visual + a11y + interaction. | Visual diff → see [3.6](#36-update-visual-baselines). Other failures → check the `playwright-report` artifact. |
| `report`        | Merge shard reports, attach a11y comment to the PR.                               | Rare. Re-run the job.                                                                                          |
| `e2e-status`    | Branch-protection gate. Aggregates `verify-routes` and `e2e` results.             | Fails if either upstream job failed.                                                                           |

**Triggers:** PRs changing `libs/core/**`, `libs/platform/**`, `libs/cdk/**`, `libs/btp/**`, `libs/cx/**`, `libs/i18n/**`, `libs/ui5-webcomponents/**`, `libs/ui5-webcomponents-fiori/**`, `libs/ui5-webcomponents-ai/**`, `libs/docs/**`, `apps/e2e-harness/**`, `playwright.config.ts`, or the workflow file itself.

**Sharding:** `detect-scope` selects shards based on changed paths.

| Shard      | Scope                                       |
| ---------- | ------------------------------------------- |
| `core-1`   | `libs/core/[a-e]*`, `libs/docs/core/[a-e]*` |
| `core-2`   | `libs/core/[f-o]*`, `libs/docs/core/[f-o]*` |
| `core-3`   | `libs/core/[p-z]*`, `libs/docs/core/[p-z]*` |
| `platform` | `libs/platform/`, `libs/docs/platform/`     |
| `other`    | `cdk`, `btp`, `cx`, `i18n`, `ui5-*`         |

If e2e infrastructure itself changed, all shards run.

**Auto-baseline-commit:** when a PR contains changes under `apps/e2e-harness/e2e/snapshots/darwin/`, the `e2e` job runs Playwright with `--update-snapshots` on Linux and commits the matching `snapshots/linux/` files back to the branch. Committing the darwin update **is** the signal — no labels, no commit markers.

**Artifacts on failure:**

- `playwright-report` — HTML report with screenshots and diffs.
- `blob-report-<shard>`, `test-results-<shard>` — per-shard JSON for merge reporting.
- `snapshot-diffs-<shard>` — actual/expected/diff PNGs for failed visual tests.

## 5. Troubleshooting

| Symptom                                                           | Cause                                                                            | Fix                                                                                                                                                                              |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `verify-routes` job fails with `Generated routes are out of date` | `app.routes.generated.ts` or `e2e.routes.json` is stale (rebase or new example). | Run [3.1 Regenerate routes](#31-regenerate-routes), commit, push.                                                                                                                |
| `Route not found` or component doesn't render                     | Generated routes don't include the new example.                                  | Run [3.1 Regenerate routes](#31-regenerate-routes).                                                                                                                              |
| New example component not picked up by the generator              | Filename doesn't match the discovery pattern.                                    | Rename to `*-example.component.ts` (core/platform) or `*-sample.ts` (UI5 WC).                                                                                                    |
| Component throws a DI error in the harness                        | Harness app config missing a provider.                                           | Add the provider to `apps/e2e-harness/src/app/app.config.ts`, or skip the route via [3.5](#35-skip-a-route-from-tests).                                                          |
| Visual test fails locally, passes in CI                           | Platform font rendering differs. Linux baselines are canonical.                  | Use `--update-snapshots` for local dev. Don't commit `snapshots/linux/` from a Mac.                                                                                              |
| Visual test flakes with 1px diffs                                 | Animation, timing, or external asset.                                            | Ensure `goto()` is used. Add `await expect(locator).toBeVisible()` before screenshot. Never `waitForTimeout`. If non-deterministic, skip via [3.5](#35-skip-a-route-from-tests). |
| `verify-routes` passes locally but fails in CI                    | Generator ran without prettier, or output wasn't committed.                      | Run `yarn e2e:routes` (handles both), commit, push.                                                                                                                              |

## 6. Reference

### Config files

| File                                                 | Edited by hand? | Purpose                                                      |
| ---------------------------------------------------- | --------------- | ------------------------------------------------------------ |
| `apps/e2e-harness/src/app/app.routes.generated.ts`   | No (generated)  | Angular routes for the harness app.                          |
| `apps/e2e-harness/e2e/config/e2e.routes.json`        | No (generated)  | Route manifest read by Playwright fixtures.                  |
| `apps/e2e-harness/e2e/config/e2e.skip.json`          | Yes             | Routes excluded from all tests. Edit then regenerate routes. |
| `apps/e2e-harness/e2e/config/visual-skip.json`       | Yes             | Routes excluded from visual tests only.                      |
| `apps/e2e-harness/e2e/config/a11y-suppressions.json` | Yes             | Per-route axe-core rule suppressions.                        |
| `apps/e2e-harness/src/app/app.config.ts`             | Yes             | Harness app providers (add missing DI tokens here).          |
| `playwright.config.ts`                               | Yes             | Projects, sharding, dev server, reporters.                   |
| `.github/workflows/e2e-test.yml`                     | Yes             | CI pipeline.                                                 |

### Scripts

| Command                                               | What it does                                                          |
| ----------------------------------------------------- | --------------------------------------------------------------------- |
| `yarn e2e:routes`                                     | Regenerate route files and format them. Use this — it's what CI runs. |
| `yarn e2e --grep "<library>/<component>"`             | Run tests for one component.                                          |
| `yarn e2e:update --grep "<library>/<component>"`      | Regenerate baselines for the matched tests.                           |
| `yarn e2e:report`                                     | Open the last HTML report.                                            |
| `npx tsx apps/e2e-harness/scripts/generate-routes.ts` | (Internal) The route generator that `yarn e2e:routes` wraps.          |
