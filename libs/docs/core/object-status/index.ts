import { Routes } from '@angular/router';
import { ObjectStatusDocsComponent } from './object-status-docs.component';
import { ObjectStatusHeaderComponent } from './object-status-header/object-status-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: ObjectStatusHeaderComponent,
        children: [
            {
                path: '',
                component: ObjectStatusDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'object-status';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/object-status';
export const API_FILE_KEY = 'objectStatus';
