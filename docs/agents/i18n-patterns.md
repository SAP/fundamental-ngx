<!-- AI-CONTEXT
scope: library-developer patterns for @fundamental-ngx/i18n
covers: import paths, translation API, host bindings, language registration, testing
does-not-cover: migration (see libs/i18n/MIGRATION.md), app setup (see libs/i18n/README.md), adding/renaming/removing keys (use nx run i18n:i18n-manage)
key-rule: FD_LANGUAGE_* constants are NOT in the root entry — always import from secondary entry points (@fundamental-ngx/i18n/de, /fr, /en, etc.)
-->

# Internationalization (i18n) Patterns

> Library-developer patterns for using and testing translations in Fundamental NGX components.
> For adding/renaming/removing keys, see the `i18n-manage` CLI (`nx run i18n:i18n-manage --help`)
> or the [CLI reference](../../libs/nx-plugin/src/executors/i18n-manage/README.md).
> For app-developer usage (providers, language switching, UI5 bridge), see `libs/i18n/README.md`.

## Contents

- [Import Paths](#import-paths) — root entry vs secondary entry points vs `/all`
- [Translation API](#translation-api-quick-reference) — `resolveTranslationSignal`, factory, pipe, parameters
- [Host Bindings](#host-bindings) — inlining to avoid ESLint member-ordering violations
- [Language Registration](#language-registration-lazy-registry) — `provideFundamentalTranslations`, `/all`, resolution order
- [Testing Translations](#testing-translations) — TestBed setup, language switching in tests

---

## Import Paths

### Root entry — `@fundamental-ngx/i18n`

Contains everything except language constants:

```typescript
import {
    provideFundamentalTranslations,
    FD_LANGUAGE_SIGNAL,
    FD_LOCALE_SIGNAL,
    FD_LANGUAGE_AUTO_DETECT,
    registerLanguage,
    detectLanguage,
    resolveTranslationSignal,
    resolveTranslationSignalFn,
    FdTranslatePipe,
    FdLanguage,
    FdLanguageKey
} from '@fundamental-ngx/i18n';
```

### Language constants — secondary entry points

Each language has its own entry point. Only import the languages your app needs — each import is independently tree-shakeable:

```typescript
import { FD_LANGUAGE_GERMAN } from '@fundamental-ngx/i18n/de';
import { FD_LANGUAGE_FRENCH } from '@fundamental-ngx/i18n/fr';
import { FD_LANGUAGE_CHINESE_SIMPLIFIED } from '@fundamental-ngx/i18n/zh-hans';
```

Full list of subpaths and migration guide: see `libs/i18n/MIGRATION.md`.

### All languages — `@fundamental-ngx/i18n/all`

Use only when you need all 37 languages or as a zero-effort migration escape hatch. **Bundles all languages regardless of usage.**

```typescript
import { provideAllFundamentalLanguages } from '@fundamental-ngx/i18n/all';
```

**Decision rule:** use specific secondary entry points (`/de`, `/fr`, etc.) unless you genuinely need all languages at runtime.

---

## Translation API Quick Reference

All translation utilities are imported from `@fundamental-ngx/i18n`:

```typescript
import { resolveTranslationSignal, resolveTranslationSignalFn, FdTranslatePipe } from '@fundamental-ngx/i18n';
```

### Single key — `resolveTranslationSignal`

```typescript
protected readonly _label = resolveTranslationSignal('coreCalendar.closeCalendarLabel');
```

### Multiple keys — `resolveTranslationSignalFn`

Create the factory once, then reuse it for each key:

```typescript
private readonly _translate = resolveTranslationSignalFn();
protected readonly _label = this._translate('coreCalendar.closeCalendarLabel');
protected readonly _description = this._translate('coreCalendar.calendarDayViewDescription');
```

Note: when using a translation in a `host` binding, the factory must be inlined instead — see [Host Bindings](#host-bindings) below.

### With parameters (TypeScript API)

Some keys require a context object. Pass a signal for reactive updates:

```typescript
readonly current = signal(1);
readonly total = signal(10);
protected readonly _message = this._translate('coreBreadcrumb.positionLabel', computed(() => ({
    current: this.current(),
    total: this.total()
})));
```

### Overriding language or locale per component

Pass `fdLang` or `fdLocale` options to `resolveTranslationSignalFn` to override the injected signals for a specific component:

```typescript
private readonly _translate = resolveTranslationSignalFn({ fdLang: signal(FD_LANGUAGE_GERMAN) });
protected readonly _label = this._translate('coreCalendar.closeCalendarLabel');
```

### Template pipe — `FdTranslatePipe`

```typescript
@Component({
    imports: [FdTranslatePipe],
    template: `
        <span>{{ ('coreCalendar.closeCalendarLabel' | fdTranslate)() }}</span>
        <span>{{ ('coreList.itemCount' | fdTranslate: { count: items.length })() }}</span>
    `
})
```

The pipe returns `Signal<string>` — the `()` invocation is required. Pass a context object as the pipe argument for keys that require parameters.

---

## Host Bindings

When a translation is needed in the `host` config (where pipes can't be used), **inline the call** to avoid ESLint `@typescript-eslint/member-ordering` violations:

```typescript
@Component({
    host: { '[attr.aria-label]': '_ariaLabel()' }
})
export class CalendarLegendComponent {
    protected readonly _ariaLabel = resolveTranslationSignalFn()('coreCalendar.calendarLegendLabel');
}
```

Do **not** split into two fields — `protected` must come before `private` per ESLint:

```typescript
// BAD — ESLint member-ordering violation
private readonly _resolve = resolveTranslationSignalFn();
protected readonly _ariaLabel = this._resolve('coreCalendar.calendarLegendLabel');
```

The shared factory pattern from "Multiple keys" above works only when both the factory and the results have the same access modifier (e.g., both `private`, or both `protected`). In host bindings, the result must be `protected` (template-accessible) but the factory is `private`, so inlining is the only option.

---

## Language Registration (lazy registry)

Only languages **explicitly registered** at bootstrap are matchable by `FD_LANGUAGE_SIGNAL`'s auto-detect. English is always registered; all other languages must be opted in.

### Register specific languages

```typescript
import { provideFundamentalTranslations } from '@fundamental-ngx/i18n';
import { FD_LANGUAGE_GERMAN } from '@fundamental-ngx/i18n/de';
import { FD_LANGUAGE_FRENCH } from '@fundamental-ngx/i18n/fr';

providers: [provideFundamentalTranslations(FD_LANGUAGE_GERMAN, FD_LANGUAGE_FRENCH)];
```

Only listed languages are bundled. Auto-detect via `LOCALE_ID` works for registered languages only.

### Restore all-languages behavior

```typescript
providers: [provideAllFundamentalLanguages()]; // from '@fundamental-ngx/i18n/all'
```

Registers all 37 languages. **All languages are bundled** — prefer specific entry points unless you genuinely need all of them.

### Resolution order

See `libs/i18n/MIGRATION.md` for the full 6-step resolution order.

---

## Testing Translations

Provide a writable signal for `FD_LANGUAGE_SIGNAL` so tests can switch languages:

```typescript
import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { FD_LANGUAGE_SIGNAL } from '@fundamental-ngx/i18n';
import { FD_LANGUAGE_ENGLISH } from '@fundamental-ngx/i18n/en';
import { FD_LANGUAGE_GERMAN } from '@fundamental-ngx/i18n/de';

describe('MyComponent', () => {
    it('should translate label', () => {
        const langSignal = signal(FD_LANGUAGE_ENGLISH);

        TestBed.configureTestingModule({
            imports: [MyComponent],
            providers: [{ provide: FD_LANGUAGE_SIGNAL, useValue: langSignal }]
        });

        const fixture = TestBed.createComponent(MyComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('Submit');

        langSignal.set(FD_LANGUAGE_GERMAN);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('Senden');
    });
});
```

- Provide the signal via TestBed providers
- Change the signal and call `detectChanges()` to verify updates
