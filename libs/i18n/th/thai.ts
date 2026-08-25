import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations_th';

export const FD_LANGUAGE_THAI: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'th',
    name: 'ไทย'
};
