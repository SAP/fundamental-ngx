import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-combobox-header/platform-combobox-header.component').then(
                (c) => c.PlatformComboboxHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-combobox-docs.component').then((c) => c.PlatformComboboxDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'combobox';
export const API_FILE_KEY = 'combobox';
export const I18N_KEY = 'platformCombobox';
