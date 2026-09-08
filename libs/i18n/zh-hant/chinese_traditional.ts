import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations_zh_TW';

export const FD_LANGUAGE_CHINESE_TRADITIONAL: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'zh-Hant',
    name: '繁體中文'
};
