import { FdLanguage } from '../models';
import json from '../translations/translations_ru';

export const FD_LANGUAGE_RUSSIAN: FdLanguage = { ...(json as FdLanguage), locale: 'ru', name: 'Русский' };
