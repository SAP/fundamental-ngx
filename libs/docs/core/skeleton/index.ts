import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./skeleton-header/skeleton-header.component').then((c) => c.SkeletonHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./skeleton-docs.component').then((c) => c.SkeletonDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'skeleton';
export const API_FILE_KEY = 'skeleton';
