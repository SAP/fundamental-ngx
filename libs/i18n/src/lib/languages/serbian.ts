import { FdLanguage } from '../models';
import json from '../translations/translations_sh';

export const FD_LANGUAGE_SERBIAN: FdLanguage = { ...(json as FdLanguage), locale: 'sr', name: 'Српски' };
