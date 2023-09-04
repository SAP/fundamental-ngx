import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-menu-button-header/platform-menu-button-header.component').then(
                (c) => c.PlatformMenuButtonHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-menu-button-docs.component').then((c) => c.PlatformMenuButtonDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'menu-button';
export const API_FILE_KEY = 'menuButton';
