import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./forms-header/forms-header.component').then((c) => c.FormsHeaderComponent),
        data: { primary: true },
        children: [
            {
                path: '',
                loadComponent: () => import('./forms-docs.component').then((c) => c.FormsDocsComponent)
            }
        ]
    }
];

export const LIBRARY_NAME = 'forms';
