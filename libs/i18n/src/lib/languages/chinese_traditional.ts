import { FdLanguage } from '../models';
import json from '../translations/translations_zh_TW';

export const FD_LANGUAGE_CHINESE_TRADITIONAL: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'zh-Hant',
    name: '繁體中文'
};
