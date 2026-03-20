import { FdLanguage } from '../models';
import json from '../translations/translations_hu';

export const FD_LANGUAGE_HUNGARIAN: FdLanguage = { ...(json as FdLanguage), locale: 'hu', name: 'Magyar' };
