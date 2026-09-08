import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations_el';

export const FD_LANGUAGE_GREEK: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'el',
    name: 'Ελληνικά'
};
