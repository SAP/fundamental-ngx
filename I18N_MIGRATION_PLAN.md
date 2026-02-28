# i18n Library Migration to Angular 21+ (Signals & 100% Zoneless)

**Date:** February 28, 2026
**Status:** Planning Phase
**Target:** Migrate `@fundamental-ngx/i18n` to Angular 21+ best practices with signals and zoneless compatibility

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Current State Analysis](#current-state-analysis)
3. [Angular 21+ Target Architecture](#angular-21-target-architecture)
4. [Identified Issues & Flaws](#identified-issues--flaws)
5. [Migration Strategy](#migration-strategy)
6. [Implementation Plan](#implementation-plan)
7. [Breaking Changes & Backward Compatibility](#breaking-changes--backward-compatibility)
8. [Testing Strategy](#testing-strategy)
9. [Success Criteria](#success-criteria)
10. [Open Questions](#open-questions)

---

## Executive Summary

### Goals

- **Modernize to Angular 21+**: Migrate from Observable-based to Signal-based architecture
- **Zoneless compatibility**: Ensure 100% compatibility with zoneless change detection (default in Angular 21)
- **Performance**: Reduce bundle size, improve change detection efficiency
- **Type safety**: Enhance type inference and developer experience
- **Backward compatibility**: Provide migration path without breaking existing consumers

### Key Metrics

- **Current library size**: ~177 files, 38 supported languages
- **Estimated effort**: 2-3 weeks (planning, implementation, testing, documentation)
- **Breaking changes**: Minimal (deprecated APIs marked for removal in v2.0)
- **Performance gain**: ~20-30% faster change detection (estimated)

---

## Current State Analysis

### Architecture Overview

**Core Components:**

```
libs/i18n/
├── models/           # Type definitions (FdLanguage, FdLanguageKey, etc.)
├── services/         # TranslationResolver (singleton)
├── pipes/            # FdTranslatePipe (impure, async)
├── directives/       # FdPatchLanguageDirective (component-level override)
├── utils/
│   ├── tokens.ts                          # FD_LANGUAGE, FD_LOCALE (BehaviorSubject)
│   ├── translation-resolver.ts            # Core resolution engine
│   ├── resolve-helpers/
│   │   ├── resolve-translations-signal.ts     # ✅ Signal API (modern)
│   │   ├── resolve-translations-observable.ts # 📦 Observable API (legacy)
│   │   └── resolve-translations-sync.ts       # 🔄 Sync API
├── languages/        # 38 pre-compiled language dictionaries
└── translations/     # Auto-generated from .properties files
```

### Current State Management Pattern

**Observable-Based (Legacy):**

```typescript
// Token definition
export const FD_LANGUAGE = new InjectionToken<Observable<FdLanguage>>(
    'Language for @fundamental-ngx packages',
    { factory: () => new BehaviorSubject(FD_LANGUAGE_ENGLISH) }
);

// Consumer pattern
@Inject(FD_LANGUAGE) private readonly _language$: Observable<FdLanguage>

// Subscription required
this._language$.pipe(
    map(lang => resolver.resolve(lang, 'key'))
).subscribe(translation => {
    this.label = translation;
    this.cdr.markForCheck(); // Manual change detection!
});
```

**Signal-Based (Partial - Added in Angular 16.2+):**

```typescript
// Available but not primary
readonly label = resolveTranslationSignal('coreButton.label');
```

### Current Consumption Patterns

**Pattern 1: FdTranslatePipe (Most Common - 200+ usages)**

```html
<button [attr.aria-label]="'coreButton.label' | fdTranslate"></button>
<span>{{ 'coreList.itemCount' | fdTranslate: { count: items.length } }}</span>
```

**Pattern 2: Service Injection (60+ usages)**

```typescript
@Inject(FD_LANGUAGE) private readonly _language$: Observable<FdLanguage>
private _translationResolver = new TranslationResolver();
```

**Pattern 3: Utility Functions (20+ usages in docs)**

```typescript
label = resolveTranslationSync('coreButton.label');
label$ = resolveTranslationObservable('coreButton.label');
label = resolveTranslationSignal('coreButton.label'); // ✅ Modern but underused
```

---

## Angular 21+ Target Architecture

### Signal-First Design

**New Token Pattern:**

```typescript
// Primary: Signal-based token
export const FD_LANGUAGE = new InjectionToken<Signal<FdLanguage>>('Language signal for @fundamental-ngx packages', {
    factory: () => signal(FD_LANGUAGE_ENGLISH)
});

// Legacy: Observable token (deprecated)
export const FD_LANGUAGE_OBSERVABLE = new InjectionToken<Observable<FdLanguage>>('Language observable (deprecated)', {
    factory: () => new BehaviorSubject(FD_LANGUAGE_ENGLISH)
});
```

**Primary Consumption Pattern:**

```typescript
export class MyComponent {
    private readonly _fdLanguage = inject(FD_LANGUAGE); // Signal<FdLanguage>

    // Computed translation (automatic reactivity)
    protected readonly label = computed(() => resolveTranslation(this._fdLanguage(), 'coreButton.label'));
}
```

### Zoneless-Compatible Change Detection

**Requirements:**

- ✅ All components must use `ChangeDetectionStrategy.OnPush`
- ✅ No manual `markForCheck()` calls (signals handle this)
- ✅ Replace `NgZone` usage with `afterNextRender()` / `afterRender()`
- ✅ Signals auto-notify Angular of changes

**Example:**

```typescript
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush // Required for zoneless
})
export class LocalizedComponent {
    readonly locale = inject(FD_LOCALE); // Signal<string>

    // Automatic change detection when locale changes
    readonly formattedDate = computed(() => formatDate(new Date(), 'medium', this.locale()));
}
```

### Modern Dependency Injection

**Pattern:**

```typescript
// ✅ Use inject() function (Angular 21 best practice)
export class TranslationService {
    private readonly fdLanguage = inject(FD_LANGUAGE);
    private readonly fdLocale = inject(FD_LOCALE);
}

// ❌ Avoid constructor injection
constructor(
    @Inject(FD_LANGUAGE) private fdLanguage: Observable<FdLanguage>
) {}
```

---

## Identified Issues & Flaws

### Critical Issues

#### 1. **FdTranslatePipe is Impure (Performance Impact)**

**Problem:**

```typescript
@Pipe({
    name: 'fdTranslate',
    pure: false,  // ❌ Runs on EVERY change detection cycle
    standalone: true
})
```

**Impact:**

- Called on every CD cycle even when translation hasn't changed
- In large apps with 100+ uses: thousands of unnecessary checks per second
- Observable subscription creates memory overhead

**Solution:**

```typescript
@Pipe({
    name: 'fdTranslate',
    pure: true, // ✅ Only runs when inputs change
    standalone: true
})
export class FdTranslatePipe implements PipeTransform {
    private readonly _fdLanguage = inject(FD_LANGUAGE); // Signal

    transform(key: FdLanguageKeyIdentifier, args?: unknown): Signal<string> {
        // Return signal instead of string
        return computed(() => resolveTranslation(this._fdLanguage(), key, args));
    }
}
```

**Migration:** Template must use signal syntax: `{{ ('key' | fdTranslate)() }}`

---

#### 2. **BehaviorSubject in Tokens (Zoneless Incompatible)**

**Problem:**

```typescript
export const FD_LANGUAGE = new InjectionToken<Observable<FdLanguage>>(
    'Language for @fundamental-ngx packages',
    { factory: () => new BehaviorSubject(FD_LANGUAGE_ENGLISH) } // ❌ Observable
);
```

**Impact:**

- Requires NgZone for change detection propagation
- Manual `markForCheck()` needed in components
- Not compatible with zoneless by default

**Solution:**

```typescript
export const FD_LANGUAGE = new InjectionToken<WritableSignal<FdLanguage>>(
    'Language signal',
    { factory: () => signal(FD_LANGUAGE_ENGLISH) } // ✅ Signal
);
```

---

#### 3. **TranslationResolver Service is Stateless but Instantiated**

**Problem:**

```typescript
private _translationResolver = new TranslationResolver(); // ❌ New instance per component
```

**Impact:**

- Unnecessary object creation (60+ components × 1 resolver each)
- Service is stateless - should be a pure function

**Solution:**

```typescript
// Pure function approach
export function resolveTranslation(
    lang: FdLanguage,
    key: FdLanguageKeyIdentifier,
    args?: unknown,
    locale?: string
): string {
    // Pure resolution logic
}

// Usage
const label = resolveTranslation(this._fdLanguage(), 'coreButton.label');
```

---

#### 4. **No Type Inference for Translation Arguments**

**Problem:**

```typescript
// Current: Any arguments accepted, runtime error if wrong
const label = resolveTranslation('platformList.itemCount', { count: 'string' }); // ❌ Should be number
```

**Impact:**

- Runtime errors instead of compile-time safety
- Poor developer experience

**Solution:**

```typescript
// Extract context type from key
type TranslationArgs<K extends FdLanguageKeyIdentifier> =
    FdLanguageKeyCtx<K> extends undefined ? never : FdLanguageKeyCtx<K>;

// Type-safe function
function resolveTranslation<K extends FdLanguageKeyIdentifier>(
    lang: FdLanguage,
    key: K,
    ...args: TranslationArgs<K> extends never ? [] : [TranslationArgs<K>]
): string;

// Usage - TypeScript enforces correct args
resolveTranslation(lang, 'platformList.itemCount', { count: 5 }); // ✅
resolveTranslation(lang, 'platformList.itemCount', { count: 'string' }); // ❌ Type error
```

---

### Major Issues

#### 5. **FdPatchLanguageDirective Creates BehaviorSubject Per Instance**

**Problem:**

```typescript
@Directive({
    providers: [{
        provide: FD_LANGUAGE,
        useValue: new BehaviorSubject<FdLanguage>(...) // ❌ New subject per directive
    }]
})
```

**Impact:**

- Memory overhead with nested directives
- Observable subscription chain complexity

**Solution:**

```typescript
@Directive({
    providers: [{
        provide: FD_LANGUAGE,
        useFactory: () => {
            const parentLang = inject(FD_LANGUAGE, { skipSelf: true });
            const patch = inject(FD_PATCH_LANGUAGE);
            return computed(() => ({ ...parentLang(), ...patch() }));
        }
    }]
})
```

---

#### 6. **Missing linkedSignal for Locale-Dependent Translations**

**Problem:** No automatic recomputation when both language AND locale change

**Solution:**

```typescript
readonly translation = linkedSignal({
    source: computed(() => ({
        lang: this._fdLanguage(),
        locale: this._fdLocale(),
        key: this.translationKey()
    })),
    computation: ({ lang, locale, key }) =>
        resolveTranslation(lang, key, undefined, locale)
});
```

---

### Minor Issues

#### 7. **Deprecated I18n Pattern Migration**

**Found in:** `libs/core/calendar/patch-deprecated-i18n-labels.ts`

**Issue:** Complex Observable chain for backward compatibility

**Solution:** Mark for removal in v2.0, provide clear migration guide

---

#### 8. **No Resource API for Dynamic Translation Loading**

**Current:** Translations are bundled at build time (all 38 languages)

**Opportunity:** Use Angular 21 `resource()` API for lazy loading:

```typescript
readonly translations = resource({
    request: () => ({ locale: this.locale() }),
    loader: async ({ request }) => {
        const response = await fetch(`/assets/i18n/${request.locale}.json`);
        return response.json();
    }
});
```

**Benefit:** Reduce initial bundle size by ~200-300KB

---

#### 9. **Test Coverage Gaps**

- No tests for concurrent language changes
- Missing edge cases for `FdPatchLanguageDirective` hierarchies
- No integration tests for zoneless mode
- Missing tests for Resource API pattern

---

#### 10. **Documentation Gaps**

- No migration guide from Observable to Signal patterns
- Missing zoneless compatibility notes
- No performance best practices guide
- Limited error handling documentation

---

## Migration Strategy

### Phase 1: Foundation (Week 1)

**Goal:** Establish signal-based foundation without breaking existing code

**Tasks:**

1. ✅ Create new signal-based tokens alongside existing Observable tokens
2. ✅ Implement signal-based resolution functions
3. ✅ Add backward compatibility layer
4. ✅ Update AGENTS.md with i18n patterns

**Deliverables:**

- `FD_LANGUAGE_SIGNAL` token (new)
- `FD_LOCALE_SIGNAL` token (new)
- `resolveTranslationComputed()` utility
- Deprecation warnings for Observable APIs

---

### Phase 2: Core Migration (Week 2)

**Goal:** Migrate core library components to signals

**Tasks:**

1. ✅ Refactor `FdTranslatePipe` to signal-based (pure pipe)
2. ✅ Update `FdPatchLanguageDirective` to computed signals
3. ✅ Migrate internal usages in core/platform/btp libraries
4. ✅ Add zoneless compatibility checks

**Deliverables:**

- Signal-based `FdTranslatePipe` (with template migration script)
- Updated directive with signal composition
- Migration guide document

---

### Phase 3: Testing & Documentation (Week 2-3)

**Goal:** Comprehensive testing and documentation

**Tasks:**

1. ✅ Write tests for zoneless mode
2. ✅ Test concurrent language switching
3. ✅ Add Resource API example for lazy loading
4. ✅ Update all documentation
5. ✅ Create migration codemod/schematic

**Deliverables:**

- 100% test coverage for new APIs
- Updated README and examples
- Migration schematic for automated updates

---

### Phase 4: Deprecation & Cleanup (Future v2.0)

**Goal:** Remove deprecated Observable-based APIs

**Tasks:**

1. Remove `FD_LANGUAGE` (Observable token)
2. Remove `resolveTranslationObservable()`
3. Remove backward compatibility shims
4. Simplify type definitions

---

## Implementation Plan

### Step 1: Create Signal-Based Tokens

**File:** `libs/i18n/src/lib/utils/tokens.ts`

````typescript
import { InjectionToken, signal, Signal, WritableSignal } from '@angular/core';
import { FdLanguage, FD_LANGUAGE_ENGLISH } from '../models';

// ===== NEW SIGNAL-BASED TOKENS (PRIMARY) =====

/**
 * Signal-based language token for reactive translations.
 * Use this in new code for automatic change detection.
 *
 * @example
 * ```ts
 * readonly language = inject(FD_LANGUAGE_SIGNAL);
 * readonly label = computed(() =>
 *   resolveTranslation(this.language(), 'coreButton.label')
 * );
 * ```
 */
export const FD_LANGUAGE_SIGNAL = new InjectionToken<WritableSignal<FdLanguage>>(
    'Language signal for @fundamental-ngx packages',
    {
        factory: () => signal(FD_LANGUAGE_ENGLISH)
    }
);

/**
 * Signal-based locale token for formatting operations.
 */
export const FD_LOCALE_SIGNAL = new InjectionToken<WritableSignal<string>>(
    'Locale signal for @fundamental-ngx packages',
    {
        factory: () => {
            const localeId = inject(LOCALE_ID, { optional: true }) ?? 'en-US';
            return signal(localeId);
        }
    }
);

// ===== DEPRECATED OBSERVABLE TOKENS (BACKWARD COMPATIBILITY) =====

/**
 * @deprecated Use FD_LANGUAGE_SIGNAL instead
 * Observable-based language token (legacy). Will be removed in v2.0.
 */
export const FD_LANGUAGE = new InjectionToken<Observable<FdLanguage>>(
    'Language observable (deprecated - use FD_LANGUAGE_SIGNAL)',
    {
        factory: () => {
            const languageSignal = inject(FD_LANGUAGE_SIGNAL);
            return toObservable(languageSignal);
        }
    }
);

/**
 * @deprecated Use FD_LOCALE_SIGNAL instead
 */
export const FD_LOCALE = new InjectionToken<Observable<string>>(
    'Locale observable (deprecated - use FD_LOCALE_SIGNAL)',
    {
        factory: () => {
            const localeSignal = inject(FD_LOCALE_SIGNAL);
            return toObservable(localeSignal);
        }
    }
);
````

---

### Step 2: Pure Signal-Based Translation Function

**File:** `libs/i18n/src/lib/utils/resolve-translation.ts` (new)

````typescript
import { computed, Signal } from '@angular/core';
import { FdLanguage, FdLanguageKeyIdentifier, FdLanguageKeyCtx } from '../models';
import { TranslationResolver } from './translation-resolver';

/**
 * Resolves a translation key to a computed signal string.
 * Automatically updates when language, locale, or arguments change.
 *
 * @example
 * ```ts
 * // Simple translation
 * readonly label = resolveTranslation(
 *   this.language,
 *   'coreButton.save'
 * );
 *
 * // With arguments
 * readonly itemCount = resolveTranslation(
 *   this.language,
 *   'coreList.itemCount',
 *   computed(() => ({ count: this.items().length }))
 * );
 * ```
 */
export function resolveTranslation<K extends FdLanguageKeyIdentifier>(
    language: Signal<FdLanguage>,
    key: K | Signal<K>,
    args?: FdLanguageKeyCtx<K> extends undefined ? never : Signal<FdLanguageKeyCtx<K>> | FdLanguageKeyCtx<K>,
    locale?: Signal<string> | string
): Signal<string> {
    const resolver = new TranslationResolver();

    return computed(() => {
        const lang = language();
        const resolvedKey = typeof key === 'function' ? key() : key;
        const resolvedArgs = typeof args === 'function' ? args() : args;
        const resolvedLocale = typeof locale === 'function' ? locale() : locale;

        return resolver.resolve(lang, resolvedKey, resolvedArgs, resolvedLocale);
    });
}
````

---

### Step 3: Refactor FdTranslatePipe to Pure + Signal

**File:** `libs/i18n/src/lib/pipes/fd-translate.pipe.ts`

````typescript
import { Pipe, PipeTransform, computed, Signal, inject } from '@angular/core';
import { FD_LANGUAGE_SIGNAL, FD_LOCALE_SIGNAL } from '../utils/tokens';
import { FdLanguageKeyIdentifier } from '../models';
import { resolveTranslation } from '../utils/resolve-translation';

/**
 * Pure pipe that transforms translation keys to reactive signal strings.
 *
 * **BREAKING CHANGE from v1.x:**
 * - Pipe is now pure (better performance)
 * - Returns Signal<string> instead of string
 * - Must use signal syntax in templates: `{{ ('key' | fdTranslate)() }}`
 *
 * @example
 * ```html
 * <!-- Simple translation -->
 * <button>{{ ('coreButton.save' | fdTranslate)() }}</button>
 *
 * <!-- With arguments -->
 * <span>{{ ('coreList.itemCount' | fdTranslate: { count: items.length })() }}</span>
 *
 * <!-- With default value -->
 * <label>{{ ('optional.key' | fdTranslate: undefined : 'Fallback')() }}</label>
 * ```
 */
@Pipe({
    name: 'fdTranslate',
    pure: true, // ✅ Pure pipe - only runs when inputs change
    standalone: true
})
export class FdTranslatePipe implements PipeTransform {
    private readonly _language = inject(FD_LANGUAGE_SIGNAL);
    private readonly _locale = inject(FD_LOCALE_SIGNAL);

    transform(key: FdLanguageKeyIdentifier | null, args?: unknown, defaultValue?: string): Signal<string> {
        if (!key) {
            return computed(() => defaultValue ?? '');
        }

        const translation = resolveTranslation(
            this._language,
            key,
            args ? computed(() => args) : undefined,
            this._locale
        );

        if (defaultValue) {
            return computed(() => translation() || defaultValue);
        }

        return translation;
    }
}
````

**Template Migration:**

```html
<!-- BEFORE (v1.x - Observable-based) -->
<button>{{ 'coreButton.save' | fdTranslate }}</button>

<!-- AFTER (v2.x - Signal-based) -->
<button>{{ ('coreButton.save' | fdTranslate)() }}</button>
```

---

### Step 4: Update FdPatchLanguageDirective

**File:** `libs/i18n/src/lib/directives/patch-language.directive.ts`

```typescript
@Directive({
    selector: '[fdPatchLanguage]',
    standalone: true,
    providers: [
        {
            provide: FD_LANGUAGE_SIGNAL,
            useFactory: () => {
                const parentLang = inject(FD_LANGUAGE_SIGNAL, { skipSelf: true });
                const patchInput = inject(FD_PATCH_LANGUAGE_INPUT);

                // Computed signal merges parent + patch
                return computed(() => {
                    const parent = parentLang();
                    const patch = patchInput();
                    return deepMerge(parent, patch);
                });
            }
        }
    ]
})
export class FdPatchLanguageDirective {
    readonly fdPatchLanguage = input.required<FdLanguagePatch>();

    constructor() {
        // Provide patch input to factory
        provide(FD_PATCH_LANGUAGE_INPUT, {
            useValue: this.fdPatchLanguage
        });
    }
}

// Internal token
const FD_PATCH_LANGUAGE_INPUT = new InjectionToken<InputSignal<FdLanguagePatch>>('...');
```

---

### Step 5: Migration Script for Templates

**File:** `libs/i18n/schematics/migration/template-migration.ts`

```typescript
/**
 * Migrates fdTranslate pipe usage from string to signal syntax
 *
 * Before: {{ 'key' | fdTranslate }}
 * After:  {{ ('key' | fdTranslate)() }}
 */
export function migrateTemplate(content: string): string {
    // Regex to find pipe usage
    const pipeRegex = /{{\s*'([^']+)'\s*\|\s*fdTranslate([^}]*)}}/g;

    return content.replace(pipeRegex, (match, key, args) => {
        return `{{ ('${key}' | fdTranslate${args})() }}`;
    });
}
```

---

## Breaking Changes & Backward Compatibility

### Breaking Changes (v2.0)

#### 1. FdTranslatePipe Returns Signal

**Before:**

```html
{{ 'coreButton.save' | fdTranslate }}
```

**After:**

```html
{{ ('coreButton.save' | fdTranslate)() }}
```

**Migration:** Automated via schematic

---

#### 2. Observable Tokens Deprecated

**Before:**

```typescript
@Inject(FD_LANGUAGE) private readonly lang$: Observable<FdLanguage>
```

**After:**

```typescript
private readonly lang = inject(FD_LANGUAGE_SIGNAL); // Signal<FdLanguage>
```

**Migration:** Update injections, remove subscriptions

---

#### 3. TranslationResolver Constructor Removed

**Before:**

```typescript
private _resolver = new TranslationResolver();
const text = this._resolver.resolve(lang, key);
```

**After:**

```typescript
const text = resolveTranslation(this.lang, key);
```

**Migration:** Replace instantiation with pure function

---

### Backward Compatibility Strategy

**Dual Token Pattern (v1.5 - v2.0):**

```typescript
// Deprecated Observable tokens delegate to signal tokens
export const FD_LANGUAGE = new InjectionToken<Observable<FdLanguage>>('...', {
    factory: () => toObservable(inject(FD_LANGUAGE_SIGNAL))
});
```

**Deprecation Timeline:**

- **v1.5 (Q2 2026):** Signal APIs added, Observable APIs deprecated
- **v1.6-1.9:** Deprecation warnings in console
- **v2.0 (Q4 2026):** Observable APIs removed

---

## Testing Strategy

### Unit Tests

**New Test Files:**

1. `resolve-translation.spec.ts` - Pure function tests
2. `fd-translate-pipe-signal.spec.ts` - Signal pipe tests
3. `fd-patch-language-directive-signal.spec.ts` - Signal directive tests

**Test Scenarios:**

```typescript
describe('resolveTranslation', () => {
    it('should return computed signal that updates with language changes', () => {
        const language = signal(FD_LANGUAGE_ENGLISH);
        const label = resolveTranslation(language, 'coreButton.save');

        expect(label()).toBe('Save');

        language.set(FD_LANGUAGE_GERMAN);
        expect(label()).toBe('Speichern');
    });

    it('should support parameterized translations', () => {
        const language = signal(FD_LANGUAGE_ENGLISH);
        const count = signal(5);
        const label = resolveTranslation(
            language,
            'coreList.itemCount',
            computed(() => ({ count: count() }))
        );

        expect(label()).toBe('5 items');

        count.set(1);
        expect(label()).toBe('1 item');
    });
});
```

---

### Integration Tests

**Zoneless Mode Testing:**

```typescript
describe('i18n in zoneless mode', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideZonelessChangeDetection()]
        });
    });

    it('should update template when language signal changes', () => {
        @Component({
            template: `{{ ('coreButton.save' | fdTranslate)() }}`,
            changeDetection: ChangeDetectionStrategy.OnPush
        })
        class TestComponent {}

        const fixture = TestBed.createComponent(TestComponent);
        expect(fixture.nativeElement.textContent).toBe('Save');

        const langSignal = TestBed.inject(FD_LANGUAGE_SIGNAL);
        langSignal.set(FD_LANGUAGE_GERMAN);

        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('Speichern');
    });
});
```

---

### Performance Tests

**Change Detection Benchmarks:**

```typescript
it('should reduce change detection cycles with pure pipe', () => {
    // Measure CD cycles before and after migration
    const cdCyclesBefore = measureCDCycles(ImpurePipeComponent);
    const cdCyclesAfter = measureCDCycles(PurePipeComponent);

    expect(cdCyclesAfter).toBeLessThan(cdCyclesBefore * 0.5); // 50% reduction
});
```

---

## Success Criteria

### Performance Metrics

- ✅ 20-30% reduction in change detection cycles
- ✅ Pure pipe reduces CD by 50% in components with 10+ translations
- ✅ Bundle size unchanged (signal migration is replacement, not addition)
- ✅ No NgZone dependency required

### Code Quality

- ✅ 100% test coverage for new signal APIs
- ✅ Zero ESLint violations
- ✅ All components pass `ChangeDetectionStrategy.OnPush`
- ✅ TypeScript strict mode compliance

### Developer Experience

- ✅ Migration schematic available for automated updates
- ✅ Comprehensive migration guide in README
- ✅ Deprecation warnings with clear migration paths
- ✅ Type-safe translation arguments

### Compatibility

- ✅ Backward compatible with v1.x for at least 2 minor versions
- ✅ Works in zoneless and zone-based apps
- ✅ No breaking changes for consumers until v2.0

---

## Open Questions

### Question 1: Resource API for Lazy Loading ✅ DECIDED

**Context:** Should we implement lazy translation loading using Angular 21 Resource API?

**Options:**

- **A)** Keep current bundled approach (38 languages = ~300KB)
- **B)** Add optional Resource API for lazy loading (reduces initial bundle)
- **C)** Make lazy loading the default pattern

**Recommendation:** Option B - Add as optional feature, document both patterns

**✅ DECISION:** **Option B** - Add optional lazy loading via `provideI18nWithLazyLoading()`

- Keep bundled approach as default (backward compatible, works offline)
- Provide opt-in lazy loading for apps prioritizing bundle size
- Document both patterns with clear trade-offs
- Rationale: "Any reduce of bundle size is good, any performance improvement is good and welcome. Offline scenario is not the most common use case."

---

### Question 2: Pure Pipe Migration Timeline ✅ DECIDED

**Context:** Pure pipe requires template syntax changes `{{ (key | pipe)() }}`

**Options:**

- **A)** Breaking change in v2.0 (users must migrate)
- **B)** Keep both pipes (`fdTranslate` impure, `fdTranslateSignal` pure)
- **C)** Provide automatic codemod/schematic for migration

**Recommendation:** Option C with automated migration

**✅ DECISION:** **Gradual Migration Strategy (Deprecate → Coexist → Remove)**

- **v1.5 (Q2 2026):**
    - Deprecate old `fdTranslate` pipe (impure, Observable-based)
    - Add new `fdTranslateSignal` pipe (pure, signal-based)
    - Provide migration schematic for automated template updates
    - Console warnings guide users to migrate
- **v1.6 - v1.9 (6-9 months):**
    - Both pipes coexist in codebase
    - Consumers migrate at their own pace
    - Schematic available for one-command migration
- **v2.0 (Q4 2026):**
    - Remove old `fdTranslate` pipe
    - Rename `fdTranslateSignal` → `fdTranslate`
    - Breaking change, but users have had 6-9 months to prepare
- **Benefits:** Follows Angular team's proven migration pattern, minimizes disruption, provides automation

---

### Question 3: ICU MessageFormat Library Update ✅ DECIDED

**Context:** Currently using `intl-messageformat@10.5.0`

**Question:** Should we update to v11 or evaluate alternatives?

**Options:**

- **A)** Update to intl-messageformat v11 (latest)
- **B)** Evaluate Fluent (Mozilla's i18n system)
- **C)** Keep v10 for stability

**Recommendation:** Option A - Update to v11

**✅ DECISION:** **Option A** - Update to `intl-messageformat@11.x`

- Breaking changes are internal only (invisible to app developers)
- Low-effort migration (4-6 hours) during signal refactoring window
- Modern dependencies align with Angular 21 modernization
- Better TypeScript types and performance improvements
- Public API remains unchanged (translation keys, service methods, pipe syntax)
- Rationale: No consumer impact + gets it done during migration = low-risk, high-value improvement

---

### Question 4: Translation Key Validation ✅ DECIDED

**Context:** No compile-time validation for translation key existence

**Options:**

- **A)** Generate TypeScript literal types from .properties files
- **B)** Runtime validation with dev warnings
- **C)** Keep current approach (type-safe paths only)

**Example (Option A):**

```typescript
// Auto-generated
type ValidTranslationKeys = 'coreButton.save' | 'coreButton.cancel' | 'coreList.itemCount';
// ... 790+ keys

function resolveTranslation<K extends ValidTranslationKeys>(key: K): Signal<string>;
```

**Recommendation:** Option A - Generate literal types

**✅ DECISION:** **Option C** - Keep current approach (string type)

- No migration effort needed
- Focus resources on core signal migration
- Can revisit in future if validation becomes a pain point
- Rationale: Prioritize signal migration over validation enhancements

---

### Question 5: Handling Missing Translations ✅ DECIDED

**Context:** Current fallback chain: target language → English → empty string

**Options:**

- **A)** Keep current fallback behavior
- **B)** Throw error in dev mode for missing keys
- **C)** Return key string itself (e.g., `'missing.key'`) for debugging

**Recommendation:** Option B for dev, Option A for prod

**✅ DECISION:** **Option A** - Keep current fallback behavior

- Silent fallback chain: target language → English → empty string
- No additional dev-mode validation
- Graceful degradation without console noise
- Rationale: Keep existing behavior, avoid scope creep during signal migration

---

### Question 6: Support for Nested Language Patching ✅ DECIDED

**Context:** `FdPatchLanguageDirective` supports component-level overrides

**Question:** Should we support computed patches that react to component signals?

**Example:**

```typescript
readonly dynamicPatch = computed(() => ({
    coreButton: {
        save: this.isEditing() ? 'Update' : 'Save'
    }
}));

// Template
<div [fdPatchLanguage]="dynamicPatch()">
    <button>{{ ('coreButton.save' | fdTranslate)() }}</button>
</div>
```

**Options:**

- **A)** Support computed signal patches (more flexible)
- **B)** Keep static patches only (simpler)

**Recommendation:** Option A - Support signal patches

**✅ DECISION:** **Option B** - Keep static patches only

- Static object patches cover 95% of use cases
- Simple implementation, less surface area for bugs
- Can add signal support later if users request it
- Rationale: Don't over-engineer for hypothetical scenarios, wait for real demand (YAGNI principle)

---

## Next Steps

### Immediate Actions

1. **Review this plan** - Get stakeholder feedback on approach
2. **Answer open questions** - Make architectural decisions
3. **Create JIRA tickets** - Break down into implementable tasks
4. **Set up feature branch** - `feat/i18n-signals-migration`

### Week 1 Goals

- [ ] Implement signal-based tokens
- [ ] Create pure translation resolution function
- [ ] Write unit tests for signal APIs
- [ ] Update AGENTS.md with patterns

### Week 2 Goals

- [ ] Refactor FdTranslatePipe to signal-based
- [ ] Migrate FdPatchLanguageDirective
- [ ] Create template migration schematic
- [ ] Write integration tests

### Week 3 Goals

- [ ] Migrate internal library usages
- [ ] Performance benchmarking
- [ ] Documentation updates
- [ ] Release v1.5 with deprecation warnings

---

## References

- [Angular 21+ Signals Documentation](https://angular.dev/guide/signals)
- [Zoneless Change Detection](https://angular.dev/guide/experimental/zoneless)
- [AGENTS.md](./AGENTS.md) - Project development guidelines
- [i18n Library README](./libs/i18n/README.md)
- [ICU MessageFormat Syntax](https://formatjs.io/docs/core-concepts/icu-syntax/)

---

**Document Status:** ✅ **Approved - Ready for Implementation**
**Last Updated:** February 28, 2026
**Author:** AI Agent (Claude)
**Decisions Finalized:** All 6 open questions resolved

## Decision Summary

| Question                        | Decision                               | Rationale                                         |
| ------------------------------- | -------------------------------------- | ------------------------------------------------- |
| 1. Lazy Loading                 | Option B - Optional lazy loading       | Reduce bundle size, keep bundled as default       |
| 2. Pure Pipe Migration          | Gradual (deprecate → coexist → remove) | Proven migration pattern, automated schematic     |
| 3. ICU MessageFormat Update     | Option A - Update to v11               | Internal change only, low effort, modernizes deps |
| 4. Translation Key Validation   | Option C - Keep current (string type)  | Focus on core migration, revisit if needed        |
| 5. Missing Translation Handling | Option A - Keep current fallback       | Graceful degradation, no scope creep              |
| 6. Signal Patches               | Option B - Static patches only         | Simple, wait for user demand (YAGNI)              |
