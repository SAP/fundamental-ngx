import { FD_LANGUAGE_ENGLISH } from '../languages/english';
import { FdLanguage } from '../models/fd-language';

/** Chinese region codes that map to script subtags. */
const CHINESE_REGION_TO_SCRIPT: Record<string, string> = {
    cn: 'zh-hans',
    sg: 'zh-hans',
    tw: 'zh-hant',
    hk: 'zh-hant',
    mo: 'zh-hant'
};

/** Legacy/alternative locale codes that map to canonical codes. */
const LOCALE_ALIASES: Record<string, string> = {
    nb: 'no',
    nn: 'no',
    iw: 'he'
};

/**
 * Extra locale aliases for the Chinese languages, beyond each language's own
 * `locale` field (`zh-Hans` / `zh-Hant`). Shared so the alias set lives in one
 * place — consumed by both `provideFundamentalTranslations()` and the eager
 * `ALL_BUILTIN_LANGUAGES` registration.
 */
export const CHINESE_SIMPLIFIED_ALIASES = ['zh-hans', 'zh'] as const;
export const CHINESE_TRADITIONAL_ALIASES = ['zh-hant'] as const;

/**
 * Runtime registry: locale code → FdLanguage. Seeded with English only.
 * Non-English languages are added via registerLanguage() at bootstrap time
 * (e.g. via provideFundamentalTranslations() or provideAllFundamentalLanguages()).
 * This is the load-bearing change that makes the i18n bundle lazy: only languages
 * explicitly registered by the app are ever bundled.
 */
const LOCALE_REGISTRY = new Map<string, FdLanguage>([['en', FD_LANGUAGE_ENGLISH]]);

/**
 * Register a language (and optional extra locale aliases) into the runtime registry.
 * Call this at bootstrap via provideFundamentalTranslations() or provideAllFundamentalLanguages().
 * The language's own `locale` field is used as the primary key; additional aliases can be
 * passed explicitly (e.g. 'zh-hans', 'zh').
 */
export function registerLanguage(lang: FdLanguage, ...extraAliases: string[]): void {
    if (lang.locale) {
        LOCALE_REGISTRY.set(lang.locale.toLowerCase(), lang);
    }
    for (const alias of extraAliases) {
        LOCALE_REGISTRY.set(alias.toLowerCase(), lang);
    }
}

/**
 * Reset the registry to the initial English-only state.
 * Exported for testing only — do not call in production code.
 * @internal
 */
export function resetRegistry(): void {
    LOCALE_REGISTRY.clear();
    LOCALE_REGISTRY.set('en', FD_LANGUAGE_ENGLISH);
}

/**
 * Maps a locale string (e.g. from Angular `LOCALE_ID`) to the best-matching
 * registered `FdLanguage`. Only languages that have been registered via
 * `registerLanguage()` are matchable. Falls back to `FD_LANGUAGE_ENGLISH` when
 * no match is found.
 *
 * Resolution order:
 * 1. Exact locale match (case-insensitive)
 * 2. Chinese region-to-script mapping (`zh-CN` → `zh-Hans`) — registered languages only
 * 3. Locale alias resolution (`nb` → `no`) — registered languages only
 * 4. Base language match (`pt-BR` → `pt`) — registered languages only
 * 5. Alias on base (`nb-NO` → `nb` → `no`) — registered languages only
 * 6. Fallback to English
 */
export function detectLanguage(locale: string): FdLanguage {
    const normalized = locale.trim().toLowerCase();
    if (!normalized) {
        return FD_LANGUAGE_ENGLISH;
    }

    // 1. Exact match
    const exact = LOCALE_REGISTRY.get(normalized);
    if (exact) {
        return exact;
    }

    // 2. Chinese region-to-script mapping (e.g. zh-CN → zh-hans)
    if (normalized.startsWith('zh-')) {
        const parts = normalized.split('-');
        const region = parts[parts.length - 1];
        const script = CHINESE_REGION_TO_SCRIPT[region];
        if (script) {
            return LOCALE_REGISTRY.get(script) ?? FD_LANGUAGE_ENGLISH;
        }
    }

    // 3. Alias resolution (nb→no, nn→no, iw→he)
    const alias = LOCALE_ALIASES[normalized];
    if (alias) {
        return LOCALE_REGISTRY.get(alias) ?? FD_LANGUAGE_ENGLISH;
    }

    // 4. Base language match (pt-BR → pt)
    const base = normalized.split('-')[0];
    const baseMatch = LOCALE_REGISTRY.get(base);
    if (baseMatch) {
        return baseMatch;
    }

    // 5. Alias on base (e.g. nb-NO → nb → no)
    const baseAlias = LOCALE_ALIASES[base];
    if (baseAlias) {
        return LOCALE_REGISTRY.get(baseAlias) ?? FD_LANGUAGE_ENGLISH;
    }

    // 6. Fallback
    return FD_LANGUAGE_ENGLISH;
}
