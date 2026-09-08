import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations_es';

export const FD_LANGUAGE_SPANISH: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'es',
    name: 'Español'
};
