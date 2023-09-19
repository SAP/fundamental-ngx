import { inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { Observable, Subject, tap } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { FdLanguage, FdLanguageKeyArgs } from '../models/lang';
import { FD_LANGUAGE } from './tokens';
import { TranslationResolver } from './translation-resolver';

type ResolveFn<ReturnType> = (key: string, args?: Nullable<FdLanguageKeyArgs>) => ReturnType;

/**
 * Helper utility function for getting translations
 */
export function resolveTranslation(): ResolveFn<string>;
export function resolveTranslation(key: string, args?: Nullable<FdLanguageKeyArgs>, fdLang?: FdLanguage): string;
// eslint-disable-next-line jsdoc/require-jsdoc
export function resolveTranslation(
    key?: string,
    args?: Nullable<FdLanguageKeyArgs>,
    fdLang?: FdLanguage
): string | ResolveFn<string> {
    let _lang = fdLang;
    const _stopUpdating$ = new Subject<void>();
    if (!_lang) {
        inject(FD_LANGUAGE)
            .pipe(
                tap((r) => (_lang = r)),
                takeUntilDestroyed(),
                takeUntil(_stopUpdating$)
            )
            .subscribe();
    }
    const resolver = new TranslationResolver();
    const fn = (k: string, ctx?: Nullable<FdLanguageKeyArgs>): string =>
        resolver.resolve(_lang || ({} as unknown as FdLanguage), k, ctx || {});
    if (!key) {
        return fn;
    }
    const result = fn(key, args || {});
    _stopUpdating$.next();
    return result;
}

/**
 * Helper utility function for getting translations.
 * If no parameters are passed it will return the function which
 * is bound to the current DI FD_LANGUAGE instance
 */
export function resolveTranslation$(): ResolveFn<Observable<string>>;
export function resolveTranslation$(
    key: string,
    args?: Nullable<FdLanguageKeyArgs>,
    fdLang?: Observable<FdLanguage>
): Observable<string>;
// eslint-disable-next-line jsdoc/require-jsdoc
export function resolveTranslation$(
    key?: string,
    args?: Nullable<FdLanguageKeyArgs>,
    fdLang?: Observable<FdLanguage>
): Observable<string> | ResolveFn<Observable<string>> {
    const lang$ = fdLang ? fdLang : (inject(FD_LANGUAGE) as Observable<FdLanguage>);
    const resolver = new TranslationResolver();
    const fn = (k: string, ctx?: Nullable<FdLanguageKeyArgs>): Observable<string> =>
        lang$.pipe(map((lang) => resolver.resolve(lang, k, ctx || {})));

    if (!key) {
        return fn;
    }
    return fn(key, args || {});
}
