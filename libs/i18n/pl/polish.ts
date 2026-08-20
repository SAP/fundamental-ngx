import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations_pl';

export const FD_LANGUAGE_POLISH: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'pl',
    name: 'Polski'
};
