import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations_da';

export const FD_LANGUAGE_DANISH: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'da',
    name: 'Dansk'
};
