import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-page-footer-header/platform-page-footer-header.component').then(
                (c) => c.PlatformPageFooterHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-page-footer-docs.component').then((c) => c.PlatformPageFooterDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'page-footer';
export const API_FILE_KEY = 'footer';
