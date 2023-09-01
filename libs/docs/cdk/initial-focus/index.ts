import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./initial-focus-header/initial-focus-header.component').then((c) => c.InitialFocusHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./initial-focus-docs.component').then((c) => c.InitialFocusDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'initial-focus';
export const API_FILE_KEY = 'initialFocus';
