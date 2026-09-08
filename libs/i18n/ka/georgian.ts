import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations_ka';

export const FD_LANGUAGE_GEORGIAN: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'ka',
    name: 'ქართული'
};
