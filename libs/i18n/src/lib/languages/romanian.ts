import { FdLanguage } from '../models';
import json from '../translations/translations_ro';

export const FD_LANGUAGE_ROMANIAN: FdLanguage = { ...(json as FdLanguage), locale: 'ro', name: 'Română' };
