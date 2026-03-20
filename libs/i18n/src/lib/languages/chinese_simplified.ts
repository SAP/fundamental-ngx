import { FdLanguage } from '../models';
import json from '../translations/translations_zh_CN';

export const FD_LANGUAGE_CHINESE_SIMPLIFIED: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'zh-Hans',
    name: '简体中文'
};
export const FD_LANGUAGE_CHINESE = FD_LANGUAGE_CHINESE_SIMPLIFIED;
