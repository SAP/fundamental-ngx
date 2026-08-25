# Internationalization (i18n) Patterns

> Library-developer patterns for using and testing translations in Fundamental NGX components.
> For adding/renaming/removing keys, see the `i18n-manage` CLI (`nx run i18n:i18n-manage --help`)
> or the [CLI reference](../../libs/nx-plugin/src/executors/i18n-manage/README.md).
> For app-developer usage (providers, language switching, UI5 bridge), see `libs/i18n/README.md`.

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

### Template pipe — `FdTranslatePipe`

```typescript
@Component({
    imports: [FdTranslatePipe],
    template: `<span>{{ ('coreCalendar.closeCalendarLabel' | fdTranslate)() }}</span>`
})
```

The pipe returns `Signal<string>` — the `()` invocation is required.

### With parameters

The context argument accepts `CanBeSignal<T>`. Pass the signal itself for reactive updates, not its value:

```typescript
readonly count = signal(5);
protected readonly _message = this._translate('coreBreadcrumb.positionLabel', this.count);
```

---

## Host Bindings

When a translation is needed in the `host` config (where pipes can't be used), **inline the call**
to avoid ESLint `@typescript-eslint/member-ordering` violations:

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

Since the lazy registry was introduced, only languages **explicitly registered** at bootstrap
are matchable by `FD_LANGUAGE_SIGNAL`'s auto-detect. English is always registered; all other
languages must be opted in.

### Register specific languages

```typescript
// app.config.ts
import { provideFundamentalTranslations } from '@fundamental-ngx/i18n';
import { FD_LANGUAGE_GERMAN } from '@fundamental-ngx/i18n/de';
import { FD_LANGUAGE_FRENCH } from '@fundamental-ngx/i18n/fr';

providers: [provideFundamentalTranslations(FD_LANGUAGE_GERMAN, FD_LANGUAGE_FRENCH)];
```

Only listed languages are bundled. Auto-detect via `LOCALE_ID` works for registered languages only.

### Restore all-languages behavior

```typescript
import { provideAllFundamentalLanguages } from '@fundamental-ngx/i18n/all';

providers: [provideAllFundamentalLanguages()];
```

Registers all 37 built-in languages — matches pre-lazy behavior. Use as a migration escape hatch.

### Resolution order (registered languages only)

`detectLanguage` resolves in order: exact match → Chinese region-to-script (`zh-CN` → `zh-Hans`)
→ alias (`nb` → `no`) → base language (`pt-BR` → `pt`) → alias on base → English fallback.
All steps only match **registered** languages. See `libs/i18n/MIGRATION.md` for full details.

---

## Testing Translations

```typescript
import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { FD_LANGUAGE_SIGNAL, FD_LANGUAGE_ENGLISH, FD_LANGUAGE_GERMAN } from '@fundamental-ngx/i18n';

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

- Create a writable signal to control language in tests
- Provide the signal via TestBed providers
- Change the signal and call `detectChanges()` to verify updates
