import { FdLanguage } from '../models';
import { translationTester } from '../utils/translation-tester';
import translations from './translations_da';

describe('libs/i18n/src/lib/translations/translations_da.spec.ts', () =>
    translationTester(translations as unknown as FdLanguage));
