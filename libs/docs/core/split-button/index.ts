import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./split-button-header/split-button-header.component').then((c) => c.SplitButtonHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./split-button-docs.component').then((c) => c.SplitButtonDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'split-button';
export const API_FILE_KEY = 'splitButton';
export const I18N_KEY = 'coreSplitButton';
