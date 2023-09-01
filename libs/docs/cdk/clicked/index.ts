import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./clicked-header/clicked-header.component').then((c) => c.ClickedHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./clicked-docs.component').then((c) => c.ClickedDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'clicked';
export const API_FILE_KEY = 'clicked';
