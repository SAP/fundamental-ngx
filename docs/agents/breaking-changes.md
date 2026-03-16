# Breaking Changes & Dead Code Removal

> This document covers guidelines for identifying breaking changes and safely removing dead code.

## Table of Contents

- [What Constitutes a Breaking Change](#what-constitutes-a-breaking-change)
- [Breaking Change Commit Format](#breaking-change-commit-format)
- [Before Removing Public API](#before-removing-public-api)
- [Dead Code Removal](#dead-code-removal)
- [Common Dead Code Patterns](#common-dead-code-patterns)
- [Documentation File Guidelines](#documentation-file-guidelines)

---

## What Constitutes a Breaking Change

A breaking change is any modification that could cause existing consumer code to fail or behave differently after upgrading.

| Change Type                           | Breaking? | Example                                         |
| ------------------------------------- | --------- | ----------------------------------------------- |
| Removing exported class/function/type | ✅ Yes    | Removing `DestroyedService` from public API     |
| Removing exported constant/token      | ✅ Yes    | Removing `FD_BUTTON` InjectionToken             |
| Changing function signature           | ✅ Yes    | Adding required parameter, changing return type |
| Renaming exported symbol              | ✅ Yes    | Renaming `ButtonComponent` to `FdButton`        |
| Changing input/output names           | ✅ Yes    | Renaming `@Input() label` to `@Input() text`    |
| Changing default values               | ⚠️ Maybe  | If consumers rely on the default behavior       |
| Adding optional parameter             | ❌ No     | Adding `options?: Config` parameter             |
| Adding new export                     | ❌ No     | Exporting new `CardComponent`                   |
| Internal refactoring                  | ❌ No     | Changing private implementation details         |

---

## Breaking Change Commit Format

```
fix(scope)!: description of change

BREAKING CHANGE: Detailed explanation of what changed and migration path.
```

**Key points:**

- Use `!` after the scope to indicate breaking change
- Include `BREAKING CHANGE:` in the footer with migration instructions
- Provide clear guidance on how consumers should update their code

### Examples

```
fix(core)!: remove deprecated DestroyedService

BREAKING CHANGE: DestroyedService has been removed. Use Angular's built-in
DestroyRef + takeUntilDestroyed() instead.

Before:
  constructor(private destroyed: DestroyedService) {
    obs$.pipe(takeUntil(this.destroyed)).subscribe();
  }

After:
  private readonly destroyRef = inject(DestroyRef);
  constructor() {
    obs$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
```

---

## Before Removing Public API

1. **Search for usages** - Use grep/search to find all references in the codebase
2. **Check exports** - Verify if the symbol is exported from any `index.ts` or public API files
3. **Consider deprecation** - For widely-used APIs, deprecate first with `@deprecated` JSDoc
4. **Document migration** - Explain what consumers should use instead

### Search Commands

```bash
# Search for the symbol name across the codebase
grep -r "SymbolName" --include="*.ts" --include="*.html"

# Check if exported from index.ts
grep "symbol-name" libs/<library>/src/index.ts
```

---

## Dead Code Removal

### Steps to Safely Remove Dead Code

1. **Search for all usages:**

    ```bash
    grep -r "SymbolName" --include="*.ts" --include="*.html"
    ```

2. **Check public API exports:**

    - Look in `index.ts` files for re-exports
    - Check if symbol is part of the library's public API
    - Public API removal = breaking change

3. **Verify with build:**

    ```bash
    nx build <affected-project>
    ```

4. **Run tests:**
    ```bash
    nx test <affected-project>
    ```

### Decision Tree

```
Is the symbol exported from a public index.ts?
├── Yes → Breaking change, requires:
│         • !suffix in commit type
│         • BREAKING CHANGE footer
│         • Migration documentation
└── No → Internal code, safe to remove if:
          • No grep results found
          • Build succeeds
          • Tests pass
```

---

## Common Dead Code Patterns

| Pattern                 | Description                                 | Example                           |
| ----------------------- | ------------------------------------------- | --------------------------------- |
| **Deprecated services** | Old patterns replaced by Angular built-ins  | `DestroyedService` → `DestroyRef` |
| **Unused utilities**    | Helper functions that were refactored away  | Old string manipulation functions |
| **Legacy adapters**     | Compatibility code for old Angular versions | Zone.js workarounds               |
| **Orphaned types**      | Interfaces/types no longer referenced       | Old configuration interfaces      |
| **Commented code**      | Code that was "saved for later"             | `// Old implementation` blocks    |

### Example: Removing Unused Service

```bash
# 1. Search for usages
grep -r "DestroyedService" --include="*.ts"

# 2. If only found in its own file → candidate for removal

# 3. Check if exported (look in index.ts)
grep "destroyed.service" libs/cdk/utils/services/index.ts

# 4. If exported → breaking change
# 5. Remove file and export
# 6. Build and test
nx build cdk && nx test cdk

# 7. Commit with breaking change format
```

---

## Documentation File Guidelines

### Rule: Avoid creating `.md` files in library directories unless they are permanent user-facing documentation.

### ✅ GOOD - Appropriate documentation locations

```
libs/core/button/README.md               # Public API documentation
libs/docs/core/button/                   # User-facing examples
docs/architecture/decisions/ADR-001.md   # Architecture Decision Records
CHANGELOG.md                             # Release notes
MIGRATION_GUIDE.md                       # Version migration guide (root)
docs/agents/                             # AI agent guidelines
```

### ❌ BAD - Temporary documentation in library code

```
libs/core/content-density/UI5_MIGRATION.md        # Implementation plan
libs/platform/table/REFACTORING_TODO.md           # Temporary notes
libs/core/utils/DESIGN_DECISIONS.md               # Should be ADR or code comments
```

### Decision Matrix

| Document Type                 | Where to Put It                                 | When to Delete              |
| ----------------------------- | ----------------------------------------------- | --------------------------- |
| **Implementation plan**       | PR description, GitHub Discussion               | After merging               |
| **Design rationale**          | Code comments, ADR file in `docs/architecture/` | Never (archive if obsolete) |
| **Migration guide for users** | Root `MIGRATION_GUIDE.md` or version docs       | Keep until version is EOL   |
| **Temporary notes**           | Local file (not committed), PR description      | Immediately                 |
| **API documentation**         | README.md in library root, JSDoc comments       | Keep, update as API evolves |
| **Usage examples**            | `libs/docs/<library>/` directory                | Keep, update with features  |

### Better Approach: Document Decisions in Code

```typescript
/**
 * Service for observing and managing content density in components.
 *
 * **Architecture Decision:** UI5 Web Components integration
 *
 * UI5 components support compact mode via `data-ui5-compact-size` attribute.
 * This service automatically applies the attribute when density is COMPACT or CONDENSED.
 *
 * Design rationale:
 * - Component-level application (not body-level) for better local override support
 * - CONDENSED maps to UI5 compact (UI5 only has cozy/compact)
 * - Enabled by default via `ui5Markers.enabled` configuration
 *
 * See: https://sap.github.io/ui5-webcomponents/docs/advanced/configuration/#compact-mode
 */
@Injectable()
export class ContentDensityObserver {}
```

---

## Commit Message Reference

### Type

| Type       | Description                                             |
| ---------- | ------------------------------------------------------- |
| `feat`     | A new feature (bumps PATCH version)                     |
| `fix`      | A bug fix (bumps PATCH version)                         |
| `docs`     | Documentation only changes                              |
| `style`    | Changes that do not affect the meaning of the code      |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `test`     | Adding or correcting tests                              |
| `build`    | Changes to the build system                             |
| `ci`       | Changes to CI configuration                             |
| `chore`    | Other changes                                           |

### Scope (Required)

`core` | `platform` | `cdk` | `btp` | `cx` | `i18n` | `datetime-adapter` | `ui5` | `docs` | `e2e` | `ci`

### Multiple Scopes

```
fix(core,platform): message
fix(core/platform): message
fix(core\platform): message
```

### Subject Guidelines

- Use imperative, present tense: "change" not "changed"
- Don't capitalize the first letter
- No period at the end
