# Translation Management (i18n)

- [i18n-manage CLI Reference](https://github.com/SAP/fundamental-ngx/blob/main/libs/nx-plugin/src/executors/i18n-manage/README.md)
- [i18n Package README](https://github.com/SAP/fundamental-ngx/blob/main/libs/i18n/README.md)

---

## Files You Should/Shouldn't Edit

### ✅ Automatically Managed by CLI

- `libs/i18n/src/lib/models/fd-language.ts` — Auto-updated by `add` command only; `remove` does **not** touch this file (manual cleanup required)
- `libs/i18n/src/lib/translations/translations.properties` — Base English translations (modified by `add`, `update`, `rename`, `remove` commands)

### ⚠️ Managed Externally

- `libs/i18n/src/lib/translations/translations_*.properties` — Language-specific translations (managed by external translation team)

### ❌ Never Edit (Auto-Generated)

- `libs/i18n/src/lib/models/fd-language-key-identifier.ts`
- `libs/i18n/src/lib/translations/translations.ts`
- `libs/i18n/src/lib/translations/translations_*.ts`

---

## Adding a New Translation

**When:** You need to add a new translatable string to a component.

```bash
nx run i18n:i18n-manage --command=add \
  --key=coreButton.yourNewKey \
  --value="Your English Text" \
  --comment="Description for translators"  # optional; auto-generated if omitted
```

**What happens:**

- Automatically updates `fd-language.ts` interface with the new key and JSDoc comment
- Adds the key to `translations.properties` with SAP UI5 comment
- Regenerates TypeScript files for every language

**Required parameters:**

- `--key` — Key name in format `component.keyName` (e.g., `coreButton.submit`)
- `--value` — English text for the key

**Optional parameters:**

- `--comment` — Description for translators (auto-generated if omitted)
- `--commentType` — Override auto-detected SAP UI5 comment type (auto-detected if omitted)

Run `nx run i18n:i18n-manage --command=validate` to verify. ✅ Done!

### Adding a Key with Parameters

For dynamic values (e.g., `"Hello, {name}"`), the CLI creates a plain `FdLanguageKey;` — you must add the generic type manually afterward:

1. Run `add` as normal:

```bash
nx run i18n:i18n-manage --command=add --key=coreGreeting.hello --value="Hello, {name}"
```

2. Edit `fd-language.ts` to add the generic type:

```typescript
coreGreeting: {
    /** Greeting message with user name */
    hello: FdLanguageKey<{ name: string }>;
}
```

3. Use in your component:

```typescript
this.translationService.instant('coreGreeting.hello', { name: 'John' });
```

---

## Updating an Existing Translation

**When:** You need to change the text of an existing translation key.

```bash
nx run i18n:i18n-manage --command=update --key=coreButton.submit --value="Submit Changes"
```

Updates the English text; other languages keep their current translations until the external team reviews.

---

## Renaming a Translation Key

**When:** You need to change the name of a translation key (refactoring).

```bash
nx run i18n:i18n-manage --command=rename --key=coreButton.oldName --newKey=coreButton.newName
```

Renames the key in `translations.properties` and regenerates all TypeScript files. Language-specific `.properties` files are **not modified** (managed by external translation team). Update your component code to use the new key name.

---

## Removing a Translation Key

**When:** A translation key is no longer used.

**Before removing:** Search your codebase to ensure the key is not used:

```bash
grep -r "obsoleteKey" libs/ apps/
```

```bash
nx run i18n:i18n-manage --command=remove --key=coreButton.obsoleteKey
```

Removes the key from `translations.properties` and regenerates all TypeScript files. Language-specific `.properties` files are not modified (cleaned up by external translation team).

⚠️ **`fd-language.ts` is not updated automatically.** Manually delete the key:

```typescript
coreButton: {
    // ❌ delete this line: obsoleteKey: FdLanguageKey;
}
```

---

## Searching for a Translation

**When:** You need to find a translation key by name or text.

```bash
# Search by key name or value (case-insensitive)
nx run i18n:i18n-manage --command=search --searchTerm=submit
```

**Output:** All matching keys with their values across all languages.

---

## Auto-Correcting Translation Files

**When:** Translation files have formatting issues (missing comments, whitespace, unsorted keys).

```bash
# Auto-correct the base English translation file
nx run i18n:i18n-manage --command=correct --baseLangOnly
```

Adds missing SAP UI5 comments, fixes formatting, and sorts keys alphabetically. This runs automatically in CI when validation fails on fork PRs.

---

## Troubleshooting

### Error: "Key already exists"

**Cause:** The key you're trying to add is already in the translation files.

**Fix:** Use `--command=update` instead of `--command=add`, or choose a different key name.

---

### Error: "Invalid key format" (multi-dot keys)

**Cause:** You used a key like `component.sub.key` instead of `component.key`.

**Fix:** Keys must have exactly one dot. Use flat names under each component:

```bash
# ✅ Correct
nx run i18n:i18n-manage --command=add --key=coreButton.save --value="Save"

# ❌ Wrong
nx run i18n:i18n-manage --command=add --key=coreButton.actions.save --value="Save"
```

---

### Error: "Property does not exist on type FdLanguage"

**Cause:** The `add` command failed mid-way. Typically:

- `translations.properties` was written successfully
- `fd-language.ts` update failed (permission error, disk full, etc.)
- The interface is now stale

**Fix:** Manually add the key to `fd-language.ts` (re-running `add` won't work — the key already exists in `translations.properties`):

```typescript
coreButton: {
    /** Your description */
    yourKey: FdLanguageKey;
}
```

Then reload your IDE if it still shows a stale type.

---

### Validation fails after adding a key

**Cause:** The key might not match the interface, or there's a syntax error.

**Fix:**

1. Run validation to see details:
    ```bash
    nx run i18n:i18n-manage --command=validate
    ```
2. Check that the key in `fd-language.ts` matches what you added via CLI
3. Ensure ICU syntax is correct (e.g., `{paramName}` not `{{paramName}}`)
4. If comments are malformed, run auto-correct:
    ```bash
    nx run i18n:i18n-manage --command=correct --baseLangOnly
    ```

---

## Reference

### Organizing Keys by Component

Translation keys follow this naming pattern:

```
<library><ComponentName>.<keyName>
```

Examples:

- `coreButton.submit` — Core library, Button component
- `platformTable.noData` — Platform library, Table component
- `btpToolHeader.title` — BTP library, ToolHeader component

---

### Comment Types (Auto-detected)

The CLI auto-detects comment types based on key names:

| Comment Type | Used For           | Example Key            |
| ------------ | ------------------ | ---------------------- |
| `XBUT`       | Button labels      | `coreButton.submit`    |
| `XTIT`       | Titles/headings    | `coreDialog.title`     |
| `XFLD`       | Field labels       | `coreInput.label`      |
| `XMSG`       | Messages           | `coreTable.noData`     |
| `XTOL`       | Tooltips           | `coreButton.tooltip`   |
| `XACT`       | Accessibility text | `coreButton.ariaLabel` |

You can override the auto-detection:

```bash
nx run i18n:i18n-manage --command=add --key=coreButton.submit --value="Submit" --commentType=XBUT
```

---

## Quick Reference

```bash
# Add new translation (automatically updates fd-language.ts + translations.properties)
nx run i18n:i18n-manage --command=add \
  --key=coreComponent.key \
  --value="English text"

# Update existing translation
nx run i18n:i18n-manage --command=update --key=coreComponent.key --value="New text"

# Rename translation key
nx run i18n:i18n-manage --command=rename --key=old.key --newKey=new.key

# Remove translation key
nx run i18n:i18n-manage --command=remove --key=coreComponent.key

# Search translations
nx run i18n:i18n-manage --command=search --searchTerm=submit

# Validate all translations
nx run i18n:i18n-manage --command=validate

# Auto-correct formatting issues (base language file only)
nx run i18n:i18n-manage --command=correct --baseLangOnly

# Sort translation keys alphabetically
nx run i18n:i18n-manage --command=sort

# Sync/regenerate all TypeScript files from .properties
nx run i18n:i18n-manage --command=sync
```

**Notes:**

- The `sync` command regenerates all TypeScript translation files from `.properties` files and is automatically run by CI when `.properties` files are modified.
- The `correct` command also runs automatically in CI when validation fails on fork PRs.
