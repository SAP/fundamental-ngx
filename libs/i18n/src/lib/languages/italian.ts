import { FdLanguage } from '../models';
import json from '../translations/translations_it';

export const FD_LANGUAGE_ITALIAN: FdLanguage = { ...(json as FdLanguage), locale: 'it', name: 'Italiano' };
