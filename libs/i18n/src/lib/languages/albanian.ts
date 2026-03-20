import { FdLanguage } from '../models';
import json from '../translations/translations_sq';

export const FD_LANGUAGE_ALBANIAN: FdLanguage = { ...(json as FdLanguage), locale: 'sq', name: 'Shqip' };
