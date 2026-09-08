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
import { detectLanguage, registerLanguage, resetRegistry } from './detect-language';

describe('detectLanguage', () => {
    // Register all languages so existing resolution tests work as before (all-languages-available).
    beforeEach(() => {
        registerLanguage(FD_LANGUAGE_ALBANIAN);
        registerLanguage(FD_LANGUAGE_ARABIC);
        registerLanguage(FD_LANGUAGE_BULGARIAN);
        registerLanguage(FD_LANGUAGE_CHINESE_SIMPLIFIED, 'zh-hans', 'zh');
        registerLanguage(FD_LANGUAGE_CHINESE_TRADITIONAL, 'zh-hant');
        registerLanguage(FD_LANGUAGE_CROATIAN);
        registerLanguage(FD_LANGUAGE_CZECH);
        registerLanguage(FD_LANGUAGE_DANISH);
        registerLanguage(FD_LANGUAGE_DUTCH);
        registerLanguage(FD_LANGUAGE_FINNISH);
        registerLanguage(FD_LANGUAGE_FRENCH);
        registerLanguage(FD_LANGUAGE_GEORGIAN);
        registerLanguage(FD_LANGUAGE_GERMAN);
        registerLanguage(FD_LANGUAGE_GREEK);
        registerLanguage(FD_LANGUAGE_HEBREW);
        registerLanguage(FD_LANGUAGE_HINDI);
        registerLanguage(FD_LANGUAGE_HUNGARIAN);
        registerLanguage(FD_LANGUAGE_ITALIAN);
        registerLanguage(FD_LANGUAGE_JAPANESE);
        registerLanguage(FD_LANGUAGE_KAZAKH);
        registerLanguage(FD_LANGUAGE_KOREAN);
        registerLanguage(FD_LANGUAGE_MALAY);
        registerLanguage(FD_LANGUAGE_NORWEGIAN);
        registerLanguage(FD_LANGUAGE_POLISH);
        registerLanguage(FD_LANGUAGE_PORTUGUESE);
        registerLanguage(FD_LANGUAGE_ROMANIAN);
        registerLanguage(FD_LANGUAGE_RUSSIAN);
        registerLanguage(FD_LANGUAGE_SERBIAN);
        registerLanguage(FD_LANGUAGE_SLOVAK);
        registerLanguage(FD_LANGUAGE_SLOVENIAN);
        registerLanguage(FD_LANGUAGE_SPANISH);
        registerLanguage(FD_LANGUAGE_SWEDISH);
        registerLanguage(FD_LANGUAGE_THAI);
        registerLanguage(FD_LANGUAGE_TURKISH);
        registerLanguage(FD_LANGUAGE_UKRAINIAN);
    });

    afterEach(() => {
        resetRegistry();
    });
    describe('exact match', () => {
        it('should match "de" to German', () => {
            expect(detectLanguage('de')).toBe(FD_LANGUAGE_GERMAN);
        });

        it('should match "zh-Hans" to Chinese Simplified', () => {
            expect(detectLanguage('zh-Hans')).toBe(FD_LANGUAGE_CHINESE_SIMPLIFIED);
        });

        it('should match "zh-Hant" to Chinese Traditional', () => {
            expect(detectLanguage('zh-Hant')).toBe(FD_LANGUAGE_CHINESE_TRADITIONAL);
        });

        it('should match "en" to English', () => {
            expect(detectLanguage('en')).toBe(FD_LANGUAGE_ENGLISH);
        });

        it('should match "fr" to French', () => {
            expect(detectLanguage('fr')).toBe(FD_LANGUAGE_FRENCH);
        });

        it('should match "ja" to Japanese', () => {
            expect(detectLanguage('ja')).toBe(FD_LANGUAGE_JAPANESE);
        });

        it('should match all supported locales', () => {
            const expected: [string, unknown][] = [
                ['sq', FD_LANGUAGE_ALBANIAN],
                ['ar', FD_LANGUAGE_ARABIC],
                ['bg', FD_LANGUAGE_BULGARIAN],
                ['hr', FD_LANGUAGE_CROATIAN],
                ['cs', FD_LANGUAGE_CZECH],
                ['da', FD_LANGUAGE_DANISH],
                ['nl', FD_LANGUAGE_DUTCH],
                ['fi', FD_LANGUAGE_FINNISH],
                ['ka', FD_LANGUAGE_GEORGIAN],
                ['el', FD_LANGUAGE_GREEK],
                ['he', FD_LANGUAGE_HEBREW],
                ['hi', FD_LANGUAGE_HINDI],
                ['hu', FD_LANGUAGE_HUNGARIAN],
                ['it', FD_LANGUAGE_ITALIAN],
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
            for (const [locale, language] of expected) {
                expect(detectLanguage(locale)).toBe(language);
            }
        });
    });

    describe('case insensitive', () => {
        it('should match "DE" to German', () => {
            expect(detectLanguage('DE')).toBe(FD_LANGUAGE_GERMAN);
        });

        it('should match "ZH-HANT" to Chinese Traditional', () => {
            expect(detectLanguage('ZH-HANT')).toBe(FD_LANGUAGE_CHINESE_TRADITIONAL);
        });

        it('should match "Fr" to French', () => {
            expect(detectLanguage('Fr')).toBe(FD_LANGUAGE_FRENCH);
        });
    });

    describe('regional variants (base language match)', () => {
        it('should match "pt-BR" to Portuguese', () => {
            expect(detectLanguage('pt-BR')).toBe(FD_LANGUAGE_PORTUGUESE);
        });

        it('should match "en-US" to English', () => {
            expect(detectLanguage('en-US')).toBe(FD_LANGUAGE_ENGLISH);
        });

        it('should match "en-GB" to English', () => {
            expect(detectLanguage('en-GB')).toBe(FD_LANGUAGE_ENGLISH);
        });

        it('should match "es-MX" to Spanish', () => {
            expect(detectLanguage('es-MX')).toBe(FD_LANGUAGE_SPANISH);
        });

        it('should match "fr-CA" to French', () => {
            expect(detectLanguage('fr-CA')).toBe(FD_LANGUAGE_FRENCH);
        });

        it('should match "de-AT" to German', () => {
            expect(detectLanguage('de-AT')).toBe(FD_LANGUAGE_GERMAN);
        });
    });

    describe('Chinese region-to-script mapping', () => {
        it('should match "zh-CN" to Chinese Simplified', () => {
            expect(detectLanguage('zh-CN')).toBe(FD_LANGUAGE_CHINESE_SIMPLIFIED);
        });

        it('should match "zh-SG" to Chinese Simplified', () => {
            expect(detectLanguage('zh-SG')).toBe(FD_LANGUAGE_CHINESE_SIMPLIFIED);
        });

        it('should match "zh-TW" to Chinese Traditional', () => {
            expect(detectLanguage('zh-TW')).toBe(FD_LANGUAGE_CHINESE_TRADITIONAL);
        });

        it('should match "zh-HK" to Chinese Traditional', () => {
            expect(detectLanguage('zh-HK')).toBe(FD_LANGUAGE_CHINESE_TRADITIONAL);
        });

        it('should match "zh-MO" to Chinese Traditional', () => {
            expect(detectLanguage('zh-MO')).toBe(FD_LANGUAGE_CHINESE_TRADITIONAL);
        });

        it('should match bare "zh" to Chinese Simplified', () => {
            expect(detectLanguage('zh')).toBe(FD_LANGUAGE_CHINESE_SIMPLIFIED);
        });
    });

    describe('locale aliases', () => {
        it('should match "nb" (Norwegian Bokmal) to Norwegian', () => {
            expect(detectLanguage('nb')).toBe(FD_LANGUAGE_NORWEGIAN);
        });

        it('should match "nn" (Norwegian Nynorsk) to Norwegian', () => {
            expect(detectLanguage('nn')).toBe(FD_LANGUAGE_NORWEGIAN);
        });

        it('should match "iw" (legacy Hebrew) to Hebrew', () => {
            expect(detectLanguage('iw')).toBe(FD_LANGUAGE_HEBREW);
        });

        it('should match "nb-NO" via base alias to Norwegian', () => {
            expect(detectLanguage('nb-NO')).toBe(FD_LANGUAGE_NORWEGIAN);
        });
    });

    describe('Serbian script variant', () => {
        it('should match "sr-Latn" to Serbian via base match', () => {
            expect(detectLanguage('sr-Latn')).toBe(FD_LANGUAGE_SERBIAN);
        });
    });

    describe('fallback', () => {
        it('should fallback to English for unsupported locale "sw"', () => {
            expect(detectLanguage('sw')).toBe(FD_LANGUAGE_ENGLISH);
        });

        it('should fallback to English for empty string', () => {
            expect(detectLanguage('')).toBe(FD_LANGUAGE_ENGLISH);
        });

        it('should fallback to English for unknown locale "xx-YY"', () => {
            expect(detectLanguage('xx-YY')).toBe(FD_LANGUAGE_ENGLISH);
        });
    });

    describe('whitespace handling', () => {
        it('should trim whitespace: " de " → German', () => {
            expect(detectLanguage(' de ')).toBe(FD_LANGUAGE_GERMAN);
        });

        it('should trim whitespace: " zh-CN " → Chinese Simplified', () => {
            expect(detectLanguage(' zh-CN ')).toBe(FD_LANGUAGE_CHINESE_SIMPLIFIED);
        });
    });
});

// Task 1.1 (RED): registry contract — these tests assert lazy-registry behavior and MUST FAIL
// against the current all-37 eager implementation.
describe('detectLanguage — lazy registry contract', () => {
    // The registry is module-level state; reset to English-only before each test.
    // resetRegistry() does not exist yet — it will be added alongside registerLanguage in Task 1.2.
    beforeEach(() => {
        resetRegistry();
    });

    it('English resolves without any explicit registration', () => {
        expect(detectLanguage('en')).toBe(FD_LANGUAGE_ENGLISH);
    });

    it('registerLanguage(FD_LANGUAGE_GERMAN) then detectLanguage("de") returns German', () => {
        registerLanguage(FD_LANGUAGE_GERMAN);
        expect(detectLanguage('de')).toBe(FD_LANGUAGE_GERMAN);
    });

    it('detectLanguage("de") with German NOT registered falls back to English', () => {
        // German not registered → must return English, not German
        expect(detectLanguage('de')).toBe(FD_LANGUAGE_ENGLISH);
    });

    it('alias resolution works for registered languages: registerLanguage(FD_LANGUAGE_NORWEGIAN) → detectLanguage("nb") returns Norwegian', () => {
        registerLanguage(FD_LANGUAGE_NORWEGIAN);
        expect(detectLanguage('nb')).toBe(FD_LANGUAGE_NORWEGIAN);
    });

    it('alias resolution returns English when aliased language is NOT registered: detectLanguage("nb") without Norwegian', () => {
        expect(detectLanguage('nb')).toBe(FD_LANGUAGE_ENGLISH);
    });

    it('base-language match works for registered languages: registerLanguage(FD_LANGUAGE_PORTUGUESE) → detectLanguage("pt-BR") returns Portuguese', () => {
        registerLanguage(FD_LANGUAGE_PORTUGUESE);
        expect(detectLanguage('pt-BR')).toBe(FD_LANGUAGE_PORTUGUESE);
    });

    it('base-language match returns English when base language is NOT registered: detectLanguage("pt-BR") without Portuguese', () => {
        expect(detectLanguage('pt-BR')).toBe(FD_LANGUAGE_ENGLISH);
    });

    it('Chinese region-to-script mapping works for registered language: registerLanguage(FD_LANGUAGE_CHINESE_SIMPLIFIED) → detectLanguage("zh-CN") returns Simplified', () => {
        registerLanguage(FD_LANGUAGE_CHINESE_SIMPLIFIED);
        expect(detectLanguage('zh-CN')).toBe(FD_LANGUAGE_CHINESE_SIMPLIFIED);
    });

    it('Chinese region-to-script returns English when Chinese Simplified is NOT registered: detectLanguage("zh-CN")', () => {
        expect(detectLanguage('zh-CN')).toBe(FD_LANGUAGE_ENGLISH);
    });
});
