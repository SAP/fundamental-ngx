import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations_it';

export const FD_LANGUAGE_ITALIAN: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'it',
    name: 'Italiano'
};
