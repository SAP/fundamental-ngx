import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./tile-docs-header/tile-docs-header.component').then((c) => c.TileDocsHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./tile-docs.component').then((c) => c.TileDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'tile';
export const API_FILE_KEY = 'tile';
