import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./text-header/text-header.component').then((c) => c.TextHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./text-docs.component').then((c) => c.TextDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'text';
export const API_FILE_KEY = 'text';
export const I18N_KEY = 'coreText';
