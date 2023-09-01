import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-list-header/platform-list-header.component').then((c) => c.PlatformListHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./platform-list-docs.component').then((c) => c.PlatformListDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'list';
export const API_FILE_KEY = 'list';
export const I18N_KEY = 'platformList';
