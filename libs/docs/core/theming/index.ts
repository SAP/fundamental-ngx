import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./theming-header/theming-header.component').then((c) => c.ThemingHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./theming-docs.component').then((c) => c.ThemingDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'theming';
export const API_FILE_KEY = 'theming';
