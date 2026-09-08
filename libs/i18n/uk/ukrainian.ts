import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations_uk';

export const FD_LANGUAGE_UKRAINIAN: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'uk',
    name: 'Українська'
};
