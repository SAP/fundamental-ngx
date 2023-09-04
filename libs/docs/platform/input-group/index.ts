import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-input-group-header/platform-input-group-header.component').then(
                (c) => c.PlatformInputGroupHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-input-group-docs.component').then((c) => c.PlatformInputGroupDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'input-group';
export const API_FILE_KEY = 'inputGroup';
