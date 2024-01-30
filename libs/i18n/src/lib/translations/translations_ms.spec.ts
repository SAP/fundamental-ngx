import { FdLanguage } from '../models';
import { translationTester } from '../utils/translation-tester';
import translations from './translations_ms';

describe('libs/i18n/src/lib/translations/translations_ms.spec.ts', () =>
    translationTester(translations as unknown as FdLanguage));
