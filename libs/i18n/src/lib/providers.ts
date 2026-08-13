import { EnvironmentProviders, makeEnvironmentProviders, provideEnvironmentInitializer } from '@angular/core';
import { registerAllBuiltinLanguages } from './all-languages';
import { FD_LANGUAGE_CHINESE_SIMPLIFIED } from './languages/chinese_simplified';
import { FD_LANGUAGE_CHINESE_TRADITIONAL } from './languages/chinese_traditional';
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
            }
            // Chinese needs extra locale aliases beyond its `locale` field
            if (langs.includes(FD_LANGUAGE_CHINESE_SIMPLIFIED)) {
                registerLanguage(FD_LANGUAGE_CHINESE_SIMPLIFIED, 'zh-hans', 'zh');
            }
            if (langs.includes(FD_LANGUAGE_CHINESE_TRADITIONAL)) {
                registerLanguage(FD_LANGUAGE_CHINESE_TRADITIONAL, 'zh-hant');
            }
        })
    ]);
}

/**
 * Register all 37 built-in languages at bootstrap. Restores the pre-lazy-registry
 * auto-detect behavior: `FD_LANGUAGE_SIGNAL` will match any supported locale from
 * `LOCALE_ID` without requiring explicit language imports.
 *
 * Use this as a one-line migration escape hatch if your app relied on transitive
 * auto-detection of non-English languages. For new apps, prefer
 * `provideFundamentalTranslations(...langs)` and list only the languages you support.
 *
 * NOTE: calling this function pulls all 37 language constants into the bundle by design.
 * Apps that never call it will tree-shake out the language set when `sideEffects: false`
 * is set on the package (it is).
 *
 * @example
 * providers: [provideAllFundamentalLanguages()]
 */
export function provideAllFundamentalLanguages(): EnvironmentProviders {
    return makeEnvironmentProviders([
        provideEnvironmentInitializer(() => {
            registerAllBuiltinLanguages();
        })
    ]);
}
