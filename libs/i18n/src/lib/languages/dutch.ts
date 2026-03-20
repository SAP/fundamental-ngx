import { FdLanguage } from '../models';
import json from '../translations/translations_nl';

export const FD_LANGUAGE_DUTCH: FdLanguage = { ...(json as FdLanguage), locale: 'nl', name: 'Nederlands' };
