import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./shellbar-docs-header/shellbar-docs-header.component').then((c) => c.ShellbarDocsHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./shellbar-docs.component').then((c) => c.ShellbarDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'shellbar';
export const API_FILE_KEY = 'shellbar';
