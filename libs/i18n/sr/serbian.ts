import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations_sr';

export const FD_LANGUAGE_SERBIAN: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'sr',
    name: 'Српски'
};
