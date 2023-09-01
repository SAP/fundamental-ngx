import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./popover-header/popover-header.component').then((c) => c.PopoverHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./popover-docs.component').then((c) => c.PopoverDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'popover';
export const API_FILE_KEY = 'popover';
