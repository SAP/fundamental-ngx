import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations_de';

export const FD_LANGUAGE_GERMAN: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'de',
    name: 'Deutsch'
};
