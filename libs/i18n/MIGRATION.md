# @fundamental-ngx/i18n — Migration Guide

## Lazy language registry (0.64.x → minor)

### What changed

Prior to this release, all 37 built-in language constants were statically imported by
`detect-language.ts` into an `ALL_LANGUAGES` array. Because `FD_LANGUAGE_SIGNAL` is
`providedIn: 'root'`, this made the full 1.29 MB i18n FESM a permanent fixture of every
app's bundle, regardless of how many languages it actually used.

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

### Migration

**Option 1 — List the languages your app supports (recommended):**

```typescript
// app.config.ts
import { provideFundamentalTranslations } from '@fundamental-ngx/i18n';
import { FD_LANGUAGE_GERMAN, FD_LANGUAGE_FRENCH } from '@fundamental-ngx/i18n';

export const appConfig: ApplicationConfig = {
    providers: [provideFundamentalTranslations(FD_LANGUAGE_GERMAN, FD_LANGUAGE_FRENCH)]
};
```

Only the languages you list are bundled. Auto-detect via `LOCALE_ID` works for them.

**Option 2 — Restore the old all-languages behavior (one-line escape hatch):**

```typescript
// app.config.ts
import { provideAllFundamentalLanguages } from '@fundamental-ngx/i18n';

export const appConfig: ApplicationConfig = {
    providers: [provideAllFundamentalLanguages()]
};
```

This registers all 37 built-in languages at bootstrap, exactly matching the pre-lazy
behavior. All languages remain in the bundle. Use this if you need zero-effort migration.

### Resolution order (unchanged)

`detectLanguage` still applies the same 6-step resolution for _registered_ languages:

1. Exact locale match (case-insensitive)
2. Chinese region-to-script (`zh-CN` → `zh-Hans`)
3. Locale alias (`nb` → `no`, `nn` → `no`, `iw` → `he`)
4. Base language (`pt-BR` → `pt`)
5. Alias on base (`nb-NO` → `nb` → `no`)
6. Fallback to English

The only difference is that steps 1–5 only match **registered** languages. In development mode, if the fallback to English is triggered by an unregistered locale, the system logs an actionable `console.warn` identifying the unrecognized locale and the providers needed to register it.
