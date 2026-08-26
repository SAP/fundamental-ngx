# E2E / Integration Testing

| I want to...                              | Go to                                                            |
| ----------------------------------------- | ---------------------------------------------------------------- |
| Run the tests for one component           | [Quick Start](#1-quick-start)                                    |
| Add a keyboard / focus / ARIA test        | [3.1 Add an interaction test](#31-add-an-interaction-test)       |
| Suppress an axe-core finding              | [3.2 Suppress an a11y violation](#32-suppress-an-a11y-violation) |
| Skip a flaky or non-deterministic example | [3.3 Skip a route from tests](#33-skip-a-route-from-tests)       |
| Look up a config file or script           | [Reference](#6-reference)                                        |

## 1. Quick Start

```bash
# First time only (downloads Chromium)
npx playwright install chromium

# Run all tests (starts dev server automatically)
npx playwright test

# Run tests for one component
npx playwright test --grep "core/button"

# Run headed (see the browser)
npx playwright test --headed

# View HTML report after a run
npx playwright show-report
```

| Script            | What it does                                    |
| ----------------- | ----------------------------------------------- |
| `yarn e2e`        | Run the e2e suite                               |
| `yarn e2e:report` | Open the last HTML report (traces, screenshots) |

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
      a11y-suppressions.json        # Known a11y violations, per route
    specs/
      a11y/                         # Accessibility sweep (axe-core)
      interaction/                  # Keyboard nav, focus, state change tests
playwright.config.ts                # Root config (projects, sharding, server)
```

## 3. Workflows

### 3.1 Add an interaction test

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

### 3.2 Suppress an a11y violation

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

### 3.3 Skip a route from tests

**When:** a route can't be tested deterministically — animation timing, external assets, DI errors, etc.

Add to `e2e.skip.json` to exclude from all tests (a11y + interaction):

```json
{
    "skipped": [{ "route": "<library>/<component>/<example>", "reason": "..." }]
}
```

**Verify:** the route no longer appears in test output.

## 4. CI Pipeline

| Job            | Purpose                                                  | Failure mode                                  |
| -------------- | -------------------------------------------------------- | --------------------------------------------- |
| `detect-scope` | Compute which shards to run from the PR's changed files. | Path filter regex broken — fix in workflow.   |
| `e2e`          | Sharded Playwright run. A11y + interaction.              | See `playwright-report` artifact for details. |
| `report`       | Merge shard reports, attach a11y comment to the PR.      | Rare. Re-run the job.                         |
| `e2e-status`   | Branch-protection gate.                                  | Fails if `e2e` failed or was cancelled.       |

**Sharding:**

| Shard      | Scope                               |
| ---------- | ----------------------------------- |
| `core-1`   | `libs/core/[a-e]*`                  |
| `core-2`   | `libs/core/[f-o]*`                  |
| `core-3`   | `libs/core/[p-z]*`                  |
| `platform` | `libs/platform/`                    |
| `other`    | `cdk`, `btp`, `cx`, `i18n`, `ui5-*` |

If e2e infrastructure changed, all shards run.

## 5. Troubleshooting

| Symptom                                       | Cause                                         | Fix                                                                                              |
| --------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `Route not found` or component doesn't render | New example not yet discovered.               | Routes regenerate automatically on the next run.                                                 |
| New example not picked up by the generator    | Filename doesn't match the discovery pattern. | Rename to `*-example.component.ts` (core/platform) or `*-sample.ts` (UI5 WC).                    |
| Component throws a DI error in the harness    | Harness app config missing a provider.        | Add to `apps/e2e-harness/src/app/app.config.ts`, or skip via [3.3](#33-skip-a-route-from-tests). |

## 6. Reference

| File                                                 | Edited by hand? | Purpose                                                         |
| ---------------------------------------------------- | --------------- | --------------------------------------------------------------- |
| `apps/e2e-harness/src/app/app.routes.generated.ts`   | No              | Angular routes. Gitignored — generated before build by NX.      |
| `apps/e2e-harness/e2e/config/e2e.routes.json`        | No              | Playwright route manifest. Gitignored — generated at test-time. |
| `apps/e2e-harness/e2e/config/e2e.skip.json`          | Yes             | Routes excluded from all tests.                                 |
| `apps/e2e-harness/e2e/config/a11y-suppressions.json` | Yes             | Per-route axe-core rule suppressions.                           |
| `apps/e2e-harness/src/app/app.config.ts`             | Yes             | Harness app providers.                                          |
| `playwright.config.ts`                               | Yes             | Projects, dev server, reporters.                                |
| `.github/workflows/e2e-test.yml`                     | Yes             | CI pipeline.                                                    |
