import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations_hr';

export const FD_LANGUAGE_CROATIAN: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'hr',
    name: 'Hrvatski'
};
