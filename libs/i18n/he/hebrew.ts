import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations_he';

export const FD_LANGUAGE_HEBREW: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'he',
    name: 'עִברִית'
};
