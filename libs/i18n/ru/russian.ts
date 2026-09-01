import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations_ru';

export const FD_LANGUAGE_RUSSIAN: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'ru',
    name: 'Русский'
};
