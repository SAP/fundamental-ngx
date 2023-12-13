import { Routes } from '@angular/router';
import { FlexibleColumnLayoutDocsHeaderComponent } from './flexible-column-layout-docs-header/flexible-column-layout-docs-header.component';
import { FlexibleColumnLayoutDocsComponent } from './flexible-column-layout-docs.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: FlexibleColumnLayoutDocsHeaderComponent,
        children: [
            {
                path: '',
                component: FlexibleColumnLayoutDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'flexible-column-layout';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/flexible-column-layout';
export const API_FILE_KEY = 'flexibleColumnLayout';
