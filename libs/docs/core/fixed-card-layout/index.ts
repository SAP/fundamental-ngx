import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./fixed-card-layout-docs-header/fixed-card-layout-docs-header.component').then(
                (c) => c.FixedCardLayoutDocsHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./fixed-card-layout-docs.component').then((c) => c.FixedCardLayoutDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'fixed-card-layout';
export const API_FILE_KEY = 'fixedCardLayout';
