import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./card-header/card-header.component').then((c) => c.CardHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./card-docs.component').then((c) => c.CardDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'card';
export const API_FILE_KEY = 'card';
