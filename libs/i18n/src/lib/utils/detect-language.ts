import { FD_LANGUAGE_ALBANIAN } from '../languages/albanian';
import { FD_LANGUAGE_ARABIC } from '../languages/arabic';
import { FD_LANGUAGE_BULGARIAN } from '../languages/bulgarian';
import { FD_LANGUAGE_CHINESE_SIMPLIFIED } from '../languages/chinese_simplified';
import { FD_LANGUAGE_CHINESE_TRADITIONAL } from '../languages/chinese_traditional';
import { FD_LANGUAGE_CROATIAN } from '../languages/croatian';
import { FD_LANGUAGE_CZECH } from '../languages/czech';
import { FD_LANGUAGE_DANISH } from '../languages/danish';
import { FD_LANGUAGE_DUTCH } from '../languages/dutch';
import { FD_LANGUAGE_ENGLISH } from '../languages/english';
import { FD_LANGUAGE_FINNISH } from '../languages/finnish';
import { FD_LANGUAGE_FRENCH } from '../languages/french';
import { FD_LANGUAGE_GEORGIAN } from '../languages/georgian';
import { FD_LANGUAGE_GERMAN } from '../languages/german';
import { FD_LANGUAGE_GREEK } from '../languages/greek';
import { FD_LANGUAGE_HEBREW } from '../languages/hebrew';
import { FD_LANGUAGE_HINDI } from '../languages/hindi';
import { FD_LANGUAGE_HUNGARIAN } from '../languages/hungarian';
import { FD_LANGUAGE_ITALIAN } from '../languages/italian';
import { FD_LANGUAGE_JAPANESE } from '../languages/japanese';
import { FD_LANGUAGE_KAZAKH } from '../languages/kazakh';
import { FD_LANGUAGE_KOREAN } from '../languages/korean';
import { FD_LANGUAGE_MALAY } from '../languages/malay';
import { FD_LANGUAGE_NORWEGIAN } from '../languages/norwegian';
import { FD_LANGUAGE_POLISH } from '../languages/polish';
import { FD_LANGUAGE_PORTUGUESE } from '../languages/portuguese';
import { FD_LANGUAGE_ROMANIAN } from '../languages/romanian';
import { FD_LANGUAGE_RUSSIAN } from '../languages/russian';
import { FD_LANGUAGE_SERBIAN } from '../languages/serbian';
import { FD_LANGUAGE_SLOVAK } from '../languages/slovak';
import { FD_LANGUAGE_SLOVENIAN } from '../languages/slovenian';
import { FD_LANGUAGE_SPANISH } from '../languages/spanish';
import { FD_LANGUAGE_SWEDISH } from '../languages/swedish';
import { FD_LANGUAGE_THAI } from '../languages/thai';
import { FD_LANGUAGE_TURKISH } from '../languages/turkish';
import { FD_LANGUAGE_UKRAINIAN } from '../languages/ukrainian';
import { FdLanguage } from '../models/fd-language';

/** All built-in languages keyed by their locale code. */
const ALL_LANGUAGES: readonly [string, FdLanguage][] = [
    ['sq', FD_LANGUAGE_ALBANIAN],
    ['ar', FD_LANGUAGE_ARABIC],
    ['bg', FD_LANGUAGE_BULGARIAN],
    ['zh-hans', FD_LANGUAGE_CHINESE_SIMPLIFIED],
    ['zh-hant', FD_LANGUAGE_CHINESE_TRADITIONAL],
    ['zh', FD_LANGUAGE_CHINESE_SIMPLIFIED],
    ['hr', FD_LANGUAGE_CROATIAN],
    ['cs', FD_LANGUAGE_CZECH],
    ['da', FD_LANGUAGE_DANISH],
    ['nl', FD_LANGUAGE_DUTCH],
    ['en', FD_LANGUAGE_ENGLISH],
    ['fi', FD_LANGUAGE_FINNISH],
    ['fr', FD_LANGUAGE_FRENCH],
    ['ka', FD_LANGUAGE_GEORGIAN],
    ['de', FD_LANGUAGE_GERMAN],
    ['el', FD_LANGUAGE_GREEK],
    ['he', FD_LANGUAGE_HEBREW],
    ['hi', FD_LANGUAGE_HINDI],
    ['hu', FD_LANGUAGE_HUNGARIAN],
    ['it', FD_LANGUAGE_ITALIAN],
    ['ja', FD_LANGUAGE_JAPANESE],
    ['kk', FD_LANGUAGE_KAZAKH],
    ['ko', FD_LANGUAGE_KOREAN],
    ['ms', FD_LANGUAGE_MALAY],
    ['no', FD_LANGUAGE_NORWEGIAN],
    ['pl', FD_LANGUAGE_POLISH],
    ['pt', FD_LANGUAGE_PORTUGUESE],
    ['ro', FD_LANGUAGE_ROMANIAN],
    ['ru', FD_LANGUAGE_RUSSIAN],
    ['sr', FD_LANGUAGE_SERBIAN],
    ['sk', FD_LANGUAGE_SLOVAK],
    ['sl', FD_LANGUAGE_SLOVENIAN],
    ['es', FD_LANGUAGE_SPANISH],
    ['sv', FD_LANGUAGE_SWEDISH],
    ['th', FD_LANGUAGE_THAI],
    ['tr', FD_LANGUAGE_TURKISH],
    ['uk', FD_LANGUAGE_UKRAINIAN]
];

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

/** Locale-code-to-language lookup built from ALL_LANGUAGES. */
const LOCALE_MAP = new Map<string, FdLanguage>(ALL_LANGUAGES);

/**
 * Maps a locale string (e.g. from Angular `LOCALE_ID`) to the best-matching
 * built-in `FdLanguage`. Falls back to `FD_LANGUAGE_ENGLISH` when no match is found.
 *
 * Resolution order:
 * 1. Exact locale match (case-insensitive)
 * 2. Chinese region-to-script mapping (`zh-CN` → `zh-Hans`)
 * 3. Locale alias resolution (`nb` → `no`)
 * 4. Base language match (`pt-BR` → `pt`)
 * 5. Fallback to English
 */
export function detectLanguage(locale: string): FdLanguage {
    const normalized = locale.trim().toLowerCase();
    if (!normalized) {
        return FD_LANGUAGE_ENGLISH;
    }

    // 1. Exact match
    const exact = LOCALE_MAP.get(normalized);
    if (exact) {
        return exact;
    }

    // 2. Chinese region-to-script mapping (e.g. zh-CN → zh-Hans)
    if (normalized.startsWith('zh-')) {
        const parts = normalized.split('-');
        const region = parts[parts.length - 1];
        const script = CHINESE_REGION_TO_SCRIPT[region];
        if (script) {
            return LOCALE_MAP.get(script) ?? FD_LANGUAGE_ENGLISH;
        }
    }

    // 3. Alias resolution (nb→no, nn→no, iw→he)
    const alias = LOCALE_ALIASES[normalized];
    if (alias) {
        return LOCALE_MAP.get(alias) ?? FD_LANGUAGE_ENGLISH;
    }

    // 4. Base language match (pt-BR → pt)
    const base = normalized.split('-')[0];
    const baseMatch = LOCALE_MAP.get(base);
    if (baseMatch) {
        return baseMatch;
    }

    // 4b. Alias on base (e.g. nb-NO → nb → no)
    const baseAlias = LOCALE_ALIASES[base];
    if (baseAlias) {
        return LOCALE_MAP.get(baseAlias) ?? FD_LANGUAGE_ENGLISH;
    }

    // 5. Fallback
    return FD_LANGUAGE_ENGLISH;
}
