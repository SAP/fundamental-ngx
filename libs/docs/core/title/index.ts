import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./title-header/title-header.component').then((c) => c.TitleHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./title-docs.component').then((c) => c.TitleDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'title';
export const API_FILE_KEY = 'title';
