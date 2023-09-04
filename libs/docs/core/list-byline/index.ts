import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./list-byline-header/list-byline-header.component').then((c) => c.ListBylineHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./list-byline-docs.component').then((c) => c.ListBylineDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'list-byline';
export const API_FILE_KEY = 'list';
