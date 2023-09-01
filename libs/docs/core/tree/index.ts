import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./tree-header/tree-header.component').then((c) => c.TreeHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./tree-docs.component').then((c) => c.TreeDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'tree';
export const API_FILE_KEY = 'tree';
