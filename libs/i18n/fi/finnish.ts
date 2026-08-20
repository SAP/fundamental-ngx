import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations_fi';

export const FD_LANGUAGE_FINNISH: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'fi',
    name: 'Suomi'
};
