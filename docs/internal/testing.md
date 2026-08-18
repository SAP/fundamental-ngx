# Testing Guide

Testing workflows and gotchas. For the full command list see [commands.md](commands.md#testing); for failures see [troubleshooting.md](troubleshooting.md#test-issues).

## Unit tests (Jest)

Run after changing component logic or structure, and before committing.

```bash
nx run core:test --testfile=button.component.spec.ts --watch   # while developing
nx run core:test                                               # whole library
nx affected:test                                               # validate branch
```

Watch mode: `p` filter by filename, `t` filter by test name, `u` update Jest snapshots, `q` quit.

## E2E tests (Playwright)

Run after visual/UI changes and before opening a PR.

```bash
npx playwright test                          # everything
npx playwright test --grep "core/dialog"     # one component
npx playwright test --debug --grep "name"    # step through
```

The harness starts automatically — `webServer` in `playwright.config.ts` serves it on :4400 and stops it afterwards. Outside CI `reuseExistingServer` is on, so you can keep `npx nx serve e2e-harness` running in another terminal to skip the rebuild each run; just make sure its watcher is alive, or you will test stale output.

## Visual baselines

Baselines live in `apps/e2e-harness/e2e/snapshots/` — `darwin/` locally, `linux/` in CI. Update `darwin/` and commit; CI regenerates `linux/`.

```bash
yarn e2e:update                          # all
yarn e2e:update --grep "core/shellbar"   # scoped — prefer this
```

Two rules that are easy to get wrong:

- **Use `yarn e2e:update`, not a hand-written `--update-snapshots`.** The bare flag means `=changed`, which rewrites a baseline only when the comparison _fails_ — a diff small enough to fit inside the tolerance is silently skipped. `yarn e2e:update` passes `=all`.
- **Set the screenshot tolerance in `playwright.config.ts` only** (`expect.toHaveScreenshot`). Never add a per-call `maxDiffPixelRatio`: a ratio scales with image size, so on a large mostly-white screenshot 1% is thousands of pixels — enough to hide a changed text label and, combined with the rule above, keep the baseline stale forever.

Review the regenerated PNGs before committing. If they look wrong, it is a regression — fix the code instead.
