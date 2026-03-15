import { FdLanguage } from '../models';
import json from '../translations/translations_tr';

export const FD_LANGUAGE_TURKISH: FdLanguage = { ...(json as FdLanguage), locale: 'tr', name: 'Türkçe' };
