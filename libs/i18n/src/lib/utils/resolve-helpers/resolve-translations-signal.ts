import { computed, inject, isSignal, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FdLanguage, FdLanguageKeyCtx, FdLanguageKeyIdentifier } from '../../models';
import { FD_LANGUAGE, FD_LOCALE } from '../tokens';
import { TranslationResolver } from '../translation-resolver';

type CanBeSignal<T> = T | Signal<T>;
type ResolveTranslationSignalFnArgs<Key extends FdLanguageKeyIdentifier> =
    FdLanguageKeyCtx<Key> extends undefined
        ? [CanBeSignal<Key>]
        : [CanBeSignal<Key>, CanBeSignal<FdLanguageKeyCtx<Key>>];
type ResolveSignalFn<ReturnType> = <Key extends FdLanguageKeyIdentifier>(
    ...args: ResolveTranslationSignalFnArgs<Key>
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
 * Helper utility which gives you the signal creator for translation resolving.
 */
export function resolveTranslationSignalFn(options?: ResolveTranslationsSignalOptions): ResolveSignalFn<string> {
    const { fdLang, fdLocale } = options || {};
    const fdLocaleSignal = getFdLocaleSignal(fdLocale);
    const fdLangSignal = getFdLangSignal(fdLang);
    const resolver = new TranslationResolver();

    return (...args) => {
        const [k, ctx] = args;
        const kSignal = isSignal(k) ? k : signal(k);
        const ctxSignal = ctx ? (isSignal(ctx) ? ctx : signal(ctx)) : undefined;
        return computed(() =>
            resolver.resolve(fdLangSignal(), kSignal(), (ctxSignal ? ctxSignal() : {}) as any, fdLocaleSignal())
        );
    };
}

type TranslationSignalArgs<Key extends FdLanguageKeyIdentifier> =
    FdLanguageKeyCtx<Key> extends undefined
        ? [CanBeSignal<Key>] | [CanBeSignal<Key>, ResolveTranslationsSignalOptions]
        :
              | [CanBeSignal<Key>, CanBeSignal<FdLanguageKeyCtx<Key>>]
              | [CanBeSignal<Key>, CanBeSignal<FdLanguageKeyCtx<Key>>, ResolveTranslationsSignalOptions];

/**
 * Helper utility which gives you the signal for translation resolving.
 */
export function resolveTranslationSignal<K extends FdLanguageKeyIdentifier>(
    ...args: TranslationSignalArgs<K>
): Signal<string> {
    const [key, ctxOrOptions, options] = args;
    const signalCreator = resolveTranslationSignalFn({
        ...(ctxOrOptions || {}),
        ...(options || {})
    });
    return signalCreator<K>(...([key, ctxOrOptions] as ResolveTranslationSignalFnArgs<K>));
}
