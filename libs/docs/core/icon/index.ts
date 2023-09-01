import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./icon-header/icon-header.component').then((c) => c.IconHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./icon-docs.component').then((c) => c.IconDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'icon';
export const API_FILE_KEY = 'icon';
