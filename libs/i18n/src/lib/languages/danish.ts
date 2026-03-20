import { FdLanguage } from '../models';
import json from '../translations/translations_da';

export const FD_LANGUAGE_DANISH: FdLanguage = { ...(json as FdLanguage), locale: 'da', name: 'Dansk' };
