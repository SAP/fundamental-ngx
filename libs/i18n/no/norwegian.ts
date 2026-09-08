import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations_no';

export const FD_LANGUAGE_NORWEGIAN: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'no',
    name: 'Norsk'
};
