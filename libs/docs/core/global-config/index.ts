import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./global-config-header/global-config-header.component').then((c) => c.GlobalConfigHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./global-config-docs.component').then((c) => c.GlobalConfigDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'global-config';
export const API_FILE_KEY = 'globalConfig';
