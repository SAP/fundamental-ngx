import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./object-status-header/object-status-header.component').then((c) => c.ObjectStatusHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./object-status-docs.component').then((c) => c.ObjectStatusDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'object-status';
export const API_FILE_KEY = 'objectStatus';
