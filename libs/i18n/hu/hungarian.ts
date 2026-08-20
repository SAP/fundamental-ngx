import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations_hu';

export const FD_LANGUAGE_HUNGARIAN: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'hu',
    name: 'Magyar'
};
