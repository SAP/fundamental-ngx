import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./form-message-header/form-message-header.component').then((c) => c.FormMessageHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./form-message-docs.component').then((c) => c.FormMessageDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'form-message';
export const API_FILE_KEY = 'formMessage';
