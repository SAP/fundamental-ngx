import { FdLanguage } from '../models';
import json from '../translations/translations_he';

export const FD_LANGUAGE_HEBREW: FdLanguage = { ...(json as FdLanguage), locale: 'he', name: 'עִברִית' };
