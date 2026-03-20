import { FdLanguage } from '../models';
import json from '../translations/translations_de';

export const FD_LANGUAGE_GERMAN: FdLanguage = { ...(json as FdLanguage), locale: 'de', name: 'Deutsch' };
