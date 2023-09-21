import { effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FdLanguage, FdLanguageKeyArgs, FdLanguageKeyIdentifier } from '../../models/lang';
import { FD_LANGUAGE, FD_LOCALE } from '../tokens';
import { TranslationResolver } from '../translation-resolver';
import { ResolveFn } from './common-types';

interface ResolveTranslationsSyncOptions {
    fdLang?: Nullable<FdLanguage>;
    fdLocale?: Nullable<string>;
}

function getResolveTranslationSyncOptions(
    keyOrOptions?: FdLanguageKeyIdentifier | ResolveTranslationsSyncOptions,
    options?: ResolveTranslationsSyncOptions
): ResolveTranslationsSyncOptions {
    const optionsFromKey = typeof keyOrOptions === 'string' ? {} : keyOrOptions;
    const optionsFromOptions = options || {};
    return {
        ...optionsFromKey,
        ...optionsFromOptions
    };
}

/**
 * Helper utility function for getting translations
 */
export function resolveTranslationSync(options?: ResolveTranslationsSyncOptions): ResolveFn<string>;
export function resolveTranslationSync(
    key: FdLanguageKeyIdentifier,
    args?: Nullable<FdLanguageKeyArgs>,
    options?: ResolveTranslationsSyncOptions
): string;
// eslint-disable-next-line jsdoc/require-jsdoc
export function resolveTranslationSync(
    keyOrOptions?: FdLanguageKeyIdentifier | ResolveTranslationsSyncOptions,
    args?: Nullable<FdLanguageKeyArgs>,
    options?: ResolveTranslationsSyncOptions
): string | ResolveFn<string> {
    let { fdLang, fdLocale } = getResolveTranslationSyncOptions(keyOrOptions, options);
    const _stopUpdating$ = new Subject<void>();
    if (!fdLocale) {
        const fdLocaleSignal = toSignal(inject(FD_LOCALE).pipe(takeUntil(_stopUpdating$)), { requireSync: true });
        effect(() => (fdLocale = fdLocaleSignal()));
    }
    if (!fdLang) {
        const fdLangSignal = toSignal(inject(FD_LANGUAGE).pipe(takeUntil(_stopUpdating$)), { requireSync: true });
        effect(() => (fdLang = fdLangSignal()));
    }
    const resolver = new TranslationResolver();
    const fn = (k: FdLanguageKeyIdentifier, ctx?: Nullable<FdLanguageKeyArgs>): string =>
        resolver.resolve(fdLang || ({} as unknown as FdLanguage), k, ctx || {}, fdLocale);
    if (!keyOrOptions || typeof keyOrOptions !== 'string') {
        return fn;
    }
    const result = fn(keyOrOptions, args || {});
    _stopUpdating$.next();
    return result;
}
