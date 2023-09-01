import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./multi-combobox-header/multi-combobox-header.component').then(
                (c) => c.MultiComboboxHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () => import('./multi-combobox-docs.component').then((c) => c.MultiComboboxDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'multi-combobox';
export const API_FILE_KEY = 'multiCombobox';
