# E2E / Integration Testing

## 1. Quick Start

```bash
# First time only (downloads Chromium)
npx playwright install chromium

# Run all tests (starts dev server automatically)
npx playwright test

# Run tests for one component
npx playwright test --grep "core/button"

# Run only one project (default project — skips compact/HC/responsive visuals)
npx playwright test --project chromium

# Run only interaction tests
npx playwright test specs/interaction/

# Run headed (see the browser)
npx playwright test --headed

# View HTML report after a run
npx playwright show-report
```

## 2. Architecture

The **e2e-harness** app (`apps/e2e-harness/`) is a minimal Angular shell that renders every library example component at its own route. A build-time script discovers all `*-example.component.ts` and `*-sample.ts` files across `libs/docs/`, extracts their class names, and generates lazy-loaded routes.

Routes follow the pattern `/<library>/<component>/<example>` (e.g., `/core/button/types`). Tests navigate to these routes and assert on visual output, accessibility, or interaction behavior.

```
apps/e2e-harness/
  scripts/generate-routes.ts        # Route generation (run if routes are stale)
  src/app/app.routes.generated.ts   # AUTO-GENERATED routes
  e2e/
    fixtures/
      base.fixture.ts               # goto(), getRoutes() helpers
      axe.fixture.ts                # axe-core a11y scanning
    config/
      e2e.routes.json               # Route manifest (generated)
      e2e.skip.json                 # Components excluded from all tests
      visual-skip.json              # Components excluded from visual tests only
      a11y-suppressions.json        # Known a11y violations
    specs/
      visual/                       # Screenshot comparison tests
      a11y/                         # Accessibility sweep (axe-core)
      interaction/                  # Keyboard nav, focus, state change tests
    snapshots/                      # Baseline images (per platform)
playwright.config.ts                # Root config (projects, sharding, server)
```

## 3. Writing Tests

### Adding a visual regression test

Visual tests are automatic. Every route in `e2e.routes.json` gets a screenshot test. To add coverage for a new component:

1. Create the example component in `libs/docs/<library>/<component>/examples/`
2. Run `npx tsx apps/e2e-harness/scripts/generate-routes.ts`
3. Run `npx playwright test --update-snapshots --grep "<library>/<component>"`
4. Commit the generated route files and new baseline images

### Adding an interaction test

1. Create a new file in `apps/e2e-harness/e2e/specs/interaction/<component>.spec.ts`
2. Import the base fixture
3. Navigate using `goto()` (handles animation disabling and waits)
4. Assert on focus, state, and ARIA attributes

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

Always use `goto()` from the base fixture — it waits for the component to render and disables CSS animations.

### Adding an accessibility test

All routes are scanned automatically by `specs/a11y/accessibility.spec.ts`. No action needed for new components.

**To suppress a known violation**, add an entry to `e2e/config/a11y-suppressions.json`:

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

**To remove a suppression**, delete the entry from the JSON file.

## 4. Updating Visual Baselines

Visual tests compare your component against PNG baselines. When a test fails, the question is always the same: **was the change intentional?**

### One rule

> Update Mac locally and commit. CI handles Linux.

### Decision tree

A visual test failed. Pick one:

**The change is intentional (you styled the component, or it's new):**

1. `yarn e2e:update --grep "<library>/<component>"` — regenerates `snapshots/darwin/...`
2. Review the new PNGs. They look right? Good.
3. Commit the updated `snapshots/darwin/` files and push.
4. CI sees the darwin changes in the PR diff, runs Playwright with `--update-snapshots` on Linux, and pushes a follow-up commit with the matching `snapshots/linux/` files to your branch.
5. `git pull` before your next push.

**The change is unintentional (you didn't expect a visual diff):**

It's a regression. Don't update baselines.

1. `yarn e2e:report` to view the diff. Look at the actual vs expected PNGs.
2. Fix the code.
3. Re-run `yarn e2e --grep "<library>/<component>"`. Tests pass → you're done.

### How CI knows to regenerate Linux

Whenever a PR contains changes under `apps/e2e-harness/e2e/snapshots/darwin/`, CI runs Playwright with `--update-snapshots` and commits the matching Linux baselines back to your branch. No labels, no commit markers — committing the darwin update **is** the signal.

This means:

- ✅ Updating darwin → CI updates linux. Always.
- ✅ Re-runs are safe: regenerating an already-correct linux baseline is a no-op.
- ❌ Editing only `snapshots/linux/` from a Mac won't trigger anything useful — and you shouldn't do it anyway (see Don'ts).

### Yarn scripts

| Script            | What it does                                           |
| ----------------- | ------------------------------------------------------ |
| `yarn e2e`        | Run the e2e suite                                      |
| `yarn e2e:update` | Run and regenerate baselines for whatever ran          |
| `yarn e2e:report` | Open the last HTML report (diffs, traces, screenshots) |

All three forward extra args to Playwright, so you can scope them: `yarn e2e:update --grep "core/button"`, `yarn e2e --project high-contrast`, etc.

### Targeting one project

Five visual projects run by default: `chromium`, `compact`, `high-contrast`, `mobile`, `tablet`. If you only changed something specific to one (e.g. an HC theme override), scope the update to keep the diff small:

```bash
yarn e2e:update --project high-contrast --grep "core/button"
```

### Don'ts

- **Don't run `yarn e2e:update` to silence a failure you don't understand.** Open the report first.

> **Note:** A pre-commit hook on macOS rejects staged `snapshots/linux/` files. Linux baselines are CI's job; if the hook fires, unstage them.

## 5. Troubleshooting

| Problem                                       | Fix                                                                                                                                                          |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Test fails locally, passes in CI              | Platform font rendering differs. Only Linux baselines are canonical. Use `--update-snapshots` for local dev.                                                 |
| "Route not found" or component doesn't render | Regenerate routes: `npx tsx apps/e2e-harness/scripts/generate-routes.ts`                                                                                     |
| Component throws DI error                     | Add missing provider to `apps/e2e-harness/src/app/app.config.ts`, or add to `e2e.skip.json`                                                                  |
| Flaky visual test (1px diffs)                 | Ensure `goto()` is used (disables animations). If still flaky, add `await expect(locator).toBeVisible()` before the screenshot — never use `waitForTimeout`. |
| New component not picked up                   | Ensure filename matches `*-example.component.ts` (core/platform) or `*-sample.ts` (UI5 WC)                                                                   |

## 6. CI Behavior

**Triggers:** PRs changing `libs/core/**`, `libs/platform/**`, `libs/cdk/**`, `libs/btp/**`, `libs/cx/**`, `libs/i18n/**`, `libs/ui5-webcomponents/**`, `libs/ui5-webcomponents-fiori/**`, `libs/ui5-webcomponents-ai/**`, `libs/docs/**`, `apps/e2e-harness/**`, `playwright.config.ts`, or the workflow file itself (`.github/workflows/e2e-test.yml`).

**Sharding:** CI detects which libraries changed and runs only affected shards:

| Shard      | Scope                                       |
| ---------- | ------------------------------------------- |
| `core-1`   | `libs/core/[a-e]*`, `libs/docs/core/[a-e]*` |
| `core-2`   | `libs/core/[f-o]*`, `libs/docs/core/[f-o]*` |
| `core-3`   | `libs/core/[p-z]*`, `libs/docs/core/[p-z]*` |
| `platform` | `libs/platform/`, `libs/docs/platform/`     |
| `other`    | `cdk`, `btp`, `cx`, `i18n`, `ui5-*`         |

If e2e infrastructure itself changed, all shards run.

**On failure:**

- `playwright-report` artifact uploaded (HTML report with screenshots and diffs)
- JSON test results per shard for merge reporting
- Route staleness check fails fast if generated routes are out of date

**Affected-only:** CI compares `git diff` between base and head to select shards. Fallback: run all if no specific library matched.
