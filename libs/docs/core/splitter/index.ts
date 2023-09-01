import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./splitter-header/splitter-header.component').then((c) => c.SplitterHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./splitter-docs.component').then((c) => c.SplitterDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'splitter';
export const API_FILE_KEY = 'splitter';
