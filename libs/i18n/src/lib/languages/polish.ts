import { FdLanguage } from '../models';
import json from '../translations/translations_pl';

export const FD_LANGUAGE_POLISH: FdLanguage = { ...(json as FdLanguage), locale: 'pl', name: 'Polski' };
