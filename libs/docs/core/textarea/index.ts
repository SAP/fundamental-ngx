import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./textarea-header/textarea-header.component').then((c) => c.TextareaHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./textarea-docs.component').then((c) => c.TextareaDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'textarea';
export const API_FILE_KEY = 'form';
