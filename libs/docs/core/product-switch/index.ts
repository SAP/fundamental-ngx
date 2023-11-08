import { Routes } from '@angular/router';
import { ProductSwitchDocsHeaderComponent } from './product-switch-docs-header/product-switch-docs-header.component';
import { ProductSwitchDocsComponent } from './product-switch-docs.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: ProductSwitchDocsHeaderComponent,
        children: [
            {
                path: '',
                component: ProductSwitchDocsComponent
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
