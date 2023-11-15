import { FdLanguage } from '../models/lang';
import { translationTester } from '../utils/translation-tester';
import translations from './translations_sq';

describe('libs/i18n/src/lib/translations/translations_sq.spec.ts', () =>
    translationTester(translations as unknown as FdLanguage));
