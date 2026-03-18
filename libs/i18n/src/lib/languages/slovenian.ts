import { FdLanguage } from '../models';
import json from '../translations/translations_sl';

export const FD_LANGUAGE_SLOVENIAN: FdLanguage = { ...(json as FdLanguage), locale: 'sl', name: 'Slovenščina' };
