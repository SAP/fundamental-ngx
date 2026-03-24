import { FdLanguage } from '../models';
import json from '../translations/translations_kk';

export const FD_LANGUAGE_KAZAKH: FdLanguage = { ...(json as FdLanguage), locale: 'kk', name: 'Қазақ тілі' };
