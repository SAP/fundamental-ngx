import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./quick-view-docs-header/quick-view-docs-header.component').then(
                (c) => c.QuickViewDocsHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () => import('./quick-view-docs.component').then((c) => c.QuickViewDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'quick-view';
export const API_FILE_KEY = 'quickView';
