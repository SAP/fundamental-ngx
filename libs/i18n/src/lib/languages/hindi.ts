import { FdLanguage } from '../models';
import json from '../translations/translations_hi';

export const FD_LANGUAGE_HINDI: FdLanguage = { ...(json as FdLanguage), locale: 'hi', name: 'हिन्दी' };
