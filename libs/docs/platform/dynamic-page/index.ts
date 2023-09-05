import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-dynamic-page-header/platform-dynamic-page-header.component').then(
                (c) => c.PlatformDynamicPageHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-dynamic-page-docs.component').then((c) => c.PlatformDynamicPageDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'dynamic-page';
export const API_FILE_KEY = 'dynamicPage';
