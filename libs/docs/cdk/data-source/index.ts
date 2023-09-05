import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./data-source-header/data-source-header.component').then((c) => c.DataSourceHeaderComponent),
        data: {
            primary: true
        },
        children: [
            {
                path: '',
                loadComponent: () => import('./data-source-docs.component').then((c) => c.DataSourceDocsComponent)
            }
        ]
    }
];

export const LIBRARY_NAME = 'data-source';
export const API_FILE_KEY = 'dataSource';
