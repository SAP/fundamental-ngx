import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./grid-list-header/grid-list-header.component').then((c) => c.GridListHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./grid-list-docs.component').then((c) => c.GridListDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'grid-list';
export const API_FILE_KEY = 'gridList';
export const I18N_KEY = 'coreGridList';
