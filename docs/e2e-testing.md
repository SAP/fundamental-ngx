# E2E / Integration Testing

## 1. Quick Start

```bash
# First time only (downloads Chromium)
npx playwright install chromium

# Run all tests (starts dev server automatically)
npx playwright test

# Run tests for one component
npx playwright test --grep "core/button"

# Run only one project (faster iteration)
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

## 4. Updating Baselines

Update baselines when you intentionally changed a component's appearance:

```bash
npx playwright test --update-snapshots
```

| Situation         | What happens                                              |
| ----------------- | --------------------------------------------------------- |
| Local dev (macOS) | Updates `snapshots/darwin/` baselines                     |
| CI (Linux)        | Auto-commits missing Linux baselines to your PR branch    |
| Visual diff in PR | Download the `playwright-report` artifact to review diffs |

Only commit baselines for your platform. CI generates Linux baselines automatically on first run.

## 5. Troubleshooting

| Problem                                       | Fix                                                                                                                                                                             |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Test fails locally, passes in CI              | Platform font rendering differs. Only Linux baselines are canonical. Use `--update-snapshots` for local dev.                                                                    |
| "Route not found" or component doesn't render | Regenerate routes: `npx tsx apps/e2e-harness/scripts/generate-routes.ts`                                                                                                        |
| Component throws DI error                     | Add missing provider to `apps/e2e-harness/src/app/app.config.ts`, or add to `e2e.skip.json`                                                                                     |
| Flaky visual test (1px diffs)                 | Ensure `goto()` is used (disables animations). If still flaky, add `page.locator('.fd-specific-element').waitFor()` before screenshot. Last resort: `page.waitForTimeout(300)`. |
| New component not picked up                   | Ensure filename matches `*-example.component.ts` (core/platform) or `*-sample.ts` (UI5 WC)                                                                                      |

## 6. CI Behavior

**Triggers:** PRs changing `libs/core/**`, `libs/platform/**`, `libs/cdk/**`, `libs/btp/**`, `libs/cx/**`, `libs/i18n/**`, `libs/ui5-webcomponents*/**`, `libs/docs/**`, `apps/e2e-harness/**`, or `playwright.config.ts`.

**Sharding:** CI detects which libraries changed and runs only affected shards:

| Shard      | Scope                                   |
| ---------- | --------------------------------------- |
| `core`     | `libs/core/`, `libs/docs/core/`         |
| `platform` | `libs/platform/`, `libs/docs/platform/` |
| `other`    | `cdk`, `btp`, `cx`, `i18n`, `ui5-*`     |

If e2e infrastructure itself changed, all shards run.

**On failure:**

- `playwright-report` artifact uploaded (HTML report with screenshots and diffs)
- JSON test results per shard for merge reporting
- Route staleness check fails fast if generated routes are out of date

**Affected-only:** CI compares `git diff` between base and head to select shards. Fallback: run all if no specific library matched.
