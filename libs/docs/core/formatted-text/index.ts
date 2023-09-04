import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./formatted-text-header/formatted-text-header.component').then(
                (c) => c.FormattedTextHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () => import('./formatted-text-docs.component').then((c) => c.FormattedTextDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'formatted-text';
export const API_FILE_KEY = 'formattedText';
