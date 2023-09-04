import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./vertical-navigation-header/vertical-navigation-header.component').then(
                (c) => c.VerticalNavigationHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./vertical-navigation-docs.component').then((c) => c.VerticalNavigationDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'vertical-navigation';
export const API_FILE_KEY = 'verticalNavigation';
export const I18N_KEY = 'coreNavigation';
