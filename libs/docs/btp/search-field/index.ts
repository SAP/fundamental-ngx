import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./search-field-header/search-field-header.component').then((c) => c.SearchFieldHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./search-field-docs.component').then((c) => c.SearchFieldDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'search-field';
export const API_FILE_KEY = 'searchField';
