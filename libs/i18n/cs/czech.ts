import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations_cs';

export const FD_LANGUAGE_CZECH: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'cs',
    name: 'Český'
};
