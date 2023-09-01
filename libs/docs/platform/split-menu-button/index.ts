import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-split-menu-button-header/platform-split-menu-button-header.component').then(
                (c) => c.PlatformDocsSplitMenuButtonHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-split-menu-button.component').then((c) => c.PlatformDocsSplitMenuButtonComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'split-menu-button';
export const API_FILE_KEY = 'splitMenuButton';
