import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./dialog-docs-header/dialog-docs-header.component').then((c) => c.DialogDocsHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./dialog-docs.component').then((c) => c.DialogDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'dialog';
export const API_FILE_KEY = 'dialog';
