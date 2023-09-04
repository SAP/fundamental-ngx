import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./dynamic-side-content-header/dynamic-side-content-header.component').then(
                (c) => c.DynamicSideContentHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./dynamic-side-content-docs.component').then((c) => c.DynamicSideContentDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'dynamic-side-content';
export const API_FILE_KEY = 'dynamicSideContent';
