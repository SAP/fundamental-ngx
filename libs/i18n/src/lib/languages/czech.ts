import { FdLanguage } from '../models';
import json from '../translations/translations_cs';

export const FD_LANGUAGE_CZECH: FdLanguage = { ...(json as FdLanguage), locale: 'cs', name: 'Český' };
