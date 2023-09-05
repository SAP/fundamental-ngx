import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./focusable-grid-header/focusable-grid-header.component').then(
                (c) => c.FocusableGridHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () => import('./focusable-grid-docs.component').then((c) => c.FocusableGridDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'focusable-grid';
export const API_FILE_KEY = 'focusableGrid';
