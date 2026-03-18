import { FdLanguage } from '../models';
import json from '../translations/translations_ar';

export const FD_LANGUAGE_ARABIC: FdLanguage = { ...(json as FdLanguage), locale: 'ar', name: 'العربية' };
