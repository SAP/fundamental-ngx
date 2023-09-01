import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./inline-help-header/inline-help-header.component').then((c) => c.InlineHelpHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./inline-help-docs.component').then((c) => c.InlineHelpDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'inline-help';
export const API_FILE_KEY = 'inlineHelp';
