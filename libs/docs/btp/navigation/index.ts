import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./navigation-header/navigation-header.component').then((c) => c.NavigationHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./navigation-docs.component').then((c) => c.NavigationDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'navigation';
export const API_FILE_KEY = 'navigation';
