import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./product-switch-docs-header/product-switch-docs-header.component').then(
                (c) => c.ProductSwitchDocsHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () => import('./product-switch-docs.component').then((c) => c.ProductSwitchDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'product-switch';
export const API_FILE_KEY = 'productSwitch';
export const I18N_KEY = 'coreProductSwitch';
