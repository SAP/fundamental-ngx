---
alwaysApply: true
---

# Commit & PR Format

## Commit Message

```
<type>(<scope>): <subject>

[body]

[BREAKING CHANGE: description]
```

**Types:** `feat` | `fix` | `docs` | `style` | `refactor` | `test` | `build` | `ci` | `chore`

**Scopes:** `core` | `platform` | `cdk` | `btp` | `cx` | `i18n` | `datetime-adapter` | `ui5` | `docs` | `e2e` | `ci`

**Breaking changes:** add `!` after scope and include `BREAKING CHANGE:` footer:

```
fix(core)!: remove deprecated API

BREAKING CHANGE: DestroyedService removed. Use DestroyRef + takeUntilDestroyed().
```

## PR Title

Same format as commit: `<type>(<scope>): <subject>`

- `WIP` prefix means the PR will NOT be merged.
- Use `feat` or `fix` to trigger a version bump.
