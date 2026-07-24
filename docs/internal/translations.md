# Translation Management (i18n)

**Purpose:** Simple, step-by-step guide for managing translation keys in Fundamental NGX. Covers adding new translations, updating existing ones, and removing obsolete keys.

**Reference:**

- [i18n-manage CLI Reference](https://github.com/SAP/fundamental-ngx/blob/main/libs/nx-plugin/src/executors/i18n-manage/README.md)
- [i18n Package README](https://github.com/SAP/fundamental-ngx/blob/main/libs/i18n/README.md)

---

## Adding a New Translation

**When:** You need to add a new translatable string to a component.

### Step 1: Update the Interface

Open `libs/i18n/src/lib/models/fd-language.ts` and add your key to the `FdLanguage` interface:

```typescript
coreButton: {
    /** Submit button label */
    submit: FdLanguageKey;
    /** Cancel button label */
    cancel: FdLanguageKey;
    /** YOUR NEW KEY - Description for translators */
    yourNewKey: FdLanguageKey;
}
```

**Important:** Always add a comment describing what the text is for — this helps translators.

---

### Step 2: Run the Add Command

```bash
nx run i18n:i18n-manage --command=add --key=coreButton.yourNewKey --value="Your English Text"
```

**What happens:**

- Adds the key to translations.properties
- Sets the English text for `en` locale
- Auto-regenerates TypeScript files for every language and adds the English text for each

---

### Step 3: Verify

```bash
# Validate all translation files
nx run i18n:i18n-manage --command=validate
```

✅ Done! Your translation key is now available across all languages.

---

## Updating an Existing Translation

**When:** You need to change the text of an existing translation key.

```bash
nx run i18n:i18n-manage --command=update --key=coreButton.submit --value="Submit Changes"
```

**What happens:**

- Updates the English text for the key
- Other language files keep their existing translations (translator review needed)

---

## Renaming a Translation Key

**When:** You need to change the name of a translation key (refactoring).

```bash
nx run i18n:i18n-manage --command=rename --key=coreButton.oldName --newKey=coreButton.newName
```

**What happens:**

- Renames the key in `translations.properties` (base English file)
- Regenerates all TypeScript files (`translations.ts` and `translations_*.ts`)
- Language-specific `.properties` files are **not modified** (will be updated by external translation team)

**Next step:** Update your component code to use the new key name.

---

## Removing a Translation Key

**When:** A translation key is no longer used.

```bash
nx run i18n:i18n-manage --command=remove --key=coreButton.obsoleteKey
```

**What happens:**

- Removes the key from `translations.properties` (base English file)
- Regenerates all TypeScript files (`translations.ts` and `translations_*.ts`)
- Language-specific `.properties` files are **not modified** (will be cleaned up by external translation team)

**Before removing:** Search your codebase to ensure the key is not used:

```bash
grep -r "obsoleteKey" libs/ apps/
```

---

## Searching for a Translation

**When:** You need to find a translation key by name or text.

```bash
# Search by key name or value (case-insensitive)
nx run i18n:i18n-manage --command=search --searchTerm=submit
```

**Returns:** All matching keys with their values across all languages.

---

## Common Scenarios

### Adding a Translation with Parameters

If your translation needs dynamic values (e.g., "Hello, {name}"):

1. Update the interface:

```typescript
coreGreeting: {
    /** Greeting message with user name */
    hello: FdLanguageKey<{ name: string }>;
}
```

2. Add the key with ICU syntax:

```bash
nx run i18n:i18n-manage --command=add --key=coreGreeting.hello --value="Hello, {name}"
```

3. Use in your component:

```typescript
this.translationService.instant('coreGreeting.hello', { name: 'John' });
// Output: "Hello, John"
```

---

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
| `XLBL`       | Labels             | `coreInput.label`      |
| `XMSG`       | Messages           | `coreTable.noData`     |
| `XTOL`       | Tooltips           | `coreButton.tooltip`   |
| `XACT`       | Accessibility text | `coreButton.ariaLabel` |

You can override the auto-detection:

```bash
nx run i18n:i18n-manage --command=add --key=coreButton.submit --value="Submit" --commentType=XBUT
```

---

## Files You Should/Shouldn't Edit

### ✅ Edit Manually

- `libs/i18n/src/lib/models/fd-language.ts` — The interface definition

### ⚠️ Managed Externally

- `libs/i18n/src/lib/translations/translations_*.properties` — Language-specific translations (managed by external translation team)

### 🤖 Modified by CLI

- `libs/i18n/src/lib/translations/translations.properties` — Base English translations (modified by `add`, `update`, `rename`, `remove` commands)

### ❌ Never Edit (Auto-Generated)

- `libs/i18n/src/lib/models/fd-language-key-identifier.ts`
- `libs/i18n/src/lib/translations/translations.ts`
- `libs/i18n/src/lib/translations/translations_*.ts`

---

## Troubleshooting

### Error: "Property does not exist on type FdLanguage"

**Cause:** You forgot Step 1 (updating `fd-language.ts`)

**Fix:** Add your key to the `FdLanguage` interface first, then run the CLI command.

---

### Error: "Key already exists"

**Cause:** The key you're trying to add is already in the translation files.

**Fix:** Use `--command=update` instead of `--command=add`, or choose a different key name.

---

### Validation fails after adding a key

**Cause:** The key might not match the interface, or there's a syntax error.

**Fix:**

1. Run validation to see details:
    ```bash
    nx run i18n:i18n-manage --command=validate
    ```
2. Check that your key in `fd-language.ts` matches what you added via CLI
3. Ensure ICU syntax is correct (e.g., `{paramName}` not `{{paramName}}`)

---

## Quick Reference

```bash
# Add new translation
nx run i18n:i18n-manage --command=add --key=coreComponent.key --value="English text"

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

# Sort translation keys alphabetically
nx run i18n:i18n-manage --command=sort

# Sync/regenerate all TypeScript files from .properties
nx run i18n:i18n-manage --command=sync
```

**Note:** The `sync` command regenerates all TypeScript translation files from `.properties` files and is automatically run by CI when `.properties` files are modified. You typically don't need to run it manually unless you're debugging the build process.
