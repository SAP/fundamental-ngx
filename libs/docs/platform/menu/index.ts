import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-menu-header/platform-menu-header.component').then((c) => c.PlatformMenuHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./platform-menu-docs.component').then((c) => c.PlatformMenuDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'menu';
export const API_FILE_KEY = 'menu';
