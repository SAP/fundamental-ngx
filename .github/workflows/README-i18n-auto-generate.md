# i18n Auto-Generate Workflow

Automatically generates TypeScript files when `.properties` files are modified in pull requests.

## How It Works

1. Triggers on PRs modifying `libs/i18n/src/lib/translations/*.properties`
2. Runs `yarn nx run i18n:transform-translations`
3. Commits generated `.ts` files back to PR as `fundamental-bot`
4. Posts PR comment notifying about auto-generation

## Security

**Allowed:**

- Same-repo PRs (maintainers)
- `service-tip-git` fork (SAP translation bot) - with validation

**Blocked:**

- All other forks

**Fork PR Validation (3 layers):**

1. **Path validation** - Only `.properties` files in `libs/i18n/src/lib/translations/` (no subdirectories)
2. **Size validation** - Max 500KB per file (current files: 65-86KB)
3. **Syntax validation** - Valid `.properties` format via `i18n-manage --command=validate`

**Token Usage:**

Uses `GHACTIONS` token (not `GITHUB_TOKEN`) because the default token cannot push to fork branches. Required for committing generated files back to `service-tip-git` PRs.

## Testing

**Automated Test:**
Actions → "Test i18n Auto-Generate (Manual)" → Run workflow

**Real PR Test:**

```bash
# Modify a .properties file and create PR
git checkout -b test/i18n-auto-gen
# Edit libs/i18n/src/lib/translations/translations_en_US.properties
git commit -am "test: modify properties"
git push
```

Verify workflow runs and commits `.ts` files.

## Troubleshooting

**Workflow doesn't trigger:**

- Check file path matches `libs/i18n/src/lib/translations/*.properties`

**Generation fails:**

- Check workflow logs
- Run `nx run i18n:i18n-manage --command=validate` locally

## Related

- [i18n-manage CLI](../../libs/nx-plugin/src/executors/i18n-manage/README.md)
- [transform-translations executor](../../libs/nx-plugin/src/executors/transform-translations/)
