import { FdLanguage } from '../models/lang';
import { translationTester } from '../utils/translation-tester';
import translations from './translations_ar';

describe('libs/i18n/src/lib/translations/translations_ar.spec.ts', () =>
    translationTester(translations as unknown as FdLanguage));
