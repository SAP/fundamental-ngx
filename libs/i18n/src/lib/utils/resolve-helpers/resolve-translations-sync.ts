import { effect, inject, isDevMode } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FdLanguage, FdLanguageKeyCtx, FdLanguageKeyIdentifier } from '../../models';
import { FD_LANGUAGE_SIGNAL, FD_LOCALE_SIGNAL } from '../tokens';
import { TranslationResolver } from '../translation-resolver';
import { ResolveFnArgs, ResolveTranslationFn } from './common-types';

export interface ResolveTranslationsSyncOptions {
    fdLang?: Nullable<FdLanguage>;
    fdLocale?: Nullable<string>;
}

/**
 * Get the options for the resolve translations sync
 *
 * @deprecated Use resolveTranslationSignalFn instead for better performance and zoneless compatibility.
 * Sync resolution with Observable-based updates will be removed in a future version.
 *
 * Migration:
 * ```ts
 * // Before
 * const translateFn = resolveTranslationSyncFn();
 * const label = translateFn('coreButton.label');
 *
 * // After
 * const translateFn = resolveTranslationSignalFn();
 * const labelSignal = translateFn('coreButton.label');
 * const label = labelSignal(); // Get current value
 * ```
 *
 * @param options
 * @param _stopUpdating$ - Deprecated, no longer used
 */
export function resolveTranslationSyncFn(
    options?: ResolveTranslationsSyncOptions,
    _stopUpdating$?: any // eslint-disable-line @typescript-eslint/no-unused-vars -- Deprecated parameter, kept for backward compatibility
): ResolveTranslationFn<string> {
    if (isDevMode()) {
        console.warn(
            '[DEPRECATION] resolveTranslationSyncFn() is deprecated and will be removed in a future version.\n' +
                'Use resolveTranslationSignalFn() instead for better performance.\n' +
                'Migration: resolveTranslationSignalFn() returns a function that returns Signal<string>\n' +
                'See: https://github.com/SAP/fundamental-ngx/blob/main/libs/i18n/MIGRATION.md'
        );
    }

    let { fdLang, fdLocale } = options || {};

    // Use signal tokens directly instead of Observable tokens
    if (!fdLocale) {
        const fdLocaleSignal = inject(FD_LOCALE_SIGNAL, { optional: true });
        if (fdLocaleSignal) {
            effect(() => (fdLocale = fdLocaleSignal()));
        }
    }
    if (!fdLang) {
        const fdLangSignal = inject(FD_LANGUAGE_SIGNAL, { optional: true });
        if (fdLangSignal) {
            effect(() => (fdLang = fdLangSignal()));
        }
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
 *
 * @deprecated Use resolveTranslationSignal instead for better performance and zoneless compatibility.
 * Sync resolution with Observable-based updates will be removed in a future version.
 *
 * Migration:
 * ```ts
 * // Before
 * const label = resolveTranslationSync('coreButton.label');
 *
 * // After
 * const labelSignal = resolveTranslationSignal('coreButton.label');
 * const label = labelSignal(); // Get current value
 * ```
 */
export function resolveTranslationSync<Key extends FdLanguageKeyIdentifier>(
    ...args: ResolveTranslationArgs<Key>
): string {
    if (isDevMode()) {
        console.warn(
            '[DEPRECATION] resolveTranslationSync() is deprecated and will be removed in a future version.\n' +
                'Use resolveTranslationSignal() instead for better performance.\n' +
                'Migration: resolveTranslationSignal() returns Signal<string>\n' +
                'See: https://github.com/SAP/fundamental-ngx/blob/main/libs/i18n/MIGRATION.md'
        );
    }

    const [key, ctxOrOptions, options] = args;
    // Note: _stopUpdating$ is no longer needed with signal-based implementation
    const fn = resolveTranslationSyncFn({ ...(ctxOrOptions || {}), ...(options || {}) });
    return fn<Key>(...([key, ctxOrOptions] as ResolveFnArgs<Key>));
}
