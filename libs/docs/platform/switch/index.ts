import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./switch-header/switch-header.component').then((c) => c.SwitchHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./switch-docs.component').then((c) => c.SwitchDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'switch';
export const API_FILE_KEY = 'switch';
