import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./scrollbar-header/scrollbar-header.component').then((c) => c.ScrollbarHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./scrollbar-docs.component').then((c) => c.ScrollbarDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'scrollbar';
export const API_FILE_KEY = 'scrollbar';
