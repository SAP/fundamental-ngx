import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./tabs-header/tabs-header.component').then((c) => c.TabsHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./tabs-docs.component').then((c) => c.TabsDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'tabs';
export const API_FILE_KEY = 'tabs';
