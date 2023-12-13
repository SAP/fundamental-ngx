import { Routes } from '@angular/router';
import { DataSourceDocsComponent } from './data-source-docs.component';
import { DataSourceHeaderComponent } from './data-source-header/data-source-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: DataSourceHeaderComponent,
        data: {
            primary: true
        },
        children: [
            {
                path: '',
                component: DataSourceDocsComponent
            }
        ]
    }
];

export const LIBRARY_NAME = 'data-source';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/cdk/data-source';
export const API_FILE_KEY = 'dataSource';
