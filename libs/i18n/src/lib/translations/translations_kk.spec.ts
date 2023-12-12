import { FdLanguage } from '../models/lang';
import { translationTester } from '../utils/translation-tester';
import translations from './translations_kk';

describe('libs/i18n/src/lib/translations/translations_kk.spec.ts', () =>
    translationTester(translations as unknown as FdLanguage));
