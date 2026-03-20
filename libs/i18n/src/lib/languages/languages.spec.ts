import { FdLanguage } from '../models';
import { FD_LANGUAGE_ALBANIAN } from './albanian';
import { FD_LANGUAGE_ARABIC } from './arabic';
import { FD_LANGUAGE_BULGARIAN } from './bulgarian';
import { FD_LANGUAGE_CHINESE, FD_LANGUAGE_CHINESE_SIMPLIFIED } from './chinese_simplified';
import { FD_LANGUAGE_CHINESE_TRADITIONAL } from './chinese_traditional';
import { FD_LANGUAGE_CROATIAN } from './croatian';
import { FD_LANGUAGE_CZECH } from './czech';
import { FD_LANGUAGE_DANISH } from './danish';
import { FD_LANGUAGE_DUTCH } from './dutch';
import { FD_LANGUAGE_ENGLISH } from './english';
import { FD_LANGUAGE_FINNISH } from './finnish';
import { FD_LANGUAGE_FRENCH } from './french';
import { FD_LANGUAGE_GEORGIAN } from './georgian';
import { FD_LANGUAGE_GERMAN } from './german';
import { FD_LANGUAGE_GREEK } from './greek';
import { FD_LANGUAGE_HEBREW } from './hebrew';
import { FD_LANGUAGE_HINDI } from './hindi';
import { FD_LANGUAGE_HUNGARIAN } from './hungarian';
import { FD_LANGUAGE_ITALIAN } from './italian';
import { FD_LANGUAGE_JAPANESE } from './japanese';
import { FD_LANGUAGE_KAZAKH } from './kazakh';
import { FD_LANGUAGE_KOREAN } from './korean';
import { FD_LANGUAGE_MALAY } from './malay';
import { FD_LANGUAGE_NORWEGIAN } from './norwegian';
import { FD_LANGUAGE_POLISH } from './polish';
import { FD_LANGUAGE_PORTUGUESE } from './portuguese';
import { FD_LANGUAGE_ROMANIAN } from './romanian';
import { FD_LANGUAGE_RUSSIAN } from './russian';
import { FD_LANGUAGE_SERBIAN } from './serbian';
import { FD_LANGUAGE_SLOVAK } from './slovak';
import { FD_LANGUAGE_SLOVENIAN } from './slovenian';
import { FD_LANGUAGE_SPANISH } from './spanish';
import { FD_LANGUAGE_SWEDISH } from './swedish';
import { FD_LANGUAGE_THAI } from './thai';
import { FD_LANGUAGE_TURKISH } from './turkish';
import { FD_LANGUAGE_UKRAINIAN } from './ukrainian';

const ALL_LANGUAGES: { constant: FdLanguage; expectedLocale: string; expectedName: string }[] = [
    { constant: FD_LANGUAGE_ALBANIAN, expectedLocale: 'sq', expectedName: 'Shqip' },
    { constant: FD_LANGUAGE_ARABIC, expectedLocale: 'ar', expectedName: 'العربية' },
    { constant: FD_LANGUAGE_BULGARIAN, expectedLocale: 'bg', expectedName: 'Български' },
    { constant: FD_LANGUAGE_CHINESE, expectedLocale: 'zh-Hans', expectedName: '简体中文' },
    { constant: FD_LANGUAGE_CHINESE_SIMPLIFIED, expectedLocale: 'zh-Hans', expectedName: '简体中文' },
    { constant: FD_LANGUAGE_CHINESE_TRADITIONAL, expectedLocale: 'zh-Hant', expectedName: '繁體中文' },
    { constant: FD_LANGUAGE_CROATIAN, expectedLocale: 'hr', expectedName: 'Hrvatski' },
    { constant: FD_LANGUAGE_CZECH, expectedLocale: 'cs', expectedName: 'Český' },
    { constant: FD_LANGUAGE_DANISH, expectedLocale: 'da', expectedName: 'Dansk' },
    { constant: FD_LANGUAGE_DUTCH, expectedLocale: 'nl', expectedName: 'Nederlands' },
    { constant: FD_LANGUAGE_ENGLISH, expectedLocale: 'en', expectedName: 'English' },
    { constant: FD_LANGUAGE_FINNISH, expectedLocale: 'fi', expectedName: 'Suomi' },
    { constant: FD_LANGUAGE_FRENCH, expectedLocale: 'fr', expectedName: 'Français' },
    { constant: FD_LANGUAGE_GEORGIAN, expectedLocale: 'ka', expectedName: 'ქართული' },
    { constant: FD_LANGUAGE_GERMAN, expectedLocale: 'de', expectedName: 'Deutsch' },
    { constant: FD_LANGUAGE_GREEK, expectedLocale: 'el', expectedName: 'Ελληνικά' },
    { constant: FD_LANGUAGE_HEBREW, expectedLocale: 'he', expectedName: 'עִברִית' },
    { constant: FD_LANGUAGE_HINDI, expectedLocale: 'hi', expectedName: 'हिन्दी' },
    { constant: FD_LANGUAGE_HUNGARIAN, expectedLocale: 'hu', expectedName: 'Magyar' },
    { constant: FD_LANGUAGE_ITALIAN, expectedLocale: 'it', expectedName: 'Italiano' },
    { constant: FD_LANGUAGE_JAPANESE, expectedLocale: 'ja', expectedName: '日本語' },
    { constant: FD_LANGUAGE_KAZAKH, expectedLocale: 'kk', expectedName: 'Қазақ тілі' },
    { constant: FD_LANGUAGE_KOREAN, expectedLocale: 'ko', expectedName: '한국어' },
    { constant: FD_LANGUAGE_MALAY, expectedLocale: 'ms', expectedName: 'Melayu' },
    { constant: FD_LANGUAGE_NORWEGIAN, expectedLocale: 'no', expectedName: 'Norsk' },
    { constant: FD_LANGUAGE_POLISH, expectedLocale: 'pl', expectedName: 'Polski' },
    { constant: FD_LANGUAGE_PORTUGUESE, expectedLocale: 'pt', expectedName: 'Português' },
    { constant: FD_LANGUAGE_ROMANIAN, expectedLocale: 'ro', expectedName: 'Română' },
    { constant: FD_LANGUAGE_RUSSIAN, expectedLocale: 'ru', expectedName: 'Русский' },
    { constant: FD_LANGUAGE_SERBIAN, expectedLocale: 'sr', expectedName: 'Српски' },
    { constant: FD_LANGUAGE_SLOVAK, expectedLocale: 'sk', expectedName: 'Slovenský' },
    { constant: FD_LANGUAGE_SLOVENIAN, expectedLocale: 'sl', expectedName: 'Slovenščina' },
    { constant: FD_LANGUAGE_SPANISH, expectedLocale: 'es', expectedName: 'Español' },
    { constant: FD_LANGUAGE_SWEDISH, expectedLocale: 'sv', expectedName: 'Svenska' },
    { constant: FD_LANGUAGE_THAI, expectedLocale: 'th', expectedName: 'ไทย' },
    { constant: FD_LANGUAGE_TURKISH, expectedLocale: 'tr', expectedName: 'Türkçe' },
    { constant: FD_LANGUAGE_UKRAINIAN, expectedLocale: 'uk', expectedName: 'Українська' }
];

describe('Language metadata', () => {
    it('should have locale and name on every built-in language', () => {
        for (const { constant } of ALL_LANGUAGES) {
            expect(constant.locale).toBeDefined();
            expect(constant.name).toBeDefined();
            expect(typeof constant.locale).toBe('string');
            expect(typeof constant.name).toBe('string');
            expect((constant.locale as string).length).toBeGreaterThan(0);
            expect((constant.name as string).length).toBeGreaterThan(0);
        }
    });

    it('should have correct locale and name for English', () => {
        expect(FD_LANGUAGE_ENGLISH.locale).toBe('en');
        expect(FD_LANGUAGE_ENGLISH.name).toBe('English');
    });

    it('should have correct locale and name for German', () => {
        expect(FD_LANGUAGE_GERMAN.locale).toBe('de');
        expect(FD_LANGUAGE_GERMAN.name).toBe('Deutsch');
    });

    it('should have correct locale and name for Chinese Simplified', () => {
        expect(FD_LANGUAGE_CHINESE_SIMPLIFIED.locale).toBe('zh-Hans');
        expect(FD_LANGUAGE_CHINESE_SIMPLIFIED.name).toBe('简体中文');
    });

    it('should have correct locale and name for Chinese Traditional', () => {
        expect(FD_LANGUAGE_CHINESE_TRADITIONAL.locale).toBe('zh-Hant');
        expect(FD_LANGUAGE_CHINESE_TRADITIONAL.name).toBe('繁體中文');
    });

    it('should have matching locale on FD_LANGUAGE_CHINESE and FD_LANGUAGE_CHINESE_SIMPLIFIED', () => {
        expect(FD_LANGUAGE_CHINESE.locale).toBe(FD_LANGUAGE_CHINESE_SIMPLIFIED.locale);
        expect(FD_LANGUAGE_CHINESE.name).toBe(FD_LANGUAGE_CHINESE_SIMPLIFIED.name);
    });

    it('should have correct locale and name for all languages', () => {
        for (const { constant, expectedLocale, expectedName } of ALL_LANGUAGES) {
            expect(constant.locale).toBe(expectedLocale);
            expect(constant.name).toBe(expectedName);
        }
    });

    it('should still have translation keys alongside metadata', () => {
        // Verify metadata does not break existing translation structure
        expect(FD_LANGUAGE_ENGLISH.coreBusyIndicator).toBeDefined();
        expect(typeof FD_LANGUAGE_ENGLISH.coreBusyIndicator.defaultTitle).toBe('string');
        expect(FD_LANGUAGE_GERMAN.coreBusyIndicator).toBeDefined();
        expect(typeof FD_LANGUAGE_GERMAN.coreBusyIndicator.defaultTitle).toBe('string');
    });
});
