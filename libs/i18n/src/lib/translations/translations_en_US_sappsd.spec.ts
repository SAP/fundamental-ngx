import { FdLanguage } from '../models';
import { translationTester } from '../utils/translation-tester';
import translations from './translations_en_US_sappsd';

describe('libs/i18n/src/lib/translations/translations_en_US_sappsd.spec.ts', () =>
    translationTester(translations as unknown as FdLanguage));
