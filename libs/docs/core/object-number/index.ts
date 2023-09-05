import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./object-number-header/object-number-header.component').then((c) => c.ObjectNumberHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./object-number-docs.component').then((c) => c.ObjectNumberDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'object-number';
export const API_FILE_KEY = 'objectNumber';
