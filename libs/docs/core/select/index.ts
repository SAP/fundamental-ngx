import { Routes } from '@angular/router';
import { moduleDeprecationsProvider } from '@fundamental-ngx/cdk/utils';
import { DeprecatedSelectCSSClasses } from '@fundamental-ngx/core/select';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./select-header/select-header.component').then((c) => c.SelectHeaderComponent),
        providers: [moduleDeprecationsProvider(DeprecatedSelectCSSClasses)],
        children: [
            {
                path: '',
                loadComponent: () => import('./select-docs.component').then((c) => c.SelectDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'select';
export const API_FILE_KEY = 'select';
