import { FdLanguage } from '../models';
import json from '../translations/translations_bg';

export const FD_LANGUAGE_BULGARIAN: FdLanguage = { ...(json as FdLanguage), locale: 'bg', name: 'Български' };
