import { FdLanguage } from '../models';
import json from '../translations/translations_ms';

export const FD_LANGUAGE_MALAY: FdLanguage = { ...(json as FdLanguage), locale: 'ms', name: 'Melayu' };
