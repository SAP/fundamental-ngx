import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./multi-input-header/multi-input-header.component').then((c) => c.MultiInputHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./multi-input-docs.component').then((c) => c.MultiInputDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'multi-input';
export const API_FILE_KEY = 'multiInput';
export const I18N_KEY = 'coreMultiInput';
