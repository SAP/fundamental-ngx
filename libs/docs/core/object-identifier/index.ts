import { Routes } from '@angular/router';
import { ObjectIdentifierDocsComponent } from './object-identifier-docs.component';
import { ObjectIdentifierHeaderComponent } from './object-identifier-header/object-identifier-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: ObjectIdentifierHeaderComponent,
        children: [
            {
                path: '',
                component: ObjectIdentifierDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'object-identifier';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/object-identifier';
export const API_FILE_KEY = 'objectIdentifier';
