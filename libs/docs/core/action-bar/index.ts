import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./action-bar-header/action-bar-header.component').then((c) => c.ActionBarHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./action-bar-docs.component').then((c) => c.ActionBarDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'action-bar';
export const API_FILE_KEY = 'actionBar';
