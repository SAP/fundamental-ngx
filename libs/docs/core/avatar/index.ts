import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./avatar-header/avatar-header.component').then((c) => c.AvatarHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./avatar-docs.component').then((c) => c.AvatarDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'avatar';
export const API_FILE_KEY = 'avatar';
