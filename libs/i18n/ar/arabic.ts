import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations_ar';

export const FD_LANGUAGE_ARABIC: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'ar',
    name: 'العربية'
};
