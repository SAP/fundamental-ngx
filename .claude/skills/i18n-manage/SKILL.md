---
name: i18n-manage
description: Add, rename, or remove i18n translation keys in fundamental-ngx (updates FdLanguage interface, .properties files, and generated types)
argument-hint: [add|rename|remove] key [value]
---

# i18n Key Management: $ARGUMENTS

If `$ARGUMENTS` is empty, ask the user what operation they need (add, rename, or remove) and for which key.

## Add a Key

### Step 1: Run the CLI

```bash
nx run i18n:i18n-manage --command=add --key=coreCalendar.calendarLegendLabel --value="Calendar Legend" --commentType=XACT --comment="ARIA label for the calendar legend"
```

This single command updates both `translations.properties` and `fd-language.ts` automatically.

**Comment types** (auto-detected from key name if `--commentType` is omitted):

| Type | Usage                           | Auto-detected from    |
| ---- | ------------------------------- | --------------------- |
| XACT | ARIA labels, screen reader text | key contains `aria`   |
| XBUT | Button labels                   | key contains `button` |
| XFLD | Form input labels               | key contains `label`  |
| XTIT | Titles and headings             | key contains `title`  |
| XMSG | Messages, descriptions          | default fallback      |
| XMIT | Menu item text                  | —                     |
| XTOL | Tooltips                        | —                     |
| XCKL | Checkbox text                   | —                     |
| XRBL | Radio button text               | —                     |
| XSEL | Dropdown/select values          | —                     |
| XLNK | Link text                       | —                     |
| YINS | User instructions               | —                     |
| NOTR | No translation needed           | —                     |

For keys with parameters, the CLI adds the key as `FdLanguageKey` — if you need a typed context (e.g., `FdLanguageKey<{ count: number }>`), update `fd-language.ts` manually after running the command.

### Step 2: Verify

```bash
nx run i18n:i18n-manage --command=validate
nx run i18n:build --skip-nx-cache
```

---

## Rename a Key

### Step 1: Update `fd-language.ts` (MANUAL — required)

Rename the property in the `FdLanguage` interface — the CLI does not update this for rename.

### Step 2: Run the CLI

```bash
nx run i18n:i18n-manage --command=rename --key=coreButton.oldName --newKey=coreButton.newName
```

### Step 3: Update component references

Search for usages of the old key string across all libraries:

```bash
grep -rn "coreButton.oldName" libs/core/ libs/platform/ libs/btp/ libs/cx/ libs/cdk/ --include="*.ts" --include="*.html"
```

Update all occurrences to the new key.

### Step 4: Verify

```bash
nx run i18n:i18n-manage --command=validate
nx run i18n:build --skip-nx-cache
```

---

## Remove a Key

### Step 1: Verify the key is unused

```bash
grep -rn "theKey.toRemove" libs/core/ libs/platform/ libs/btp/ libs/cx/ libs/cdk/ --include="*.ts" --include="*.html"
```

Do NOT remove a key that is still referenced in components.

### Step 2: Run the CLI

```bash
nx run i18n:i18n-manage --command=remove --key=theKey.toRemove
```

This removes the key from `translations.properties` and `fd-language.ts` automatically. Empty component sections are cleaned up.

### Step 3: Verify

```bash
nx run i18n:i18n-manage --command=validate
nx run i18n:build --skip-nx-cache
```

---

## Using the Key in Components

See `docs/agents/i18n-patterns.md` for translation API patterns (pipe, TypeScript, host bindings).

---

## Troubleshooting

### `TS2554: Expected 2 arguments, but got 1`

Only applies to **rename** — `add` and `remove` update `fd-language.ts` automatically.

**Cause:** The key exists in `fd-language-key-identifier.ts` (auto-generated) but NOT in `fd-language.ts` (manual). You forgot to update `fd-language.ts` in the rename Step 1.

**Fix:** Add/rename the missing property in `fd-language.ts`.

### `Key "x" already exists`

The key is already in `translations.properties`. Use `rename` or `update` instead of `add`.

```bash
nx run i18n:i18n-manage --command=search --searchTerm=keyName
nx run i18n:i18n-manage --command=update --key=coreButton.save --value="New Value"
```

### Generated files not updating

```bash
nx run i18n:i18n-manage --command=sync --skip-nx-cache
```

### Malformed comments or whitespace issues in `.properties` files

Auto-correct common issues (missing/malformed comments, trailing whitespace, sorts keys alphabetically):

```bash
# All .properties files
nx run i18n:i18n-manage --command=correct

# Base English file only
nx run i18n:i18n-manage --command=correct --baseLangOnly
```

---

## File Reference

| File                                                       | Manual/Generated                                 | Purpose                                                                         |
| ---------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------- |
| `libs/i18n/src/lib/translations/translations.properties`   | CLI-managed (`i18n-manage --command=add/remove`) | Base English translation strings                                                |
| `libs/i18n/src/lib/models/fd-language.ts`                  | **MANUAL**                                       | `FdLanguage` interface — runtime type shape                                     |
| `libs/i18n/src/lib/models/fd-language-key-identifier.ts`   | Generated                                        | Union type of all valid key strings                                             |
| `libs/i18n/src/lib/translations/translations_*.ts`         | Generated                                        | TypeScript translation modules (37 locales) — consumed by the application       |
| `libs/i18n/src/lib/translations/translations_*.properties` | Delivered from external translation team         | Localized translation strings — read by scripts to generate `translations_*.ts` |
