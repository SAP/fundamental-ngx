import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./object-page-header/object-page-docs-header.component').then(
                (c) => c.ObjectPageDocsHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () => import('./object-page-docs.component').then((c) => c.ObjectPageDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'object-page';
export const API_FILE_KEY = 'dynamicPage';
