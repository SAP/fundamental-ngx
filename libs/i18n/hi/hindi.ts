import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations_hi';

export const FD_LANGUAGE_HINDI: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'hi',
    name: 'हिन्दी'
};
