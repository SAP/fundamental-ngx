import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-smart-filter-bar-header/platform-smart-filter-bar-header.component').then(
                (c) => c.PlatformSmartFilterBarHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-smart-filter-bar-docs.component').then(
                        (c) => c.PlatformSmartFilterBarDocsComponent
                    )
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'smart-filter-bar';
export const API_FILE_KEY = 'smartFilterBar';
export const I18N_KEY = 'platformSmartFilterBar';
