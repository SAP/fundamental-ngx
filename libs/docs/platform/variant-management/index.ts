import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./variant-management-header/variant-management-header.component').then(
                (c) => c.VariantManagementHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./variant-management-docs.component').then((c) => c.VariantManagementDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'variant-management';
export const API_FILE_KEY = 'variantManagement';
export const I18N_KEY = 'platformVariantManagement';
