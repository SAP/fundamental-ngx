import { FdLanguage } from '../models';
import json from '../translations/translations_th';

export const FD_LANGUAGE_THAI: FdLanguage = { ...(json as FdLanguage), locale: 'th', name: 'แบบไทย' };
