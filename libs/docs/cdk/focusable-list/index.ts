import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./focusable-list-header/focusable-list-header.component').then(
                (c) => c.FocusableListHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () => import('./focusable-list-docs.component').then((c) => c.FocusableListDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'focusable-list';
