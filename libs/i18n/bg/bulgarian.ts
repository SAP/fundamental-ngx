import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations_bg';

export const FD_LANGUAGE_BULGARIAN: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'bg',
    name: 'Български'
};
