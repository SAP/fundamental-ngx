import { inject, isDevMode } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { combineLatest, isObservable, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FdLanguageKeyCtx, FdLanguageKeyIdentifier } from '../../models';
import { FdLanguage } from '../../models/fd-language';
import { FD_LANGUAGE, FD_LOCALE } from '../tokens';
import { TranslationResolver } from '../translation-resolver';
import { ResolveFnArgs, ResolveTranslationFn } from './common-types';

interface ResolveTranslationsObservableOptions {
    fdLang?: Nullable<FdLanguage | Observable<FdLanguage>>;
    fdLocale?: Nullable<string | Observable<string>>;
}

/**
 * Get the observable for the locale
 */
function getFdLocaleObservable(fdLocale?: Nullable<string | Observable<string>>): Observable<string> {
    if (fdLocale) {
        if (isObservable(fdLocale)) {
            return fdLocale;
        }
        return of(fdLocale);
    }
    return inject(FD_LOCALE);
}

/**
 * Get the observable for the language
 */
function getFdLangObservable(fdLang?: Nullable<FdLanguage | Observable<FdLanguage>>): Observable<FdLanguage> {
    if (fdLang) {
        if (isObservable(fdLang)) {
            return fdLang;
        }
        return of(fdLang);
    }
    return inject(FD_LANGUAGE);
}

/**
 * Get observable creator for the resolve translations
 *
 * @deprecated Use resolveTranslationSignalFn instead for better performance and zoneless compatibility.
 * Observable-based resolution will be removed in a future version.
 *
 * Migration:
 * ```ts
 * // Before
 * const translateFn = resolveTranslationObservableFn();
 * const label$ = translateFn('coreButton.label');
 *
 * // After
 * const translateFn = resolveTranslationSignalFn();
 * const labelSignal = translateFn('coreButton.label');
 * // Or convert to Observable if needed:
 * const label$ = toObservable(labelSignal);
 * ```
 */
export function resolveTranslationObservableFn(
    options?: ResolveTranslationsObservableOptions
): ResolveTranslationFn<Observable<string>> {
    if (isDevMode()) {
        console.warn(
            '[DEPRECATION] resolveTranslationObservableFn() is deprecated and will be removed in a future version.\n' +
                'Use resolveTranslationSignalFn() instead for better performance.\n' +
                'Migration: Use toObservable() to convert signals to observables if needed.\n' +
                'See: https://github.com/SAP/fundamental-ngx/blob/main/libs/i18n/MIGRATION.md'
        );
    }

    const { fdLang, fdLocale } = options || {};
    const langAndLocale$ = combineLatest([getFdLangObservable(fdLang), getFdLocaleObservable(fdLocale)]);

    const resolver = new TranslationResolver();
    return function <Key extends FdLanguageKeyIdentifier>(...args: ResolveFnArgs<Key>): Observable<string> {
        const [k, ctx] = args;
        return langAndLocale$.pipe(map(([lang, locale]) => resolver.resolve(lang, k, ctx || {}, locale)));
    };
}

type ResolveTranslationArgs<Key extends FdLanguageKeyIdentifier> =
    FdLanguageKeyCtx<Key> extends undefined
        ? [Key] | [Key, ResolveTranslationsObservableOptions]
        : [Key, FdLanguageKeyCtx<Key>] | [Key, FdLanguageKeyCtx<Key>, ResolveTranslationsObservableOptions];

/**
 * Helper utility function for getting translations observable
 *
 * @deprecated Use resolveTranslationSignal instead for better performance and zoneless compatibility.
 * Observable-based resolution will be removed in a future version.
 *
 * Migration:
 * ```ts
 * // Before
 * const label$ = resolveTranslationObservable('coreButton.label');
 *
 * // After
 * const labelSignal = resolveTranslationSignal('coreButton.label');
 * // Or convert to Observable if needed:
 * const label$ = toObservable(labelSignal);
 * ```
 */
export function resolveTranslationObservable<Key extends FdLanguageKeyIdentifier>(
    ...args: ResolveTranslationArgs<Key>
): Observable<string> {
    if (isDevMode()) {
        console.warn(
            '[DEPRECATION] resolveTranslationObservable() is deprecated and will be removed in a future version.\n' +
                'Use resolveTranslationSignal() instead for better performance.\n' +
                'Migration: Use toObservable() to convert signals to observables if needed.\n' +
                'See: https://github.com/SAP/fundamental-ngx/blob/main/libs/i18n/MIGRATION.md'
        );
    }

    const [key, ctxOrOptions, options] = args;
    const observableCreator = resolveTranslationObservableFn({ ...(ctxOrOptions || {}), ...(options || {}) });
    return observableCreator<Key>(...([key, ctxOrOptions] as ResolveFnArgs<Key>));
}
