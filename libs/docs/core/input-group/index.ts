import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./input-group-header/input-group-header.component').then((c) => c.InputGroupHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./input-group-docs.component').then((c) => c.InputGroupDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'input-group';
export const API_FILE_KEY = 'inputGroup';
