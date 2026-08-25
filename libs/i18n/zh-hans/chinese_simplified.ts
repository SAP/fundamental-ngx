import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations_zh_CN';

// FD_LANGUAGE_CHINESE is a legacy alias for FD_LANGUAGE_CHINESE_SIMPLIFIED
export const FD_LANGUAGE_CHINESE_SIMPLIFIED: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'zh-Hans',
    name: '简体中文'
};

export const FD_LANGUAGE_CHINESE = FD_LANGUAGE_CHINESE_SIMPLIFIED;
