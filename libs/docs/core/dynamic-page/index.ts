import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./dynamic-page-header/dynamic-page-docs-header.component').then(
                (c) => c.DynamicPageDocsHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () => import('./dynamic-page-docs.component').then((c) => c.DynamicPageDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'dynamic-page';
export const API_FILE_KEY = 'dynamicPage';
