import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./checkbox-header/checkbox-header.component').then((c) => c.CheckboxHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./checkbox-docs.component').then((c) => c.CheckboxDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'checkbox';
export const API_FILE_KEY = 'checkbox';
