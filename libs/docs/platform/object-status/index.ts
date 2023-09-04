import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-object-status-header/platform-object-status-header.component').then(
                (c) => c.PlatformObjectStatusHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-object-status-docs.component').then((c) => c.PlatformObjectStatusDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'object-status';
export const API_FILE_KEY = 'objectStatus';
