import { Routes } from '@angular/router';
import { I18nHeader } from './header/i18n-header';
import { I18nDocs } from './i18n-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: I18nHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: I18nDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'i18n';
