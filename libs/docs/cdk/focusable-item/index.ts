import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./focusable-item-header/focusable-item-header.component').then(
                (c) => c.FocusableItemHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () => import('./focusable-item-docs.component').then((c) => c.FocusableItemDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'focusable-item';
