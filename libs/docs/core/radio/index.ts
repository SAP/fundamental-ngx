import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./radio-header/radio-header.component').then((c) => c.RadioHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./radio-docs.component').then((c) => c.RadioDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'radio';
export const API_FILE_KEY = 'form';
