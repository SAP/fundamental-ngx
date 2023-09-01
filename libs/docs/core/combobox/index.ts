import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./combobox-header/combobox-header.component').then((c) => c.ComboboxHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./combobox-docs.component').then((c) => c.ComboboxDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'combobox';
export const API_FILE_KEY = 'combobox';
