import { EnvironmentProviders, makeEnvironmentProviders, provideEnvironmentInitializer } from '@angular/core';
import { registerAllBuiltinLanguages } from './all-languages';

/**
 * Register all 37 built-in languages at bootstrap. Restores the pre-lazy-registry
 * auto-detect behavior: `FD_LANGUAGE_SIGNAL` will match any supported locale from
 * `LOCALE_ID` without requiring explicit language imports.
 *
 * Use this as a one-line migration escape hatch if your app relied on transitive
 * auto-detection of non-English languages. For new apps, prefer
 * `provideFundamentalTranslations(...langs)` from `@fundamental-ngx/i18n` and list
 * only the languages you support.
 *
 * NOTE: importing this function pulls all 37 language constants into the bundle by
 * design. Apps that never import it will tree-shake out the language set.
 *
 * @example
 * import { provideAllFundamentalLanguages } from '@fundamental-ngx/i18n/all';
 * providers: [provideAllFundamentalLanguages()]
 */
export function provideAllFundamentalLanguages(): EnvironmentProviders {
    return makeEnvironmentProviders([
        provideEnvironmentInitializer(() => {
            registerAllBuiltinLanguages();
        })
    ]);
}
