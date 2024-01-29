import { FdLanguage } from '../models';
import { translationTester } from '../utils/translation-tester';
import translations from './translations_sk';

describe('libs/i18n/src/lib/translations/translations_sk.spec.ts', () =>
    translationTester(translations as unknown as FdLanguage));
