import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations_sk';

export const FD_LANGUAGE_SLOVAK: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'sk',
    name: 'Slovenský'
};
