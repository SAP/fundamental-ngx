import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./button-header/button-header.component').then((c) => c.ButtonHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./button-docs.component').then((c) => c.ButtonDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'button';
