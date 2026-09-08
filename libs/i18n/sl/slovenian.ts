import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations_sl';

export const FD_LANGUAGE_SLOVENIAN: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'sl',
    name: 'Slovenščina'
};
