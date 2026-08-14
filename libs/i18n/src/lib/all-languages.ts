import { FD_LANGUAGE_ALBANIAN } from './languages/albanian';
import { FD_LANGUAGE_ARABIC } from './languages/arabic';
import { FD_LANGUAGE_BULGARIAN } from './languages/bulgarian';
import { FD_LANGUAGE_CHINESE_SIMPLIFIED } from './languages/chinese_simplified';
import { FD_LANGUAGE_CHINESE_TRADITIONAL } from './languages/chinese_traditional';
import { FD_LANGUAGE_CROATIAN } from './languages/croatian';
import { FD_LANGUAGE_CZECH } from './languages/czech';
import { FD_LANGUAGE_DANISH } from './languages/danish';
import { FD_LANGUAGE_DUTCH } from './languages/dutch';
import { FD_LANGUAGE_ENGLISH } from './languages/english';
import { FD_LANGUAGE_FINNISH } from './languages/finnish';
import { FD_LANGUAGE_FRENCH } from './languages/french';
import { FD_LANGUAGE_GEORGIAN } from './languages/georgian';
import { FD_LANGUAGE_GERMAN } from './languages/german';
import { FD_LANGUAGE_GREEK } from './languages/greek';
import { FD_LANGUAGE_HEBREW } from './languages/hebrew';
import { FD_LANGUAGE_HINDI } from './languages/hindi';
import { FD_LANGUAGE_HUNGARIAN } from './languages/hungarian';
import { FD_LANGUAGE_ITALIAN } from './languages/italian';
import { FD_LANGUAGE_JAPANESE } from './languages/japanese';
import { FD_LANGUAGE_KAZAKH } from './languages/kazakh';
import { FD_LANGUAGE_KOREAN } from './languages/korean';
import { FD_LANGUAGE_MALAY } from './languages/malay';
import { FD_LANGUAGE_NORWEGIAN } from './languages/norwegian';
import { FD_LANGUAGE_POLISH } from './languages/polish';
import { FD_LANGUAGE_PORTUGUESE } from './languages/portuguese';
import { FD_LANGUAGE_ROMANIAN } from './languages/romanian';
import { FD_LANGUAGE_RUSSIAN } from './languages/russian';
import { FD_LANGUAGE_SERBIAN } from './languages/serbian';
import { FD_LANGUAGE_SLOVAK } from './languages/slovak';
import { FD_LANGUAGE_SLOVENIAN } from './languages/slovenian';
import { FD_LANGUAGE_SPANISH } from './languages/spanish';
import { FD_LANGUAGE_SWEDISH } from './languages/swedish';
import { FD_LANGUAGE_THAI } from './languages/thai';
import { FD_LANGUAGE_TURKISH } from './languages/turkish';
import { FD_LANGUAGE_UKRAINIAN } from './languages/ukrainian';
import { FdLanguage } from './models/fd-language';
import { registerLanguage } from './utils/detect-language';

/**
 * All 37 built-in languages with their canonical locale aliases.
 * Kept in a separate file so esbuild can tree-shake it when
 * provideAllFundamentalLanguages() is not called by the app.
 * @internal
 */
export const ALL_BUILTIN_LANGUAGES: Array<{ lang: FdLanguage; aliases?: string[] }> = [
    { lang: FD_LANGUAGE_ALBANIAN },
    { lang: FD_LANGUAGE_ARABIC },
    { lang: FD_LANGUAGE_BULGARIAN },
    { lang: FD_LANGUAGE_CHINESE_SIMPLIFIED, aliases: ['zh-hans', 'zh'] },
    { lang: FD_LANGUAGE_CHINESE_TRADITIONAL, aliases: ['zh-hant'] },
    { lang: FD_LANGUAGE_CROATIAN },
    { lang: FD_LANGUAGE_CZECH },
    { lang: FD_LANGUAGE_DANISH },
    { lang: FD_LANGUAGE_DUTCH },
    { lang: FD_LANGUAGE_ENGLISH },
    { lang: FD_LANGUAGE_FINNISH },
    { lang: FD_LANGUAGE_FRENCH },
    { lang: FD_LANGUAGE_GEORGIAN },
    { lang: FD_LANGUAGE_GERMAN },
    { lang: FD_LANGUAGE_GREEK },
    { lang: FD_LANGUAGE_HEBREW },
    { lang: FD_LANGUAGE_HINDI },
    { lang: FD_LANGUAGE_HUNGARIAN },
    { lang: FD_LANGUAGE_ITALIAN },
    { lang: FD_LANGUAGE_JAPANESE },
    { lang: FD_LANGUAGE_KAZAKH },
    { lang: FD_LANGUAGE_KOREAN },
    { lang: FD_LANGUAGE_MALAY },
    { lang: FD_LANGUAGE_NORWEGIAN },
    { lang: FD_LANGUAGE_POLISH },
    { lang: FD_LANGUAGE_PORTUGUESE },
    { lang: FD_LANGUAGE_ROMANIAN },
    { lang: FD_LANGUAGE_RUSSIAN },
    { lang: FD_LANGUAGE_SERBIAN },
    { lang: FD_LANGUAGE_SLOVAK },
    { lang: FD_LANGUAGE_SLOVENIAN },
    { lang: FD_LANGUAGE_SPANISH },
    { lang: FD_LANGUAGE_SWEDISH },
    { lang: FD_LANGUAGE_THAI },
    { lang: FD_LANGUAGE_TURKISH },
    { lang: FD_LANGUAGE_UKRAINIAN }
];

/** @internal */
export function registerAllBuiltinLanguages(): void {
    for (const { lang, aliases } of ALL_BUILTIN_LANGUAGES) {
        registerLanguage(lang, ...(aliases ?? []));
    }
}
