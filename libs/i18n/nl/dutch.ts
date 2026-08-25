import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations_nl';

export const FD_LANGUAGE_DUTCH: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'nl',
    name: 'Nederlands'
};
