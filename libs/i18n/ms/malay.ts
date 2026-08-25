import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations_ms';

export const FD_LANGUAGE_MALAY: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'ms',
    name: 'Melayu'
};
