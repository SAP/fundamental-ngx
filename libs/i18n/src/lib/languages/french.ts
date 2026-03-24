import { FdLanguage } from '../models';
import json from '../translations/translations_fr';

export const FD_LANGUAGE_FRENCH: FdLanguage = { ...(json as FdLanguage), locale: 'fr', name: 'Français' };
