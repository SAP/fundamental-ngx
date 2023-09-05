import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./input-header/input-header.component').then((c) => c.InputHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./input-docs.component').then((c) => c.InputDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'input';
export const API_FILE_KEY = 'inputGroup';
