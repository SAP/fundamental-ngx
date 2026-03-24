import { FdLanguage } from '../models';
import json from '../translations/translations_ja';

export const FD_LANGUAGE_JAPANESE: FdLanguage = { ...(json as FdLanguage), locale: 'ja', name: '日本語' };
