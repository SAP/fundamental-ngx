import type { FdLanguage } from '@fundamental-ngx/i18n';
import { registerLanguage } from '@fundamental-ngx/i18n';

import { FD_LANGUAGE_ARABIC } from '@fundamental-ngx/i18n/ar';
import { FD_LANGUAGE_BULGARIAN } from '@fundamental-ngx/i18n/bg';
import { FD_LANGUAGE_CZECH } from '@fundamental-ngx/i18n/cs';
import { FD_LANGUAGE_DANISH } from '@fundamental-ngx/i18n/da';
import { FD_LANGUAGE_GERMAN } from '@fundamental-ngx/i18n/de';
import { FD_LANGUAGE_GREEK } from '@fundamental-ngx/i18n/el';
import { FD_LANGUAGE_ENGLISH } from '@fundamental-ngx/i18n/en';
import { FD_LANGUAGE_SPANISH } from '@fundamental-ngx/i18n/es';
import { FD_LANGUAGE_FINNISH } from '@fundamental-ngx/i18n/fi';
import { FD_LANGUAGE_FRENCH } from '@fundamental-ngx/i18n/fr';
import { FD_LANGUAGE_HEBREW } from '@fundamental-ngx/i18n/he';
import { FD_LANGUAGE_HINDI } from '@fundamental-ngx/i18n/hi';
import { FD_LANGUAGE_CROATIAN } from '@fundamental-ngx/i18n/hr';
import { FD_LANGUAGE_HUNGARIAN } from '@fundamental-ngx/i18n/hu';
import { FD_LANGUAGE_ITALIAN } from '@fundamental-ngx/i18n/it';
import { FD_LANGUAGE_JAPANESE } from '@fundamental-ngx/i18n/ja';
import { FD_LANGUAGE_GEORGIAN } from '@fundamental-ngx/i18n/ka';
import { FD_LANGUAGE_KAZAKH } from '@fundamental-ngx/i18n/kk';
import { FD_LANGUAGE_KOREAN } from '@fundamental-ngx/i18n/ko';
import { FD_LANGUAGE_MALAY } from '@fundamental-ngx/i18n/ms';
import { FD_LANGUAGE_DUTCH } from '@fundamental-ngx/i18n/nl';
import { FD_LANGUAGE_NORWEGIAN } from '@fundamental-ngx/i18n/no';
import { FD_LANGUAGE_POLISH } from '@fundamental-ngx/i18n/pl';
import { FD_LANGUAGE_PORTUGUESE } from '@fundamental-ngx/i18n/pt';
import { FD_LANGUAGE_ROMANIAN } from '@fundamental-ngx/i18n/ro';
import { FD_LANGUAGE_RUSSIAN } from '@fundamental-ngx/i18n/ru';
import { FD_LANGUAGE_SLOVAK } from '@fundamental-ngx/i18n/sk';
import { FD_LANGUAGE_SLOVENIAN } from '@fundamental-ngx/i18n/sl';
import { FD_LANGUAGE_ALBANIAN } from '@fundamental-ngx/i18n/sq';
import { FD_LANGUAGE_SERBIAN } from '@fundamental-ngx/i18n/sr';
import { FD_LANGUAGE_SWEDISH } from '@fundamental-ngx/i18n/sv';
import { FD_LANGUAGE_THAI } from '@fundamental-ngx/i18n/th';
import { FD_LANGUAGE_TURKISH } from '@fundamental-ngx/i18n/tr';
import { FD_LANGUAGE_UKRAINIAN } from '@fundamental-ngx/i18n/uk';
import { FD_LANGUAGE_CHINESE_SIMPLIFIED } from '@fundamental-ngx/i18n/zh-hans';
import { FD_LANGUAGE_CHINESE_TRADITIONAL } from '@fundamental-ngx/i18n/zh-hant';

/** @internal */
const ALL_BUILTIN_LANGUAGES: Array<{ lang: FdLanguage; aliases?: readonly string[] }> = [
    { lang: FD_LANGUAGE_ARABIC },
    { lang: FD_LANGUAGE_BULGARIAN },
    { lang: FD_LANGUAGE_CZECH },
    { lang: FD_LANGUAGE_DANISH },
    { lang: FD_LANGUAGE_GERMAN },
    { lang: FD_LANGUAGE_GREEK },
    { lang: FD_LANGUAGE_ENGLISH },
    { lang: FD_LANGUAGE_SPANISH },
    { lang: FD_LANGUAGE_FINNISH },
    { lang: FD_LANGUAGE_FRENCH },
    { lang: FD_LANGUAGE_HEBREW },
    { lang: FD_LANGUAGE_HINDI },
    { lang: FD_LANGUAGE_CROATIAN },
    { lang: FD_LANGUAGE_HUNGARIAN },
    { lang: FD_LANGUAGE_ITALIAN },
    { lang: FD_LANGUAGE_JAPANESE },
    { lang: FD_LANGUAGE_GEORGIAN },
    { lang: FD_LANGUAGE_KAZAKH },
    { lang: FD_LANGUAGE_KOREAN },
    { lang: FD_LANGUAGE_MALAY },
    { lang: FD_LANGUAGE_DUTCH },
    { lang: FD_LANGUAGE_NORWEGIAN },
    { lang: FD_LANGUAGE_POLISH },
    { lang: FD_LANGUAGE_PORTUGUESE },
    { lang: FD_LANGUAGE_ROMANIAN },
    { lang: FD_LANGUAGE_RUSSIAN },
    { lang: FD_LANGUAGE_SLOVAK },
    { lang: FD_LANGUAGE_SLOVENIAN },
    { lang: FD_LANGUAGE_ALBANIAN },
    { lang: FD_LANGUAGE_SERBIAN },
    { lang: FD_LANGUAGE_SWEDISH },
    { lang: FD_LANGUAGE_THAI },
    { lang: FD_LANGUAGE_TURKISH },
    { lang: FD_LANGUAGE_UKRAINIAN },
    { lang: FD_LANGUAGE_CHINESE_SIMPLIFIED, aliases: ['zh-hans', 'zh'] as const },
    { lang: FD_LANGUAGE_CHINESE_TRADITIONAL, aliases: ['zh-hant'] as const }
];

/** @internal */
export function registerAllBuiltinLanguages(): void {
    for (const { lang, aliases } of ALL_BUILTIN_LANGUAGES) {
        registerLanguage(lang, ...(aliases ?? []));
    }
}
