import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./table-docs-header/table-docs-header.component').then((c) => c.TableDocsHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./table-docs.component').then((c) => c.TableDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'table';
export const API_FILE_KEY = 'table';
