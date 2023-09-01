import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-search-field-header/platform-search-field-header.component').then(
                (c) => c.PlatformSearchFieldHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-search-field-docs.component').then((c) => c.PlatformSearchFieldDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'search-field';
export const API_FILE_KEY = 'searchField';
export const I18N_KEY = 'platformSearchField';
