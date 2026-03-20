import { FdLanguage } from '../models';
import json from '../translations/translations_el';

export const FD_LANGUAGE_GREEK: FdLanguage = { ...(json as FdLanguage), locale: 'el', name: 'Ελληνικά' };
