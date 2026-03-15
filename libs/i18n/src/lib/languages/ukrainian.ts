import { FdLanguage } from '../models';
import json from '../translations/translations_uk';

export const FD_LANGUAGE_UKRAINIAN: FdLanguage = { ...(json as FdLanguage), locale: 'uk', name: 'Українська' };
