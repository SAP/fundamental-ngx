import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations_ro';

export const FD_LANGUAGE_ROMANIAN: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'ro',
    name: 'Română'
};
