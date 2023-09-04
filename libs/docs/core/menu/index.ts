import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./menu-header/menu-header.component').then((c) => c.MenuHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./menu-docs.component').then((c) => c.MenuDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'menu';
export const API_FILE_KEY = 'menu';
