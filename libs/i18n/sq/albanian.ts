import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations_sq';

export const FD_LANGUAGE_ALBANIAN: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'sq',
    name: 'Shqip'
};
