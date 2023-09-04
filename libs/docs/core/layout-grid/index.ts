import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./layout-grid-docs-header/layout-grid-docs-header.component').then(
                (c) => c.LayoutGridDocsHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () => import('./layout-grid-docs.component').then((c) => c.LayoutGridDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'layout-grid';
export const API_FILE_KEY = 'layoutGrid';
