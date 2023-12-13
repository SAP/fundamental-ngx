import { Routes } from '@angular/router';
import { VariantManagementDocsComponent } from './variant-management-docs.component';
import { VariantManagementHeaderComponent } from './variant-management-header/variant-management-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: VariantManagementHeaderComponent,
        children: [
            {
                path: '',
                component: VariantManagementDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'variant-management';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/platform/variant-management';
export const API_FILE_KEY = 'variantManagement';
export const I18N_KEY = 'platformVariantManagement';
