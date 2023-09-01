import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pagination-header/pagination-header.component').then((c) => c.PaginationHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./pagination-docs.component').then((c) => c.PaginationDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'pagination';
export const API_FILE_KEY = 'pagination';
