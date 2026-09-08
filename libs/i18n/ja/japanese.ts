import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations_ja';

export const FD_LANGUAGE_JAPANESE: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'ja',
    name: '日本語'
};
