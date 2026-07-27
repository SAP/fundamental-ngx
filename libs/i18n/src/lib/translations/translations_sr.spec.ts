import { FdLanguage } from '../models';
import { translationTester } from '../utils/translation-tester';
import translations from './translations_sr';

describe('libs/i18n/src/lib/translations/translations_sr.spec.ts', () =>
    translationTester(translations as unknown as FdLanguage));
