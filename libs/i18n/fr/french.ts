import type { FdLanguage } from '@fundamental-ngx/i18n';
import json from './translations_fr';

export const FD_LANGUAGE_FRENCH: FdLanguage = {
    ...(json as FdLanguage),
    locale: 'fr',
    name: 'Français'
};
