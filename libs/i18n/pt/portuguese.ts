import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations_pt';

export const FD_LANGUAGE_PORTUGUESE: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'pt',
    name: 'Português'
};
