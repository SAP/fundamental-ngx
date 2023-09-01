import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-multi-combobox-header/platform-multi-combobox-header.component').then(
                (c) => c.PlatformMultiComboboxHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-multi-combobox-docs.component').then((c) => c.PlatformMultiComboboxDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'multi-combobox';
export const API_FILE_KEY = 'multiCombobox';
export const I18N_KEY = 'platformMultiCombobox';
