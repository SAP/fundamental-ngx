import { Routes } from '@angular/router';
import { DynamicPageDocs } from './dynamic-page-docs';
import { DynamicPageHeader } from './header/dynamic-page-header';

export const ROUTES: Routes = [
    {
        path: '',
        component: DynamicPageHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: DynamicPageDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'dynamic-page';
export const API_FILE_KEY = 'dynamicPage';

export * from './dynamic-page-docs';
export * from './examples/dynamic-page-sample';
export * from './header/dynamic-page-header';
