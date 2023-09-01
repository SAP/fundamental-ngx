import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./tabbable-header/tabbable-header.component').then((c) => c.TabbableHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./tabbable-docs.component').then((c) => c.TabbableDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'tabbable';
