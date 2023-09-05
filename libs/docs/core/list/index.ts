import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./list-header/list-header.component').then((c) => c.ListHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./list-docs.component').then((c) => c.ListDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'list';
export const API_FILE_KEY = 'list';
