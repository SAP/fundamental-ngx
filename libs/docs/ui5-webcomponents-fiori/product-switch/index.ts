import { Routes } from '@angular/router';
import { ProductSwitchHeader } from './header/product-switch-header';
import { ProductSwitchDocs } from './product-switch-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: ProductSwitchHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: ProductSwitchDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'product-switch';
export const API_FILE_KEY = 'productSwitch';
