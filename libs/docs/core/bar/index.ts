import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./bar-header/bar-header.component').then((c) => c.BarHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./bar-docs.component').then((c) => c.BarDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'bar';
export const API_FILE_KEY = 'bar';
