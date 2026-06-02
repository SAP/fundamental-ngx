import { FdLanguage } from '../models';
import { translationTester } from '../utils/translation-tester';
import translations from './translations_iw';

describe('libs/i18n/src/lib/translations/translations_iw.spec.ts', () =>
    translationTester(translations as unknown as FdLanguage));
