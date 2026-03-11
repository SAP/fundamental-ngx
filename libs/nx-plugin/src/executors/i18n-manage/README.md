# i18n-manage Executor

CLI for managing translation keys across 37 language files in `@fundamental-ngx/i18n`.

## Commands

### Add

```bash
nx run i18n:i18n-manage --command=add --key=coreButton.submit --value="Submit" --commentType=XBUT --comment="Submit button"
```

Adds a new key to all language files with English text. Translation teams localize later.

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

Renames a key across all language files while preserving the comment.

---

### Remove

```bash
nx run i18n:i18n-manage --command=remove --key=coreButton.obsolete
```

Removes a key from all language files.

---

### Update

```bash
nx run i18n:i18n-manage --command=update --key=coreButton.save --value="Save Changes"
```

Updates the value of an existing key across all language files while preserving the comment.

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

Validates all `.properties` files for:

- Comment headers with valid SAP text types
- Key consistency across all 37 files
- ICU syntax (balanced curly braces)

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

2. **Add to .properties files**:

    ```bash
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

The CLI automatically runs `transform-translations` after modifying `.properties` files. This generates:

1. **Language constants** - `FD_LANGUAGE_ENGLISH`, `FD_LANGUAGE_GERMAN`, etc.
2. **Key identifier** - Type-safe constant for key access
3. **Test snapshots** - Jest snapshots for regression testing

**Manual regeneration:**

```bash
nx run i18n:transform-translations
```

**Build integration:** Runs automatically before `build` and `test` targets.

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

- Update `fd-language.ts` interface to match `.properties` keys
- Run `nx run i18n:transform-translations` to regenerate files

**Generated files not updating:**

```bash
nx run i18n:transform-translations --skip-nx-cache
```
