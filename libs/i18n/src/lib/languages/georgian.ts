import { FdLanguage } from '../models';
import json from '../translations/translations_ka';

export const FD_LANGUAGE_GEORGIAN: FdLanguage = { ...(json as FdLanguage), locale: 'ka', name: 'ქართული' };
