import { Routes } from '@angular/router';
import { LayoutGridDocsHeaderComponent } from './layout-grid-docs-header/layout-grid-docs-header.component';
import { LayoutGridDocsComponent } from './layout-grid-docs.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: LayoutGridDocsHeaderComponent,
        children: [
            {
                path: '',
                component: LayoutGridDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'layout-grid';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/layout-grid';
export const API_FILE_KEY = 'layoutGrid';
