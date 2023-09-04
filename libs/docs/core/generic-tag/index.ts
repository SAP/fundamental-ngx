import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./generic-tag-header/generic-tag-header.component').then((m) => m.GenericTagHeaderComponent),
        data: {
            primary: true
        },
        children: [
            {
                path: '',
                loadComponent: () => import('./generic-tag-docs.component').then((m) => m.GenericTagDocsComponent)
            }
        ]
    }
];

export const LIBRARY_NAME = 'generic-tag';
export const API_FILE_KEY = 'genericTag';
