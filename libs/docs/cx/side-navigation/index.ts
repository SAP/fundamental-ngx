import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./side-navigation-header/side-navigation-header.component').then(
                (c) => c.SideNavigationHeaderComponent
            ),
        data: { primary: true },
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./side-navigation-docs.component').then((c) => c.SideNavigationDocsComponent)
            }
        ]
    }
];
export const LIBRARY_NAME = 'side-navigation';
export const API_FILE_KEY = 'sideNavigation';
