import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-input-header/platform-input-header.component').then(
                (c) => c.PlatformInputHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () => import('./platform-input-docs.component').then((c) => c.PlatformInputDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'input';
export const API_FILE_KEY = 'input';
