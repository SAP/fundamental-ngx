import { FdLanguage } from '../models';
import json from '../translations/translations_es';

export const FD_LANGUAGE_SPANISH: FdLanguage = { ...(json as FdLanguage), locale: 'es', name: 'Español' };
