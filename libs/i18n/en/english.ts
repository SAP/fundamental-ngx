import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations';

export const FD_LANGUAGE_ENGLISH: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'en',
    name: 'English'
};
