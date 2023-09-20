import { inject } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { combineLatest, isObservable, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FdLanguage, FdLanguageKeyArgs } from '../../models/lang';
import { FD_LANGUAGE, FD_LOCALE } from '../tokens';
import { TranslationResolver } from '../translation-resolver';
import { ResolveFn } from './common-types';

interface ResolveTranslationsObservableOptions {
    fdLang?: Nullable<FdLanguage | Observable<FdLanguage>>;
    fdLocale?: Nullable<string | Observable<string>>;
}

/**
 * Combine the options for the resolve translations observable
 */
function getResolveTranslationsObservableOptions(
    keyOrOptions?: string | ResolveTranslationsObservableOptions,
    options?: ResolveTranslationsObservableOptions
): ResolveTranslationsObservableOptions {
    const optionsFromKey = typeof keyOrOptions === 'string' ? {} : keyOrOptions;
    const optionsFromOptions = options || {};
    return {
        ...optionsFromKey,
        ...optionsFromOptions
    };
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
 * Helper utility function for getting translation observable factory
 */
export function resolveTranslationObservable(
    options?: ResolveTranslationsObservableOptions
): ResolveFn<Observable<string>>;
/**
 * Helper utility function for getting translations observable
 */
export function resolveTranslationObservable(
    key: string,
    args?: Nullable<FdLanguageKeyArgs>,
    options?: ResolveTranslationsObservableOptions
): Observable<string>;
/**
 * Helper utility function for getting translations
 */
export function resolveTranslationObservable(
    keyOrOptions?: string | ResolveTranslationsObservableOptions,
    args?: Nullable<FdLanguageKeyArgs>,
    options?: ResolveTranslationsObservableOptions
): Observable<string> | ResolveFn<Observable<string>> {
    const { fdLang, fdLocale } = getResolveTranslationsObservableOptions(keyOrOptions, options);

    const langAndLocale$ = combineLatest([getFdLangObservable(fdLang), getFdLocaleObservable(fdLocale)]);

    const resolver = new TranslationResolver();
    const fn = (k: string, ctx?: Nullable<FdLanguageKeyArgs>): Observable<string> =>
        langAndLocale$.pipe(map(([lang, locale]) => resolver.resolve(lang, k, ctx || {}, locale)));

    if (!keyOrOptions || typeof keyOrOptions !== 'string') {
        return fn;
    }
    return fn(keyOrOptions, args || {});
}
