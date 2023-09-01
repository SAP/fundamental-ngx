import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./token-header/token-header.component').then((c) => c.TokenHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./token-docs.component').then((c) => c.TokenDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'token';
export const API_FILE_KEY = 'token';
