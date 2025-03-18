import { effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FdLanguage, FdLanguageKeyCtx, FdLanguageKeyIdentifier } from '../../models';
import { FD_LANGUAGE, FD_LOCALE } from '../tokens';
import { TranslationResolver } from '../translation-resolver';
import { ResolveFnArgs, ResolveTranslationFn } from './common-types';

export interface ResolveTranslationsSyncOptions {
    fdLang?: Nullable<FdLanguage>;
    fdLocale?: Nullable<string>;
}

/**
 * Get the options for the resolve translations sync
 * @param options
 * @param _stopUpdating$
 */
export function resolveTranslationSyncFn(
    options?: ResolveTranslationsSyncOptions,
    _stopUpdating$?: Subject<void>
): ResolveTranslationFn<string> {
    let { fdLang, fdLocale } = options || {};
    _stopUpdating$ = _stopUpdating$ || new Subject<void>();
    if (!fdLocale) {
        const fdLocaleSignal = toSignal(inject(FD_LOCALE).pipe(takeUntil(_stopUpdating$)), { requireSync: true });
        effect(() => (fdLocale = fdLocaleSignal()));
    }
    if (!fdLang) {
        const fdLangSignal = toSignal(inject(FD_LANGUAGE).pipe(takeUntil(_stopUpdating$)), { requireSync: true });
        effect(() => (fdLang = fdLangSignal()));
    }
    const resolver = new TranslationResolver();
    return (...args) => {
        const [k, ctx] = args;
        return resolver.resolve(fdLang || ({} as unknown as FdLanguage), k, ctx || {}, fdLocale);
    };
}

type ResolveTranslationArgs<Key extends FdLanguageKeyIdentifier> =
    FdLanguageKeyCtx<Key> extends undefined
        ? [Key] | [Key, ResolveTranslationsSyncOptions]
        : [Key, FdLanguageKeyCtx<Key>] | [Key, FdLanguageKeyCtx<Key>, ResolveTranslationsSyncOptions];

/**
 * Helper utility function for getting translations
 */
export function resolveTranslationSync<Key extends FdLanguageKeyIdentifier>(
    ...args: ResolveTranslationArgs<Key>
): string {
    const [key, ctxOrOptions, options] = args;
    const _stopUpdating$ = new Subject<void>();
    const fn = resolveTranslationSyncFn({ ...(ctxOrOptions || {}), ...(options || {}) }, _stopUpdating$);
    const result = fn<Key>(...([key, ctxOrOptions] as ResolveFnArgs<Key>));
    _stopUpdating$.next();
    return result;
}
