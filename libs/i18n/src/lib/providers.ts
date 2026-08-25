import { EnvironmentProviders, makeEnvironmentProviders, provideEnvironmentInitializer } from '@angular/core';
import { FdLanguage } from './models/fd-language';
import { registerLanguage } from './utils/detect-language';

/**
 * Register one or more languages into the lazy registry at bootstrap time.
 * Only registered languages are matchable by `FD_LANGUAGE_SIGNAL`'s auto-detect.
 * English is always registered; there is no need to pass it explicitly.
 *
 * @example
 * // In app.config.ts:
 * providers: [
 *   provideFundamentalTranslations(FD_LANGUAGE_GERMAN, FD_LANGUAGE_FRENCH)
 * ]
 */
export function provideFundamentalTranslations(...langs: FdLanguage[]): EnvironmentProviders {
    return makeEnvironmentProviders([
        provideEnvironmentInitializer(() => {
            for (const lang of langs) {
                registerLanguage(lang);
                // Register extra script aliases that the locale field doesn't cover:
                // zh-Hans locale already registers 'zh-hans'; add only the bare 'zh' alias.
                // zh-Hant locale already registers 'zh-hant'; no extra alias needed.
                const loc = lang.locale?.toLowerCase();
                if (loc === 'zh-hans') {
                    registerLanguage(lang, 'zh');
                }
            }
        })
    ]);
}
