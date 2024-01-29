import { FdLanguage } from '../models';
import { translationTester } from '../utils/translation-tester';
import translations from './translations_es';

describe('libs/i18n/src/lib/translations/translations_es.spec.ts', () =>
    translationTester(translations as unknown as FdLanguage));
