import { FdLanguage } from '../models';
import json from '../translations/translations_ko';

export const FD_LANGUAGE_KOREAN: FdLanguage = { ...(json as FdLanguage), locale: 'ko', name: '한국어' };
