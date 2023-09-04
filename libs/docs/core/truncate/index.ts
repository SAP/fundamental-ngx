import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./truncate-docs-header/truncate-docs-header.component').then((c) => c.TruncateDocsHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./truncate-docs.component').then((c) => c.TruncateDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'truncate';
export const API_FILE_KEY = 'truncate';
