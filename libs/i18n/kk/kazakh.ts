import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations_kk';

export const FD_LANGUAGE_KAZAKH: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'kk',
    name: 'Қазақ тілі'
};
