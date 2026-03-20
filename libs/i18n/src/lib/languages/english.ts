import { FdLanguage } from '../models';
import json from '../translations/translations';

export const FD_LANGUAGE_ENGLISH: FdLanguage = { ...(json as FdLanguage), locale: 'en', name: 'English' };
