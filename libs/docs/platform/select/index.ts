import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-select-header/platform-select-header.component').then(
                (c) => c.PlatformSelectHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-select-docs.component').then((c) => c.PlatformSelectDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'select';
export const API_FILE_KEY = 'select';
export const I18N_KEY = 'platformSelect';
