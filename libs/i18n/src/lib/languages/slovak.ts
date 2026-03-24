import { FdLanguage } from '../models';
import json from '../translations/translations_sk';

export const FD_LANGUAGE_SLOVAK: FdLanguage = { ...(json as FdLanguage), locale: 'sk', name: 'Slovenský' };
