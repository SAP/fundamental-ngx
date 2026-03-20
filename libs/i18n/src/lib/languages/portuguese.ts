import { FdLanguage } from '../models';
import json from '../translations/translations_pt';

export const FD_LANGUAGE_PORTUGUESE: FdLanguage = { ...(json as FdLanguage), locale: 'pt', name: 'Português' };
