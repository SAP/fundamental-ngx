import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-icon-tab-bar-header/platform-icon-tab-bar-header.component').then(
                (c) => c.PlatformIconTabBarHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-icon-tab-bar-docs.component').then((c) => c.PlatformIconTabBarDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'icon-tab-bar';
export const API_FILE_KEY = 'iconTabBar';
