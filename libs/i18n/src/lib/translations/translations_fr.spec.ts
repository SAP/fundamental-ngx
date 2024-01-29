import { FdLanguage } from '../models';
import { translationTester } from '../utils/translation-tester';
import translations from './translations_fr';

describe('libs/i18n/src/lib/translations/translations_fr.spec.ts', () =>
    translationTester(translations as unknown as FdLanguage));
