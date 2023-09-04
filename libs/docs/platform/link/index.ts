import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-link-header/platform-link-header.component').then((c) => c.PlatformLinkHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./platform-link-docs.component').then((c) => c.PlatformLinkDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'link';
export const API_FILE_KEY = 'link';
export const I18N_KEY = 'platformLink';
