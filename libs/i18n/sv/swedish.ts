import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations_sv';

export const FD_LANGUAGE_SWEDISH: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'sv',
    name: 'Svenska'
};
