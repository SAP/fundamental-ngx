import { Routes } from '@angular/router';
import { OverflowLayoutDocsComponent } from './overflow-layout-docs.component';
import { OverflowLayoutHeaderComponent } from './overflow-layout-header/overflow-layout-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: OverflowLayoutHeaderComponent,
        children: [
            {
                path: '',
                component: OverflowLayoutDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'overflow-layout';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/overflow-layout';
export const API_FILE_KEY = 'overflowLayout';
export const I18N_KEY = 'coreOverflowLayout';
