import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./link-header/link-header.component').then((c) => c.LinkHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./link-docs.component').then((c) => c.LinkDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'link';
export const API_FILE_KEY = 'link';
