import { FdLanguage } from '../models';
import json from '../translations/translations_fi';

export const FD_LANGUAGE_FINNISH: FdLanguage = { ...(json as FdLanguage), locale: 'fi', name: 'Suomi' };
