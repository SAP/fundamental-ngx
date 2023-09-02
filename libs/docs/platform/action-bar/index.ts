import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-action-bar-header/platform-action-bar-header.component').then(
                (c) => c.PlatformActionBarHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-action-bar-docs.component').then((c) => c.PlatformActionBarDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'action-bar';
export const API_FILE_KEY = 'actionbar';
export const I18N_KEY = 'platformActionBar';
