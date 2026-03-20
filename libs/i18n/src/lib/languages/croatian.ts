import { FdLanguage } from '../models';
import json from '../translations/translations_hr';

export const FD_LANGUAGE_CROATIAN: FdLanguage = { ...(json as FdLanguage), locale: 'hr', name: 'Hrvatski' };
