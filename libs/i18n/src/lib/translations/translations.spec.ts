import { FdLanguage } from '../models/lang';
import { translationTester } from '../utils/translation-tester';
import translations from './translations';

describe('libs/i18n/src/lib/translations/translations.spec.ts', () =>
    translationTester(translations as unknown as FdLanguage));
