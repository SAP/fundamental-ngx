import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations_tr';

export const FD_LANGUAGE_TURKISH: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'tr',
    name: 'Türkçe'
};
