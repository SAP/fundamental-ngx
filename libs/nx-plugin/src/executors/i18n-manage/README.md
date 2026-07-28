# i18n-manage Executor

CLI for managing translation keys across 37 language files in `@fundamental-ngx/i18n`.

**Important:** The scripts read from `.properties` files and generate TypeScript files (`translations_*.ts`) for the build. Developers edit `translations.properties`; translation teams edit the language-specific `.properties` files (`translations_de.properties`, etc.); the scripts generate TypeScript from these sources.

## Commands

### Add

```bash
nx run i18n:i18n-manage --command=add --key=coreButton.submit --value="Submit" --commentType=XBUT --comment="Submit button"
```

Adds a new key to all TypeScript translation files. For each locale:

- First checks if the key exists in the language-specific `.properties` file (e.g., `translations_es.properties`)
- If found, uses that translated value
- If not found, uses the English default value from `translations.properties`

This allows translation teams to update the `.properties` files, which are then automatically converted to TypeScript via the i18n-manage operations.

**Parameters:**

- `--key` (required): Translation key in `component.keyName` format
- `--value` (required): English translation text
- `--commentType` (optional): SAP text type (auto-detected from key name if omitted)
- `--comment` (optional): Description for translators

**Auto-detection:** `button` → XBUT, `label` → XFLD, `title` → XTIT, `aria` → XACT, otherwise → XMSG

---

### Rename

```bash
nx run i18n:i18n-manage --command=rename --key=coreButton.oldName --newKey=coreButton.newName
```

Renames a key across all TypeScript translation files.

---

### Remove

```bash
nx run i18n:i18n-manage --command=remove --key=coreButton.obsolete
```

Removes a key from all TypeScript translation files.

---

### Update

```bash
nx run i18n:i18n-manage --command=update --key=coreButton.save --value="Save Changes"
```

Updates the value of an existing key across all TypeScript translation files.

**Parameters:**

- `--key` (required): Translation key to update
- `--value` (required): New English translation text

---

### Search

```bash
nx run i18n:i18n-manage --command=search --searchTerm=save
```

Searches for keys by name or value (case-insensitive, English only).

---

### Validate

```bash
nx run i18n:i18n-manage --command=validate
```

Validates the `translations.properties` file for:

- Comment headers with valid SAP text types
- Valid key format
- ICU syntax (balanced curly braces)

---

### Sort

```bash
nx run i18n:i18n-manage --command=sort
```

Sorts keys in all TypeScript translation files alphabetically by nested object keys.

---

## SAP Text Types

| Type     | Usage                           |
| -------- | ------------------------------- |
| **XACT** | ARIA labels, screen reader text |
| **XBUT** | Button labels                   |
| **XCKL** | Checkbox text                   |
| **XFLD** | Form input labels               |
| **XMIT** | Menu headers and items          |
| **XMSG** | Messages, descriptions          |
| **XRBL** | Radio button text               |
| **XSEL** | Dropdown/select values          |
| **XTIT** | Titles and headings             |
| **XTOL** | Tooltips                        |
| **XLNK** | Link text                       |
| **YINS** | User instructions               |
| **NOTR** | No translation needed           |

---

## Developer Workflow

**What developers edit:** Only `libs/i18n/src/lib/translations/translations.properties`

**What translation teams edit:** Language-specific `.properties` files (`translations_de.properties`, `translations_es.properties`, etc.)

**What gets generated:** All `translations_*.ts` files (37 locales)

The language-specific `.properties` files are read by the i18n-manage scripts when generating TypeScript files. When translation teams update these files, the scripts automatically pick up those translations.

---

## Properties File Format

```properties
#XBUT: Save button
coreButton.save = Save
#XFLD: Name input field
coreInput.nameLabel = Name
#XMSG: Confirmation message with parameter
coreMessage.itemsSelected = {count} item(s) selected
```

**Rules:**

- Comment format: `#TYPE: Description`
- Key format: `component.keyName`
- ICU MessageFormat parameters: `{paramName}`

---

## Workflow: Adding a New Translation Key

1. **Update TypeScript interface** (`libs/i18n/src/lib/models/fd-language.ts`):

    ```typescript
    export interface FdLanguage {
        coreButton: {
            /** Submit button */
            submit: FdLanguageKey;
        };
    }
    ```

2. **Add to translations.properties** manually, then run the CLI to generate TypeScript files:

    ```bash
    # First, manually add to libs/i18n/src/lib/translations/translations.properties:
    # #XBUT: Submit button
    # coreButton.submit = Submit

    # Then generate TypeScript files:
    nx run i18n:i18n-manage --command=add --key=coreButton.submit --value="Submit" --commentType=XBUT
    ```

3. **Verify**:

    ```bash
    nx run i18n:i18n-manage --command=validate
    ```

4. **Use in components**:
    ```typescript
    protected readonly submitLabel = resolveTranslationSignal('coreButton.submit');
    ```

---

## TypeScript File Generation

The CLI reads from `translations.properties` and generates all TypeScript translation files directly:

1. **Language modules** - `translations.ts`, `translations_de.ts`, `translations_es.ts`, etc.
2. **Key identifier** - Type-safe constant for key access
3. **Test snapshots** - Jest snapshots for regression testing

**Manual regeneration:**

```bash
nx run i18n:i18n-manage --command=sync
```

**Build integration:** Runs automatically before `build` and `test` targets.

**GitHub Action:** When `.properties` files are modified in a PR, the [i18n-auto-generate workflow](../../../../../.github/workflows/i18n-auto-generate.yml) automatically regenerates TypeScript files and commits them to the PR. This ensures changes are propagated without needing local Node.js setup.

---

## Configuration

**Project Config** (`libs/i18n/project.json`):

```json
{
    "targets": {
        "i18n-manage": {
            "executor": "@fundamental-ngx/nx-plugin:i18n-manage",
            "options": {
                "propertiesPath": "libs/i18n/src/lib/translations"
            }
        }
    }
}
```

---

## Troubleshooting

**"Key does not exist" / "Key already exists":**

- Use `nx run i18n:i18n-manage --command=search --searchTerm=keyName` to find keys
- Use rename instead of remove + add

**Validation errors:**

- Run `nx run i18n:i18n-manage --command=validate` for detailed error messages
- Verify all comment headers use valid SAP text types

**TypeScript compilation errors:**

- Update `fd-language.ts` interface to match keys in `translations.properties`
- Run `nx run i18n:i18n-manage --command=sync` to regenerate files

**Generated files not updating:**

```bash
nx run i18n:i18n-manage --command=sync --skip-nx-cache
```
