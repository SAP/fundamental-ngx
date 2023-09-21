import { computed, inject, isSignal, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FdLanguage, FdLanguageKeyArgs, FdLanguageKeyIdentifier } from '../../models/lang';
import { FD_LANGUAGE, FD_LOCALE } from '../tokens';
import { resolveTranslationSync } from './resolve-translations-sync';

type CanBeSignal<T> = T | Signal<T>;
type ResolveSignalFn<ReturnType> = (
    key: CanBeSignal<FdLanguageKeyIdentifier>,
    args?: Nullable<CanBeSignal<FdLanguageKeyArgs>>
) => Signal<ReturnType>;

function getFdLocaleSignal(fdLocale?: Nullable<CanBeSignal<string>>): Signal<string> {
    if (fdLocale) {
        if (isSignal(fdLocale)) {
            return fdLocale;
        }
        return signal(fdLocale);
    }
    return toSignal(inject(FD_LOCALE), { requireSync: true });
}

function getFdLangSignal(fdLang?: Nullable<CanBeSignal<FdLanguage>>): Signal<FdLanguage> {
    if (fdLang) {
        if (isSignal(fdLang)) {
            return fdLang;
        }
        return signal(fdLang);
    }
    return toSignal(inject(FD_LANGUAGE), { requireSync: true });
}

interface ResolveTranslationsSignalOptions {
    fdLang?: Nullable<CanBeSignal<FdLanguage>>;
    fdLocale?: Nullable<CanBeSignal<string>>;
}

/**
 * Determine if the options are of type ResolveTranslationsSignalOptions
 * @param options
 */
function isResolveTranslationsSignalOptions(
    options?: Nullable<CanBeSignal<string> | ResolveTranslationsSignalOptions>
): options is ResolveTranslationsSignalOptions {
    return !!options && typeof options !== 'string' && !isSignal(options);
}

/**
 * Get the options for the resolve translations signal
 * @param keyOrOptions
 * @param options
 */
function getResolveTranslationsSignalOptions(
    keyOrOptions?: CanBeSignal<FdLanguageKeyIdentifier> | ResolveTranslationsSignalOptions,
    options?: ResolveTranslationsSignalOptions
): ResolveTranslationsSignalOptions {
    const optionsFromKey = isResolveTranslationsSignalOptions(keyOrOptions) ? keyOrOptions : {};
    const optionsFromOptions = isResolveTranslationsSignalOptions(options) ? options : {};
    return { ...optionsFromKey, ...optionsFromOptions };
}

/**
 * Helper utility which gives you the signal creator for translation resolving.
 */
export function resolveTranslationSignal(options?: ResolveTranslationsSignalOptions): ResolveSignalFn<string>;
/**
 * Helper utility which gives you the signal for translation resolving.
 * @param key
 * @param args
 * @param options
 */
export function resolveTranslationSignal(
    key: CanBeSignal<FdLanguageKeyIdentifier>,
    args?: Nullable<CanBeSignal<FdLanguageKeyArgs>>,
    options?: ResolveTranslationsSignalOptions
): Signal<string>;
// eslint-disable-next-line jsdoc/require-jsdoc
export function resolveTranslationSignal(
    keyOrOptions?: CanBeSignal<FdLanguageKeyIdentifier> | ResolveTranslationsSignalOptions,
    args?: Nullable<CanBeSignal<FdLanguageKeyArgs>>,
    options?: ResolveTranslationsSignalOptions
): Signal<string> | ResolveSignalFn<string> {
    const { fdLang, fdLocale } = getResolveTranslationsSignalOptions(keyOrOptions, options);
    const fdLocaleSignal = getFdLocaleSignal(fdLocale);
    const fdLangSignal = getFdLangSignal(fdLang);

    const fn = (
        k: CanBeSignal<FdLanguageKeyIdentifier>,
        ctx?: Nullable<CanBeSignal<FdLanguageKeyArgs>>
    ): Signal<string> => {
        const kSignal = isSignal(k) ? k : signal(k);
        const ctxSignal = isSignal(ctx) ? ctx : signal(ctx || {});
        return computed(() =>
            resolveTranslationSync(kSignal(), ctxSignal(), {
                fdLang: fdLangSignal(),
                fdLocale: fdLocaleSignal()
            })
        );
    };

    if (!keyOrOptions || isResolveTranslationsSignalOptions(keyOrOptions)) {
        return fn;
    }
    return fn(keyOrOptions, args);
}
