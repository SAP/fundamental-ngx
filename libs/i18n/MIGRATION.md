# @fundamental-ngx/i18n — Migration Guide

## Lazy language registry (0.64.x → minor)

### What changed

Previously, all 37 languages were imported upfront into an `ALL_LANGUAGES` array. Because `FD_LANGUAGE_SIGNAL` is
`providedIn: 'root'`, the full i18n bundle was included in every app, regardless of how many languages it actually used.

The registry is now **lazy**: only languages the app explicitly registers are matchable
by `FD_LANGUAGE_SIGNAL`'s auto-detect. **English is always available** — no registration
needed for English-only apps.

### Who is affected

Apps that relied on **transitive auto-detection** of a non-English language — i.e. apps
that never called any i18n provider but whose `LOCALE_ID` happened to match a non-English
language. This is uncommon in practice, because most Angular apps use English as the
compile-time locale (`ng build` default).

Apps that set `FD_LANGUAGE_SIGNAL` directly (via `langSignal.set(FD_LANGUAGE_GERMAN)`)
are **not affected** — direct `.set()` bypasses `detectLanguage` entirely.

> **Affected files (for automated migration):** any `app.config.ts` or bootstrap file that does **not** call `provideFundamentalTranslations` or `provideAllFundamentalLanguages` but relies on non-English auto-detection via `LOCALE_ID`.
>
> ```
> grep -rL "provideFundamentalTranslations\|provideAllFundamentalLanguages" --include="*.ts" src/
> ```

### Migration

**Option 1 — List the languages your app supports (recommended):**

```typescript
// app.config.ts
import { provideFundamentalTranslations } from '@fundamental-ngx/i18n';
import { FD_LANGUAGE_GERMAN } from '@fundamental-ngx/i18n/de'; // secondary entry point
import { FD_LANGUAGE_FRENCH } from '@fundamental-ngx/i18n/fr'; // secondary entry point

export const appConfig: ApplicationConfig = {
    providers: [provideFundamentalTranslations(FD_LANGUAGE_GERMAN, FD_LANGUAGE_FRENCH)]
};
```

Only the languages you list are bundled. Auto-detect via `LOCALE_ID` works for them.

**Option 2 — Restore the old all-languages behavior (one-line escape hatch):**

```typescript
// app.config.ts
import { provideAllFundamentalLanguages } from '@fundamental-ngx/i18n/all';

export const appConfig: ApplicationConfig = {
    providers: [provideAllFundamentalLanguages()]
};
```

Registers all 37 languages at bootstrap — same behavior as before. **All languages are bundled**; prefer Option 1 if you only need a subset.

### Resolution order (unchanged)

`detectLanguage` still applies the same 6-step resolution for _registered_ languages:

1. Exact locale match (case-insensitive)
2. Chinese region-to-script (`zh-CN` → `zh-hans`)
3. Locale alias (`nb` → `no`, `nn` → `no`, `iw` → `he`)
4. Base language (`pt-BR` → `pt`)
5. Alias on base (`nb-NO` → `nb` → `no`)
6. Fallback to English

Steps 1–5 only match **registered** languages; step 6 always falls back to English.

---

## Secondary entry points — language import paths changed (0.65.x → minor)

### What changed

Language constants and `provideAllFundamentalLanguages` are no longer exported from the root `@fundamental-ngx/i18n` entry — each language now has its own secondary entry point, and `provideAllFundamentalLanguages` lives in `@fundamental-ngx/i18n/all`.

This lets bundlers include only the languages your app imports, instead of the full i18n bundle.

### Who is affected

Any code that imports `FD_LANGUAGE_*` constants or `provideAllFundamentalLanguages` from `@fundamental-ngx/i18n`.

> **Affected files (for automated migration):** any file importing `FD_LANGUAGE_*` or `provideAllFundamentalLanguages` from the root entry.
>
> ```
> grep -rn "from '@fundamental-ngx/i18n'" --include="*.ts" | grep -E "FD_LANGUAGE_|provideAllFundamentalLanguages"
> ```

### Migration

**Language constants** — update the import path:

```typescript
// Before
import { FD_LANGUAGE_GERMAN } from '@fundamental-ngx/i18n';

// After
import { FD_LANGUAGE_GERMAN } from '@fundamental-ngx/i18n/de';
```

Full list of subpaths: `ar`, `bg`, `cs`, `da`, `de`, `el`, `en`, `es`, `fi`, `fr`, `he`, `hi`, `hr`, `hu`, `it`, `ja`, `ka`, `kk`, `ko`, `ms`, `nl`, `no`, `pl`, `pt`, `ro`, `ru`, `sk`, `sl`, `sq`, `sr`, `sv`, `th`, `tr`, `uk`, `zh-hans`, `zh-hant`.

**`provideAllFundamentalLanguages`** — update the import path:

```typescript
// Before
import { provideAllFundamentalLanguages } from '@fundamental-ngx/i18n';

// After
import { provideAllFundamentalLanguages } from '@fundamental-ngx/i18n/all';
```

`provideFundamentalTranslations` and all other APIs (`FD_LANGUAGE_SIGNAL`, `FD_LOCALE_SIGNAL`, `registerLanguage`, `detectLanguage`, `FdTranslatePipe`, etc.) remain in the root entry.
