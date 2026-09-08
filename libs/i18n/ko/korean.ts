import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations_ko';

export const FD_LANGUAGE_KOREAN: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'ko',
    name: '한국어'
};
