import { inject } from '@angular/core';
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
 */
export function resolveTranslationObservableFn(
    options?: ResolveTranslationsObservableOptions
): ResolveTranslationFn<Observable<string>> {
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
 */
export function resolveTranslationObservable<Key extends FdLanguageKeyIdentifier>(
    ...args: ResolveTranslationArgs<Key>
): Observable<string> {
    const [key, ctxOrOptions, options] = args;
    const observableCreator = resolveTranslationObservableFn({ ...(ctxOrOptions || {}), ...(options || {}) });
    return observableCreator<Key>(...([key, ctxOrOptions] as ResolveFnArgs<Key>));
}
