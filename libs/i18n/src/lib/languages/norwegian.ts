import { FdLanguage } from '../models';
import json from '../translations/translations_no';

export const FD_LANGUAGE_NORWEGIAN: FdLanguage = { ...(json as FdLanguage), locale: 'no', name: 'Norsk' };
