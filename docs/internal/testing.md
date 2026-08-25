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

Run after UI/behavioral changes and before opening a PR.

```bash
npx playwright test                          # everything
npx playwright test --grep "core/dialog"     # one component
npx playwright test --debug --grep "name"    # step through
```

The harness starts automatically — `webServer` in `playwright.config.ts` serves it on :4400 and stops it afterwards. Outside CI `reuseExistingServer` is on, so you can keep `npx nx serve e2e-harness` running in another terminal to skip the rebuild each run; just make sure its watcher is alive, or you will test stale output.
